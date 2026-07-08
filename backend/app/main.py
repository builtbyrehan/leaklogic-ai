from typing import Annotated
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app.services.pipeline import run_analysis

app = FastAPI(
    title="Profit Leak Hunter API",
    description="AI business auditor for detecting hidden profit leaks from CSV data.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "profit-leak-hunter-api",
        "version": "0.1.0",
    }


@app.get("/sample-data/{filename}")
async def get_sample_data(filename: str):
    """
    Serve sample CSV files for demo purposes
    
    Args:
        filename: name of the CSV file (e.g., 'sales.csv', 'refunds.csv', 'suppliers.csv', 'inventory.csv')
    """
    sample_data_dir = Path(__file__).parent / "sample_data"
    file_path = sample_data_dir / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Sample file not found: {filename}")
    
    return FileResponse(file_path, media_type="text/csv", filename=filename)


@app.post("/analyze")
async def analyze(
    sales: Annotated[UploadFile, File(description="Sales/orders CSV")],
    refunds: Annotated[UploadFile | None, File(description="Refunds/returns CSV")] = None,
    suppliers: Annotated[UploadFile | None, File(description="Supplier/COGS CSV")] = None,
    inventory: Annotated[UploadFile | None, File(description="Inventory CSV")] = None,
):
    try:
        result = await run_analysis(
            sales_file=sales,
            refunds_file=refunds,
            suppliers_file=suppliers,
            inventory_file=inventory,
        )
        return result
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
