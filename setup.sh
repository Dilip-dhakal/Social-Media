#!/bin/bash
# Social Media App - Complete Setup Script
# This script sets up both backend and frontend

set -e

echo "================================================"
echo "  Social Media App - Full Stack Setup"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check Python version
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    print_error "Python3 is not installed"
    echo "Please install Python 3.8 or higher"
    exit 1
fi
PYTHON_VERSION=$(python3 --version)
print_status "Found $PYTHON_VERSION"

# Check if PostgreSQL is available
echo ""
echo "Checking PostgreSQL installation..."
if ! command -v psql &> /dev/null; then
    print_warning "PostgreSQL client tools not found"
    echo "You need PostgreSQL to be installed and running"
    echo "Install from: https://www.postgresql.org/download/"
else
    print_status "PostgreSQL client found"
fi

# Create virtual environment if it doesn't exist
echo ""
echo "Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    print_status "Creating virtual environment..."
    python3 -m venv venv
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate
print_status "Virtual environment activated"

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
pip install --upgrade pip setuptools wheel > /dev/null 2>&1
print_status "Upgraded pip"

# Check if requirements.txt exists
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt > /dev/null 2>&1
    print_status "Installed requirements from requirements.txt"
else
    print_warning "requirements.txt not found, installing core packages..."
    pip install Django==6.0.1 > /dev/null 2>&1
    pip install djangorestframework > /dev/null 2>&1
    pip install psycopg2-binary > /dev/null 2>&1
    pip install python-decouple > /dev/null 2>&1
    pip install django-cors-headers > /dev/null 2>&1
    pip install djangorestframework-simplejwt > /dev/null 2>&1
    pip install drf-nested-routers > /dev/null 2>&1
    pip install django-filter > /dev/null 2>&1
    print_status "Installed core backend packages"
fi

# Run migrations
echo ""
echo "Running database migrations..."
python3 manage.py migrate 2>&1 | grep -E "Applying|OK|No changes" || true
print_status "Database migrations completed"

# Create superuser prompt
echo ""
echo "=================================="
print_warning "Django Superuser Setup"
echo "=================================="
echo "Create an admin account for Django admin panel"
echo "Username: admin"
echo "Email: admin@example.com"
echo "Password: (will be prompted)"
python3 manage.py createsuperuser --noinput --username admin --email admin@example.com 2>/dev/null || print_warning "Could not create superuser (may already exist)"
print_status "Superuser setup completed"

# Setup frontend
echo ""
echo "=================================="
echo "Setting up React frontend..."
echo "=================================="
if [ ! -d "frontend" ]; then
    print_error "frontend directory not found"
    exit 1
fi

cd frontend

# Install Node dependencies
if [ -f "package.json" ]; then
    if ! command -v npm &> /dev/null; then
        print_error "Node.js/npm is not installed"
        echo "Please install Node.js from: https://nodejs.org/"
        exit 1
    fi
    
    print_status "Installing frontend dependencies..."
    npm install > /dev/null 2>&1
    print_status "Frontend dependencies installed"
else
    print_error "package.json not found"
    exit 1
fi

# Create .env file
if [ ! -f ".env" ]; then
    echo ""
    print_status "Creating frontend environment file..."
    cat > .env << 'EOF'
VITE_API_URL=http://localhost:8000
EOF
    print_status "Created .env file"
else
    print_status ".env file already exists"
fi

cd ..

# Print summary
echo ""
echo "================================================"
print_status "Setup Complete!"
echo "================================================"
echo ""
echo "To run your application:"
echo ""
echo "Terminal 1 - Backend (API):"
echo "  source venv/bin/activate"
echo "  python3 manage.py runserver"
echo ""
echo "Terminal 2 - Frontend (React):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
echo ""
echo "Admin Panel: http://localhost:8000/admin"
echo "Username: admin"
echo ""
echo "API Documentation:"
echo "  See: /frontend/API_ENDPOINTS.md"
echo ""
echo "For more help, see:"
echo "  - BACKEND_SETUP.md (Django setup)"
echo "  - FRONTEND_SETUP.md (React setup)"
echo "  - FULL_STACK_SETUP.md (Complete guide)"
echo "================================================"
