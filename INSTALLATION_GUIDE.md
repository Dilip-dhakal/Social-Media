# Complete Installation Guide

## Prerequisites

Before starting, ensure you have:
- Python 3.9+ installed ([download](https://www.python.org/downloads/))
- PostgreSQL installed and running ([download](https://www.postgresql.org/download/))
- Git installed ([download](https://git-scm.com/downloads))
- Node.js 18+ for frontend ([download](https://nodejs.org/))

### Verify Installations
```bash
python --version
psql --version
git --version
node --version
```

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Dilip-dhakal/Social-Media.git
cd Social-Media

# Switch to the development branch if needed
git checkout drf-project
```

## Step 2: Setup PostgreSQL Database

### Option A: Using Docker Compose
```bash
# Start PostgreSQL using docker-compose
docker-compose up -d postgres redis

# Verify it's running
docker-compose ps
```

### Option B: Manual PostgreSQL Setup
```bash
# Create a new PostgreSQL database
createdb socialmedia_db

# Create a PostgreSQL user (if you don't have one)
createuser socialmedia_user --password
# Enter password when prompted

# Grant privileges
psql -d socialmedia_db
# Then run:
# ALTER USER socialmedia_user WITH CREATEDB;
# \q to exit
```

## Step 3: Backend Setup

### 3.1 Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip
```

### 3.2 Install Dependencies

Choose one based on your use case:

**Development Setup (Recommended for development)**
```bash
pip install -r requirements-dev.txt
```

**Production Setup (For deployment)**
```bash
pip install -r requirements-prod.txt
```

**Testing Setup (For running tests)**
```bash
pip install -r requirements-test.txt
```

**Minimal Setup (Only essentials)**
```bash
pip install -r requirements.txt
```

### 3.3 Create .env File
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
# Important variables to update:
# - DATABASE_URL: postgresql://user:password@localhost/socialmedia_db
# - SECRET_KEY: Generate a new one
# - DEBUG: Set to False for production
```

Sample .env file:
```
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production
DB_ENGINE=django.db.backends.postgresql
DB_NAME=socialmedia_db
DB_USER=socialmedia_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1

# JWT Settings
JWT_SECRET_KEY=your-jwt-secret-key

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3.4 Run Migrations
```bash
# Activate virtual environment if not already activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser for admin panel
python manage.py createsuperuser
# Follow the prompts to create admin credentials
```

### 3.5 Verify Installation
```bash
# Run development server
python manage.py runserver

# Visit http://localhost:8000/api/
# You should see the Django REST Framework API
```

## Step 4: Frontend Setup

### 4.1 Install Frontend Dependencies
```bash
# Navigate to project root if not already there
cd /path/to/project

# Install npm dependencies
npm install
# or using yarn:
yarn install
# or using pnpm:
pnpm install
```

### 4.2 Create .env.local File
```bash
# Create .env.local file
cp .env.local.example .env.local

# The file should contain:
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4.3 Verify Frontend Installation
```bash
# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Visit http://localhost:3000
# You should see the frontend application
```

## Step 5: Verify Full Setup

### Backend Verification
```bash
# 1. Check Python version
python --version

# 2. Check virtual environment is activated
which python  # macOS/Linux - should show venv path
# or on Windows:
where python  # should show venv path

# 3. Check installed packages
pip list

# 4. Test database connection
python manage.py dbshell
# Type \q to exit

# 5. Run tests
pytest

# 6. Check API endpoints
curl http://localhost:8000/api/
```

### Frontend Verification
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check installed packages
npm list

# Verify build works
npm run build

# Check for errors
npm run lint
```

## Running the Full Application

### Terminal 1: Backend
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

### Terminal 2: Frontend
```bash
npm run dev
```

### Terminal 3 (Optional): Redis
```bash
# If using Docker:
docker-compose up redis

# Or if Redis is installed locally:
redis-server
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

## Troubleshooting

### PostgreSQL Connection Issues
```bash
# Test connection
psql -U socialmedia_user -d socialmedia_db -h localhost

# If connection fails:
# 1. Ensure PostgreSQL is running
# 2. Check credentials in .env
# 3. Verify database exists:
psql -l
```

### Python Version Issues
```bash
# Check Python version
python --version

# If using multiple Python versions:
python3.9 -m venv venv  # Specify version
python3.9 -m pip install -r requirements.txt
```

### Port Already in Use
```bash
# Change port for Django
python manage.py runserver 8001

# Change port for Next.js
npm run dev -- -p 3001
```

### Virtual Environment Issues
```bash
# Delete and recreate
rm -rf venv  # or rmdir /s venv on Windows
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Module Not Found Errors
```bash
# Reinstall all dependencies
pip install --force-reinstall -r requirements.txt

# Or clear cache and reinstall
pip cache purge
pip install -r requirements.txt
```

### Database Migration Errors
```bash
# Reset migrations (CAUTION: This deletes data)
python manage.py migrate zero <app_name>

# Recreate migrations
python manage.py makemigrations
python manage.py migrate
```

## Environment-Specific Setup

### Development Environment
```bash
# Install dev requirements
pip install -r requirements-dev.txt

# Enable debug mode in .env
DEBUG=True

# Run with hot reload
python manage.py runserver
npm run dev
```

### Production Environment
```bash
# Install prod requirements
pip install -r requirements-prod.txt

# Set debug to false in .env
DEBUG=False

# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn socialmedia.wsgi:application --bind 0.0.0.0:8000
```

### Testing Environment
```bash
# Install test requirements
pip install -r requirements-test.txt

# Run tests
pytest

# With coverage
pytest --cov=core --cov-report=html
```

## Quick Setup Script

For automatic setup, use the provided start scripts:

### macOS/Linux
```bash
chmod +x start.sh
./start.sh
```

### Windows
```bash
start.bat
```

## Docker Setup (Alternative)

If you prefer Docker:

```bash
# Build Docker image
docker-compose build

# Start services
docker-compose up

# Run migrations
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser
```

## Next Steps

1. Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common commands
2. Check [START_HERE.md](START_HERE.md) for overview
3. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
4. Start developing!

## Getting Help

- Check existing issues: https://github.com/Dilip-dhakal/Social-Media/issues
- Review [CONFIGURATION.md](CONFIGURATION.md) for detailed settings
- Consult [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) for testing

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Documentation](https://jwt.io/)
