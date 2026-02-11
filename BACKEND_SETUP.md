# Django Backend Setup Guide

## System Requirements
- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

## Database Configuration
The backend uses PostgreSQL. Make sure you have the credentials:
- **Database**: `coredb`
- **User**: `postgres`
- **Password**: `root`
- **Host**: `localhost`
- **Port**: `5432`

## Installation & Setup

### 1. Create and Activate Virtual Environment (Recommended)
```bash
# Create virtual environment
python3 -m venv venv

# Activate it
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install the essential packages:
```bash
pip install Django==6.0.1
pip install djangorestframework
pip install psycopg2-binary  # PostgreSQL adapter
pip install python-decouple  # For environment variables
pip install django-cors-headers  # For CORS support (frontend)
pip install djangorestframework-simplejwt  # For JWT authentication
```

### 3. Database Setup

#### Step 1: Ensure PostgreSQL is Running
```bash
# Check if PostgreSQL is running
psql -U postgres

# If not installed, install PostgreSQL
# On Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# On Mac (with Homebrew):
brew install postgresql
```

#### Step 2: Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# In psql prompt, create the database:
CREATE DATABASE coredb;

# Exit psql
\q
```

#### Step 3: Run Migrations
```bash
# Apply all migrations
python3 manage.py migrate

# You should see output like:
# Operations to perform:
#   Apply all migrations: admin, auth, contenttypes, core, post, sessions, user
# Running migrations:
#   Applying core.0001_initial... OK
#   Applying core.user.0001_initial... OK
#   ...
```

### 4. Create Superuser (Admin Account)
```bash
python3 manage.py createsuperuser

# Follow the prompts:
# Username: admin
# Email: admin@example.com
# Password: (enter your choice)
```

### 5. Run Development Server
```bash
python3 manage.py runserver

# Server will start at http://localhost:8000
# Admin panel at http://localhost:8000/admin
```

## Correct Commands (Linux/Mac)

**WRONG:**
```bash
py manage.py makemigrations  # ❌ Won't work on Linux
```

**CORRECT:**
```bash
python3 manage.py makemigrations  # ✅ Use python3 on Linux/Mac
python manage.py makemigrations   # ✅ Also works if python is aliased
```

## Common Management Commands

```bash
# Create migrations (after model changes)
python3 manage.py makemigrations

# Apply migrations to database
python3 manage.py migrate

# Run development server
python3 manage.py runserver

# Run development server on specific port
python3 manage.py runserver 0.0.0.0:8000

# Create superuser
python3 manage.py createsuperuser

# Access Django shell
python3 manage.py shell

# Collect static files (production)
python3 manage.py collectstatic

# Run tests
python3 manage.py test
```

## CORS Configuration

The frontend (React) runs on `http://localhost:5173` by default. To allow requests from the frontend to the backend API, update `socialmedia/settings.py`:

```python
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # ... other middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## Running Frontend + Backend Together

### Terminal 1 - Backend
```bash
cd /vercel/share/v0-project
source venv/bin/activate  # If using venv
python3 manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd /vercel/share/v0-project/frontend
npm install
npm run dev
```

Then visit `http://localhost:5173` to use the app!

## API Endpoints

See `/vercel/share/v0-project/frontend/API_ENDPOINTS.md` for complete API documentation.

## Troubleshooting

### Error: "psycopg2: can't adapt type 'bytes'"
**Solution**: Update psycopg2: `pip install --upgrade psycopg2-binary`

### Error: "Couldn't import Django"
**Solution**: 
1. Activate virtual environment: `source venv/bin/activate`
2. Install Django: `pip install Django==6.0.1`

### Error: "Database does not exist"
**Solution**: Create database in PostgreSQL:
```bash
psql -U postgres -c "CREATE DATABASE coredb;"
```

### Error: "connection refused" to database
**Solution**: 
1. Check PostgreSQL is running: `psql -U postgres`
2. Verify database credentials in `socialmedia/settings.py`
3. Make sure PostgreSQL is listening on localhost:5432

### Port 8000 already in use
**Solution**: Use different port:
```bash
python3 manage.py runserver 8001
```

## Production Deployment

Before deploying to production:
1. Set `DEBUG = False` in settings.py
2. Update `ALLOWED_HOSTS` with your domain
3. Use a strong `SECRET_KEY`
4. Set up environment variables for sensitive data
5. Use a production database (PostgreSQL recommended)
6. Use gunicorn or similar WSGI server
7. Set up proper logging and error monitoring

## Environment Variables

Create a `.env` file in the project root:
```
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_NAME=coredb
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

Then update `settings.py` to use these variables with `python-decouple`.
