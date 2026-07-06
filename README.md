Here is the updated **README.md** content. It includes the project overview, current backend status, what we have built so far, how to run it, and the next steps.

It follows your PRD direction: CSV upload, four leak detectors, dollar-ranked findings, and an LLM layer that only explains structured backend results instead of inventing numbers. 

Copy this into your root `README.md`.

````markdown
# Profit Leak Hunter — AI Business Auditor

Profit Leak Hunter is an AI-powered business auditor that helps small and mid-size businesses find hidden profit leaks from CSV data.

The system analyzes operational business files such as sales, refunds, supplier/COGS, and inventory data, then returns ranked findings with estimated dollar impact, evidence, likely cause, and suggested action.

Instead of only showing charts, Profit Leak Hunter acts like a forensic business analyst and answers:

> Where is this business losing money without realizing it?

---

## Hackathon

Built for the **AMD Developer Hackathon: ACT II**.

Target track:

**Track 3 — Unicorn Track**

This project is positioned as a startup/product demo with practical business value for business owners, e-commerce sellers, bookkeepers, and fractional CFOs.

---

## Current Status

The **backend MVP core is working**.

We currently have a FastAPI backend that accepts CSV uploads and detects profit leaks using deterministic Python/pandas logic.

The backend currently detects 4 profit leak categories:

1. Refund leaks
2. Discount inefficiency
3. Supplier / COGS margin leaks
4. Slow-moving inventory leaks

Current stage:

```text
CSV Upload
→ CSV Reader
→ Schema Mapper
→ pandas Detection Engine
→ Structured JSON Findings
```

Planned next stage:

```text
Structured JSON Findings
→ Fireworks AI / AMD-supported LLM
→ Plain-English Audit Report
```

---

## What Has Been Built So Far

### 1. Project Scaffold

Created the core project structure:

```text
profit-leak-hunter/
  backend/
  frontend/
  docs/
  scripts/
  README.md
  .gitignore
  .env.example
```

The current active work is inside the backend.

---

### 2. FastAPI Backend

Created a working FastAPI backend.

Main file:

```text
backend/app/main.py
```

Working endpoints:

```text
GET /health
POST /analyze
```

`GET /health` confirms the API is running.

`POST /analyze` accepts CSV files and returns detected profit leaks.

---

### 3. CSV Upload System

Created a CSV upload reader.

File:

```text
backend/app/services/csv_loader.py
```

It reads uploaded CSV files into pandas DataFrames and handles empty or invalid CSV files.

---

### 4. Schema Mapper

Created a simple schema mapper.

File:

```text
backend/app/services/schema_mapper.py
```

It normalizes column names so the backend can understand common variations such as:

```text
Order Date → date
Product Name → product
SKU → sku
Qty → quantity
Sales → revenue
Refund → refund_amount
Vendor → supplier_name
Stock → stock_level
```

This helps the backend work with messy business CSV exports.

---

### 5. Response Schemas

Created structured response models.

File:

```text
backend/app/schemas.py
```

Each leak finding includes:

```text
category
entity
title
metric_change
dollar_impact
confidence
time_window
evidence
likely_cause
suggested_action
```

This keeps the output consistent and ready for frontend display and LLM narrative generation.

---

### 6. Analysis Pipeline

Created the main backend pipeline.

File:

```text
backend/app/services/pipeline.py
```

The pipeline currently does this:

```text
Read uploaded CSV files
→ Map columns
→ Run all detectors
→ Sort findings by dollar impact
→ Return structured JSON response
```

---

## Working Detectors

### 1. Refund Leak Detector

File:

```text
backend/app/services/detectors/refunds.py
```

What it does:

- Compares earlier vs recent refund rates by product
- Detects products where refund rate increased significantly
- Estimates dollar impact from excess refunds
- Returns evidence and suggested action

Example finding:

```text
Smart Water Bottle refund rate increased from 5.0% to 50.0%.
Estimated impact: $900.
```

---

### 2. Discount Efficiency Detector

File:

```text
backend/app/services/detectors/discounts.py
```

What it does:

- Compares discounted sales against regular sales
- Estimates whether the discount generated enough extra revenue
- Flags discount campaigns where discount cost exceeds estimated incremental revenue

