@echo off
echo Starting Profit Leak Hunter Frontend...
echo.

cd frontend

if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting frontend dev server on http://localhost:3001
echo Press Ctrl+C to stop
echo.

call npm run dev -- -p 3001
