#!/bin/bash

# Social Media Platform - Quick Start Script
# This script sets up and starts both the backend and frontend

set -e

echo "================================================"
echo "Social Media Platform - Quick Start"
echo "================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    exit 1
fi

# Check if PostgreSQL is running
echo "Checking PostgreSQL connection..."
if ! python3 -c "import psycopg2; psycopg2.connect('dbname=coredb user=postgres password=root host=localhost')" 2>/dev/null; then
    echo "WARNING: Could not connect to PostgreSQL"
    echo "Make sure PostgreSQL is running and credentials in .env are correct"
    echo ""
    echo "To start PostgreSQL with Docker, run:"
    echo "  docker-compose up -d"
    exit 1
fi

echo "✓ PostgreSQL is running"
echo ""

# Setup Backend
echo "================================================"
echo "Setting up Backend..."
echo "================================================"

# Install Python dependencies
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null

# Install requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt > /dev/null 2>&1

# Run migrations
echo "Running database migrations..."
python manage.py migrate > /dev/null 2>&1

echo "✓ Backend setup complete"
echo ""

# Setup Frontend
echo "================================================"
echo "Setting up Frontend..."
echo "================================================"

if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install > /dev/null 2>&1
fi

# Copy .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cp .env.local.example .env.local
fi

echo "✓ Frontend setup complete"
echo ""

echo "================================================"
echo "Starting Services..."
echo "================================================"
echo ""
echo "Backend server will start at: http://localhost:8000"
echo "Frontend server will start at: http://localhost:3000"
echo ""
echo "To stop the servers, press Ctrl+C in each terminal"
echo ""

# Start backend in background
echo "Starting Django backend..."
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
python manage.py runserver &
BACKEND_PID=$!

# Give backend time to start
sleep 3

# Start frontend
echo "Starting Next.js frontend..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