Example finding:

```text
Trail Backpack discount campaign may be reducing profit.
Estimated impact: $140.
```

---

### 3. Supplier Margin Leak Detector

File:

```text
backend/app/services/detectors/suppliers.py
```

What it does:

- Compares earlier vs recent supplier unit costs
- Detects supplier cost increases
- Checks whether recent sales price protected the margin
- Estimates margin loss from higher unit cost

Example finding:

```text
AquaSource Manufacturing increased Smart Water Bottle unit cost from $22 to $31.
Estimated impact: $360.
```

---

### 4. Inventory Leak Detector

File:

```text
backend/app/services/detectors/inventory.py
```

What it does:

- Compares earlier vs recent inventory snapshots
- Detects slow-moving or dead stock
- Estimates cash tied up in inventory
- Flags products with low movement and high stock value

Example finding:

```text
Camping Lantern has slow-moving inventory tying up $5,310.
```

---

## Current Backend Folder Structure

```text
backend/
  app/
    __init__.py
    main.py
    schemas.py

    core/
      __init__.py
      config.py

    services/
      __init__.py
      csv_loader.py
      schema_mapper.py
      pipeline.py

      detectors/
        __init__.py
        refunds.py
        discounts.py
        suppliers.py
        inventory.py

    sample_data/
      sales.csv
      refunds.csv
      suppliers.csv
      inventory.csv

  requirements.txt
```

---

## Sample Data

The current backend uses synthetic sample CSV files with seeded profit leaks.

Files:

```text
backend/app/sample_data/sales.csv
backend/app/sample_data/refunds.csv
backend/app/sample_data/suppliers.csv
backend/app/sample_data/inventory.csv
```

These are intentionally created so the backend can be tested clearly during development.

Later, we may improve the demo dataset using a public retail/e-commerce dataset as the base, then inject known leak scenarios for live verification.

---

## Required CSV Formats

### sales.csv

```text
date, order_id, product, sku, quantity, unit_price, discount_amount, revenue
```

### refunds.csv

```text
date, order_id, product, sku, refund_amount, reason
```

### suppliers.csv

```text
date, supplier_name, product, sku, unit_cost, purchase_volume
```

### inventory.csv

```text
date, sku, product, stock_level, unit_cost
```

---

## Latest Backend Test Result

Using the current sample CSV files, the backend successfully detected 4 profit leaks.

Total estimated leak:

```text
$6,710
```

Detected findings:

```text
Inventory leak:
Camping Lantern — $5,310

Refund leak:
Smart Water Bottle — $900

Supplier leak:
AquaSource Manufacturing / Smart Water Bottle — $360

Discount leak:
Trail Backpack — $140
```

Example JSON response:

```json
{
  "status": "success",
  "total_estimated_leak": -6710,
  "findings": [
    {
      "category": "inventory",
      "entity": "Camping Lantern",
      "title": "Slow-moving inventory tying up cash",
      "metric_change": "Only 1.7% stock movement",
      "dollar_impact": -5310,
      "confidence": 0.8
    },
    {
      "category": "refund",
      "entity": "Smart Water Bottle",
      "title": "Refund rate increased",
      "metric_change": "+45.0 percentage points",
      "dollar_impact": -900,
      "confidence": 0.86
    },
    {
      "category": "supplier",
      "entity": "AquaSource Manufacturing / Smart Water Bottle",
      "title": "Supplier cost increased without matching price adjustment",
      "metric_change": "+40.9% unit cost increase",
      "dollar_impact": -360,
      "confidence": 0.82
    },
    {
      "category": "discount",
      "entity": "Trail Backpack",
      "title": "Discount campaign may be reducing profit",
      "metric_change": "$30.00 lower revenue per unit during discounts",
      "dollar_impact": -140,
      "confidence": 0.78
    }
  ],
  "executive_summary": "Profit Leak Hunter found 4 potential profit leak(s), with an estimated total impact of $6,710.00."
}
```

---

## Local Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Run the backend:

```bash
python -m uvicorn app.main:app --reload
```

Open health check:

```text
http://127.0.0.1:8000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "profit-leak-hunter-api",
  "version": "0.1.0"
}
```

Open Swagger API docs:

