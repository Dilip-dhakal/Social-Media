@echo off
REM Social Media Platform - Quick Start Script for Windows

setlocal enabledelayedexpansion

echo.
echo ================================================
echo Social Media Platform - Quick Start (Windows)
echo ================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed
    echo Please install Python 3.8+ from https://www.python.org
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    exit /b 1
)

echo Checking Python version...
python --version

echo Checking Node.js version...
node --version

echo.
echo ================================================
echo Setting up Backend...
echo ================================================
echo.

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing Python dependencies...
pip install -q -r requirements.txt

REM Run migrations
echo Running database migrations...
python manage.py migrate

echo ✓ Backend setup complete
echo.

REM Setup Frontend
echo ================================================
echo Setting up Frontend...
echo ================================================
echo.

REM Install Node dependencies
if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install
)

REM Copy .env.local if it doesn't exist
if not exist ".env.local" (
    echo Creating .env.local file...
    copy .env.local.example .env.local
)

echo ✓ Frontend setup complete
echo.

echo ================================================
echo Starting Services...
echo ================================================
echo.
echo Backend server will start at: http://localhost:8000
echo Frontend server will start at: http://localhost:3000
echo.
echo NOTE: You need TWO terminal windows for this to work properly.
echo Open a new Command Prompt or PowerShell window and run:
echo   cd %CD%
echo   call venv\Scripts\activate.bat
echo   python manage.py runserver
echo.
echo Then in this window, run:
echo   npm run dev
echo.
echo To continue with frontend setup, press Enter...
echo.
pause

REM Start frontend
npm run dev

endlocal
