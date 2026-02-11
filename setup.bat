@echo off
REM Social Media App - Complete Setup Script for Windows
REM This script sets up both backend and frontend

setlocal enabledelayedexpansion
cls

echo ================================================
echo   Social Media App - Full Stack Setup
echo ================================================
echo.

REM Check Python version
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from: https://www.python.org
    pause
    exit /b 1
)
for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo [✓] Found Python %PYTHON_VERSION%

REM Create virtual environment if it doesn't exist
echo.
echo Setting up Python virtual environment...
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo [✓] Virtual environment created
) else (
    echo [✓] Virtual environment already exists
)

REM Activate virtual environment
call venv\Scripts\activate.bat
echo [✓] Virtual environment activated

REM Install backend dependencies
echo.
echo Installing backend dependencies...
python -m pip install --upgrade pip setuptools wheel >nul 2>&1
echo [✓] Upgraded pip

if exist "requirements.txt" (
    pip install -r requirements.txt >nul 2>&1
    echo [✓] Installed requirements from requirements.txt
) else (
    echo [!] requirements.txt not found, installing core packages...
    pip install Django==6.0.1 >nul 2>&1
    pip install djangorestframework >nul 2>&1
    pip install psycopg2-binary >nul 2>&1
    pip install python-decouple >nul 2>&1
    pip install django-cors-headers >nul 2>&1
    pip install djangorestframework-simplejwt >nul 2>&1
    pip install drf-nested-routers >nul 2>&1
    pip install django-filter >nul 2>&1
    echo [✓] Installed core backend packages
)

REM Run migrations
echo.
echo Running database migrations...
python manage.py migrate
echo [✓] Database migrations completed

REM Setup frontend
echo.
echo ==================================
echo Setting up React frontend...
echo ==================================
if not exist "frontend" (
    echo [X] frontend directory not found
    pause
    exit /b 1
)

cd frontend

REM Check for Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js/npm is not installed
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js found

REM Install Node dependencies
if exist "package.json" (
    echo Installing frontend dependencies...
    call npm install >nul 2>&1
    echo [✓] Frontend dependencies installed
) else (
    echo [X] package.json not found
    pause
    exit /b 1
)

REM Create .env file
if not exist ".env" (
    echo Creating frontend environment file...
    (
        echo VITE_API_URL=http://localhost:8000
    ) > .env
    echo [✓] Created .env file
) else (
    echo [✓] .env file already exists
)

cd ..

REM Print summary
echo.
echo ================================================
echo [✓] Setup Complete!
echo ================================================
echo.
echo To run your application:
echo.
echo Command Prompt 1 - Backend ^(API^):
echo   venv\Scripts\activate.bat
echo   python manage.py runserver
echo.
echo Command Prompt 2 - Frontend ^(React^):
echo   cd frontend
echo   npm run dev
echo.
echo Then visit: http://localhost:5173
echo.
echo Admin Panel: http://localhost:8000/admin
echo.
echo For more help, see:
echo   - BACKEND_SETUP.md ^(Django setup^)
echo   - FRONTEND_SETUP.md ^(React setup^)
echo   - FULL_STACK_SETUP.md ^(Complete guide^)
echo ================================================
echo.
pause
