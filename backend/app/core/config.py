from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"

    llm_provider: str = Field(
        default="fireworks",
        validation_alias="LLM_PROVIDER",
    )

    enable_llm_narrative: bool = Field(
        default=True,
        validation_alias="ENABLE_LLM_NARRATIVE",
    )

    # OpenRouter configuration
    openrouter_api_key: str | None = Field(
        default=None,
        validation_alias="OPENROUTER_API_KEY",
    )

    openrouter_api_base_url: str = Field(
        default="https://openrouter.ai/api/v1",
        validation_alias="OPENROUTER_API_BASE_URL",
    )

    openrouter_model: str = Field(
        default="nvidia/nemotron-3-nano-30b-a3b:free",
        validation_alias="OPENROUTER_MODEL",
    )

    # Fireworks AI configuration
    fireworks_api_key: str | None = Field(
        default=None,
        validation_alias="FIREWORKS_API_KEY",
    )

    fireworks_api_base_url: str = Field(
        default="https://api.fireworks.ai/inference/v1",
        validation_alias="FIREWORKS_API_BASE_URL",
    )

    fireworks_model: str = Field(
        default="accounts/fireworks/models/gpt-oss-120b",
        validation_alias="FIREWORKS_MODEL",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )


settings = Settings()