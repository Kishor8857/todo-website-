#!/bin/bash

echo "========================================="
echo "TODO App - React + Django Setup Script"
echo "========================================="
echo ""

# Check Python
echo "Checking Python installation..."
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.8+"
    exit 1
fi
echo "✅ Python found: $(python --version)"

# Check Node
echo ""
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"

# Run migrations
echo ""
echo "Running Django migrations..."
python manage.py makemigrations
python manage.py migrate
if [ $? -ne 0 ]; then
    echo "❌ Migration failed"
    exit 1
fi
echo "✅ Migrations completed"

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Node dependencies"
    cd ..
    exit 1
fi
echo "✅ Frontend dependencies installed"
cd ..

echo ""
echo "========================================="
echo "✅ Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Terminal 1: Run 'python manage.py runserver'"
echo "2. Terminal 2: Run 'cd frontend && npm start'"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
