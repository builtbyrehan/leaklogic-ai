import json
import time
from dataclasses import dataclass

from openai import OpenAI

from app.core.config import settings
from app.schemas import LeakFinding


@dataclass(frozen=True)
class LLMProviderConfig:
    name: str
    api_key: str
    base_url: str
    model: str


def format_money(value: float) -> str:
    """Format a numeric value as positive currency text."""
    return f"${abs(value):,.2f}"


def generate_fallback_summary(
    findings: list[LeakFinding],
) -> str:
    """Generate a deterministic summary when the LLM is unavailable."""
    if not findings:
        return (
            "Profit Leak Hunter did not detect any major profit leaks "
            "in the uploaded data."
        )

    total_impact = sum(
        finding.dollar_impact
        for finding in findings
    )

    top_findings = findings[:3]

    summary_parts = [
        (
            f"Profit Leak Hunter found {len(findings)} potential "
            f"profit leak(s), with an estimated total impact of "
            f"{format_money(total_impact)}."
        ),
        "The findings are ranked by estimated dollar impact.",
    ]

    for index, finding in enumerate(
        top_findings,
        start=1,
    ):
        summary_parts.append(
            f"{index}. {finding.title} - {finding.entity}. "
            f"Impact: {format_money(finding.dollar_impact)}. "
            f"Recommended action: {finding.suggested_action}"
        )

    return " ".join(summary_parts)


def get_provider_config() -> LLMProviderConfig | None:
    """Return configuration for the selected LLM provider."""
    provider = settings.llm_provider.strip().lower()

    if provider == "fireworks":
        if not settings.fireworks_api_key:
            return None

        return LLMProviderConfig(
            name="fireworks",
            api_key=settings.fireworks_api_key,
            base_url=settings.fireworks_api_base_url,
            model=settings.fireworks_model,
        )

    if provider == "openrouter":
        if not settings.openrouter_api_key:
            return None

        return LLMProviderConfig(
            name="openrouter",
            api_key=settings.openrouter_api_key,
            base_url=settings.openrouter_api_base_url,
            model=settings.openrouter_model,
        )

    return None


def generate_narrative_summary(
    findings: list[LeakFinding],
) -> tuple[str, str]:
    """
    Generate an executive narrative from deterministic leak findings.

    Returns:
        tuple[str, str]:
            - Executive summary text
            - Narrative source: "fireworks", "openrouter", or "fallback"
    """

    fallback = generate_fallback_summary(findings)

    if not findings:
        return fallback, "fallback"

    if not settings.enable_llm_narrative:
        return fallback, "fallback"

    provider_config = get_provider_config()

    if provider_config is None:
        print(
            "LLM provider is unavailable or missing an API key; "
            "using fallback."
        )
        return fallback, "fallback"

    total_impact = sum(
        finding.dollar_impact
        for finding in findings
    )

    findings_payload = [
        finding.model_dump()
        for finding in findings[:10]
    ]

    system_prompt = (
        "You are the executive narrative layer for LeakLogic AI, "
        "also known as Profit Leak Hunter. "
        "The supplied detector results are the only source of truth. "
        "Do not invent figures, findings, evidence, causes, time periods, "
        "thresholds, recovery estimates, deadlines, experiments, customer "
        "segments, or recommendations that are not explicitly supported "
        "by the supplied structured findings. "
        "You may reorganize and summarize the supplied information, but "
        "you must preserve its meaning and numerical accuracy. "
        "Explain the largest profit leaks, their supporting evidence, "
        "and the supplied recommended actions. "
        "Keep the response between 300 and 450 words. "
        "Use Markdown with short headings and bullet points. "
        "Do not use Markdown tables. "
        "Always complete the summary."
    )

    user_prompt = (
        f"Total estimated profit leak: "
        f"{format_money(total_impact)}\n"
        f"Number of findings: {len(findings)}\n\n"
        f"Structured findings:\n"
        f"{json.dumps(findings_payload, indent=2)}"
    )

    client = OpenAI(
        api_key=provider_config.api_key,
        base_url=provider_config.base_url,
        timeout=120.0,
    )

    max_attempts = 2
    last_error: Exception | None = None

    for attempt in range(1, max_attempts + 1):
        try:
            if provider_config.name == "fireworks":
                response = client.chat.completions.create(
                    model=provider_config.model,
                    messages=[
                        {
                            "role": "system",
                            "content": system_prompt,
                        },
                        {
                            "role": "user",
                            "content": user_prompt,
                        },
                    ],
                    max_tokens=1600,
                    reasoning_effort="low",
                )
            else:
                response = client.chat.completions.create(
                    model=provider_config.model,
                    messages=[
                        {
                            "role": "system",
                            "content": system_prompt,
                        },
                        {
                            "role": "user",
                            "content": user_prompt,
                        },
                    ],
                    max_tokens=1300,
                )

            if response is None:
                raise RuntimeError(
                    f"{provider_config.name} returned no response object."
                )

            if not response.choices:
                raise RuntimeError(
                    f"{provider_config.name} returned no response choices."
                )

            message = response.choices[0].message

            if message is None:
                raise RuntimeError(
                    f"{provider_config.name} returned no response message."
                )

            content = message.content

            if not isinstance(content, str) or not content.strip():
                raise RuntimeError(
                    f"{provider_config.name} returned an empty narrative."
                )

            return (
                content.strip(),
                provider_config.name,
            )

        except Exception as error:
            last_error = error

            print(
                f"{provider_config.name} narrative attempt "
                f"{attempt}/{max_attempts} failed: {error}"
            )

            if attempt < max_attempts:
                time.sleep(2)

    print(
        f"{provider_config.name} narrative unavailable after retries; "
        f"using fallback: {last_error}"
    )

    return fallback, "fallback"