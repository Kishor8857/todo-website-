@echo off
echo.
echo =========================================
echo TODO App - React + Django Setup Script
echo =========================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+
    exit /b 1
)
echo [OK] Python found
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo %PYTHON_VERSION%

REM Check Node
echo.
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node found: %NODE_VERSION%
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm found: %NPM_VERSION%

REM Install backend dependencies
echo.
echo Installing backend dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    exit /b 1
)
echo [OK] Backend dependencies installed

REM Run migrations
echo.
echo Running Django migrations...
python manage.py makemigrations
python manage.py migrate
if errorlevel 1 (
    echo ERROR: Migration failed
    exit /b 1
)
echo [OK] Migrations completed

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node dependencies
    cd ..
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..

echo.
echo =========================================
echo [OK] Setup Complete!
echo =========================================
echo.
echo Next steps:
echo 1. Terminal 1: Run "python manage.py runserver"
echo 2. Terminal 2: Run "cd frontend && npm start"
echo.
echo Then visit: http://localhost:3000
echo.
pause