```text
http://127.0.0.1:8000/docs
```

---

## Testing `/analyze`

Start the backend:

```bash
python -m uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

Go to:

```text
POST /analyze
```

Upload:

```text
sales      → backend/app/sample_data/sales.csv
refunds    → backend/app/sample_data/refunds.csv
suppliers  → backend/app/sample_data/suppliers.csv
inventory  → backend/app/sample_data/inventory.csv
```

Click **Execute**.

Expected result:

- Status should be `success`
- Findings should include refund, discount, supplier, and inventory categories
- Findings should be ranked by dollar impact

---

## Core Design Principle

The backend calculates financial findings using deterministic logic.

The LLM should not calculate or invent financial claims.

The LLM will only receive structured findings like this:

```json
{
  "category": "refund",
  "entity": "Smart Water Bottle",
  "dollar_impact": -900,
  "evidence": [
    "Earlier refund rate: 5.0%",
    "Recent refund rate: 50.0%"
  ]
}
```

Then it will generate a plain-English business explanation.

This design reduces hallucination risk and keeps the financial audit trustworthy.

---

## AI / AMD / Fireworks Plan

The AI narrative layer is not implemented yet.

Planned AI layer:

```text
Structured Findings JSON
→ Fireworks AI / AMD-supported model
→ Executive Summary
→ Business Audit Narrative
→ Suggested Actions
```

Prepared environment file:

```text
.env.example
```

Planned variables:

```text
FIREWORKS_API_KEY=
FIREWORKS_API_BASE_URL=https://api.fireworks.ai/inference/v1
FIREWORKS_MODEL=
ENABLE_LLM_NARRATIVE=false
```

Important:

Real API keys must only be stored locally in `.env`.

Do not commit `.env` to GitHub.

---

## Frontend Status

The frontend is not built yet.

Planned frontend stack:

- Next.js / React
- Tailwind CSS
- Recharts

Planned frontend features:

1. Landing page
2. CSV upload form
3. Processing/loading state
4. Ranked profit leak dashboard
5. Cards for each leak
6. Charts for evidence
7. AI-generated audit summary
8. Optional PDF export

---

## Docker Status

Docker is not being used yet.

Docker will be added near the end before final hackathon submission.

Current priority:

```text
Backend logic
→ AI narrative layer
→ Frontend dashboard
→ GitHub polish
→ Docker
→ Final submission
```

---

## Team Collaboration Notes

Recommended team split:

### Backend / Data Logic

Work on:

```text
backend/app/services/
backend/app/services/detectors/
backend/app/sample_data/
```

### AI Narrative Layer

Work on:

```text
backend/app/services/narrative.py
backend/app/core/config.py
.env.example
```

### Frontend

Work on:

```text
frontend/
```

### Documentation / Demo

Work on:

```text
README.md
docs/
```

Recommended Git workflow:

```bash
git checkout -b feature/your-feature-name
git add .
git commit -m "Describe your change"
git push origin feature/your-feature-name
```

Then open a pull request into `main`.

---

## Completed So Far

- Project folder created
- Git repository initialized
- FastAPI backend created
- Virtual environment configured
- Backend dependencies installed
- CSV upload reader created
- Schema mapper created
- Pydantic response schemas created
- Refund leak detector completed
- Discount efficiency detector completed
- Supplier margin detector completed
- Inventory leak detector completed
- Sample CSV files created
- `/health` endpoint tested successfully
- `/analyze` endpoint tested successfully with all 4 CSVs
- Backend returns ranked structured findings by dollar impact

---

## Next Steps

1. Commit and push the current backend to GitHub
2. Add LLM narrative generator
3. Connect Fireworks AI / AMD-supported model access
4. Improve dataset using public retail/e-commerce data
5. Build frontend dashboard
6. Add charts and evidence views
7. Add Docker near final submission
8. Prepare pitch deck and demo video

---

## Project Goal

Profit Leak Hunter aims to help business owners move from:

```text
I have business data, but I do not know what to look for.
```

to:

```text
Here are the exact places where profit is leaking, ranked by dollar impact.
```
````

After saving this as `README.md`, run:

```powershell
git add README.md
git commit -m "Add project README with backend progress"
git push
```
