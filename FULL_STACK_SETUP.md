# Full Stack Setup Guide

Complete guide to set up and run both the Django backend and React frontend for the Social Media application.

## System Requirements

- Python 3.8+
- Node.js v16+
- pip (Python package manager)
- npm or yarn (Node package manager)
- PostgreSQL (optional, SQLite works for development)
- Git

## Architecture Overview

```
┌─────────────────────────────────────┐
│   React Frontend (Port 5173)        │
│  (Vite Dev Server / Nginx)          │
└─────────────────┬───────────────────┘
                  │ HTTP/REST
                  ↓
┌─────────────────────────────────────┐
│   Django Backend (Port 8000)        │
│  (Django Dev Server / Gunicorn)     │
└─────────────────┬───────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│   Database (SQLite/PostgreSQL)      │
└─────────────────────────────────────┘
```

## Backend Setup

### 1. Python Environment Setup

```bash
# Navigate to project root
cd /path/to/social-media

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 2. Install Backend Dependencies

```bash
# Install packages from requirements.txt
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

### 3. Database Configuration

By default, Django uses SQLite for development. To use PostgreSQL:

Edit `socialmedia/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'socialmedia',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 4. Database Migrations

```bash
# Create migrations for new changes
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

### 5. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow prompts to create an admin account for accessing Django admin panel.

### 6. Start Backend Server

```bash
# Start Django development server
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

Admin panel: `http://localhost:8000/admin`

API endpoints: `http://localhost:8000/api/`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Ensure `.env` contains:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start Frontend Development Server

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Running Both Servers

### Option 1: Multiple Terminal Windows (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd /path/to/social-media
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd /path/to/social-media/frontend
npm run dev
```

### Option 2: Using Process Manager (pm2)

```bash
# Install pm2 globally
npm install -g pm2

# Create ecosystem.config.js in project root
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: "backend",
      script: "python",
      args: "manage.py runserver",
      cwd: "./",
      interpreter: "./venv/bin/python"
    },
    {
      name: "frontend",
      script: "npm",
      args: "run dev",
      cwd: "./frontend"
    }
  ]
};
EOF

# Start both servers
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Stop servers
pm2 stop all
```

### Option 3: Using Docker (Production-like Setup)

**Dockerfile for Backend:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

**Dockerfile for Frontend:**
```dockerfile
FROM node:18-slim
WORKDIR /app
COPY frontend/package*.json .
RUN npm install
COPY frontend . .
CMD ["npm", "run", "dev"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DEBUG=True
      - DATABASE_URL=postgresql://user:password@db:5432/socialmedia
    depends_on:
      - db

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=socialmedia
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## Initial Data (Optional)

### Create Test Users via API

```bash
# Register test user
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "first_name": "Test",
    "last_name": "User",
    "password": "testpass123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

### Create Test Data via Django Admin

1. Go to `http://localhost:8000/admin`
2. Log in with superuser credentials
3. Add users, posts, and comments through admin interface

## Development Workflow

### Backend Changes

1. Make changes to Django models, views, or serializers
2. If models changed:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
3. Server should auto-reload (if development server is running)
4. Test API with cURL or Postman

### Frontend Changes

1. Make changes to React components or styles
2. Frontend auto-reloads via Vite HMR
3. Check browser console for errors

### API Testing

**Using cURL:**
```bash
# Get all posts
curl -X GET http://localhost:8000/api/post/ \
  -H "Authorization: Bearer <access_token>"

# Create post
curl -X POST http://localhost:8000/api/post/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"body": "Hello, World!"}'
```

**Using Postman:**
1. Import API collection from `API_ENDPOINTS.md`
2. Set environment variable: `BASE_URL = http://localhost:8000/api`
3. Set authorization token for authenticated endpoints
4. Test each endpoint

## Debugging

### Backend Debugging

```python
# In Django view/serializer
import logging
logger = logging.getLogger(__name__)

# Log messages
logger.debug("Debug message")
logger.info("Info message")
logger.error("Error message")

# Print statements appear in console
print("Debug output:", variable)
```

### Frontend Debugging

```jsx
// In React component
console.log("[v0] Variable:", variable)
console.warn("Warning message")
console.error("Error message")

// Use React DevTools in browser
```

### Network Debugging

**Browser DevTools:**
1. Press F12 to open DevTools
2. Go to Network tab
3. Filter by XHR to see API requests
4. Click request to see details
5. Check Response tab for data

**API Debugging Tools:**
- Postman (GUI tool for testing APIs)
- Thunder Client (VS Code extension)
- REST Client (VS Code extension)

## Common Issues & Solutions

### Issue: CORS Errors

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/post/'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
In `socialmedia/settings.py`, ensure CORS is configured:
```python
INSTALLED_APPS = [
    'corsheaders',
    # ... other apps
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

### Issue: 401 Unauthorized Errors

**Possible Causes:**
1. Token expired - frontend should refresh automatically
2. Token not sent in header
3. Invalid token format

**Solution:**
1. Clear localStorage in browser
2. Log out and log in again
3. Check token in browser DevTools Application tab

### Issue: Database Errors

**Error:** `no such table: core_user_User`

**Solution:**
```bash
# Run migrations
python manage.py migrate
```

### Issue: Port Already in Use

**Django:**
```bash
# Use different port
python manage.py runserver 8001
```

**Frontend:**
```bash
# Vite automatically uses next available port
npm run dev
# Check output for actual port used
```

### Issue: Module Not Found in Backend

```bash
# Ensure virtual environment is activated
# Reinstall packages
pip install -r requirements.txt
```

## Production Deployment

### Backend (Gunicorn + Nginx)

```bash
# Install production server
pip install gunicorn whitenoise

# Run with Gunicorn
gunicorn socialmedia.wsgi:application --bind 0.0.0.0:8000
```

### Frontend (Build + Static Hosting)

```bash
# Build optimized version
npm run build

# Output in frontend/dist/ ready for deployment
# Deploy to:
# - Vercel (npm i -g vercel)
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
# - Nginx static files
```

### Environment Variables

**Backend (.env):**
```
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend (.env.production):**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## Database Backup

### SQLite
```bash
# Simple copy
cp db.sqlite3 db.sqlite3.backup

# Or backup to JSON
python manage.py dumpdata > backup.json
```

### PostgreSQL
```bash
# Backup
pg_dump socialmedia > backup.sql

# Restore
psql socialmedia < backup.sql
```

## Performance Monitoring

### Django Debug Toolbar
```bash
pip install django-debug-toolbar

# Add to INSTALLED_APPS in settings.py
INSTALLED_APPS = [
    'debug_toolbar',
    # ... other apps
]

# Add to MIDDLEWARE
MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    # ... other middleware
]

# Add to urls.py
urlpatterns = [
    path('__debug__/', include('debug_toolbar.urls')),
    # ... other urls
]
```

### Browser Performance
1. Open DevTools (F12)
2. Go to Performance tab
3. Record page load
4. Analyze for bottlenecks

## Useful Commands

```bash
# Backend
python manage.py shell              # Django shell
python manage.py test              # Run tests
python manage.py makemigrations    # Create migrations
python manage.py migrate           # Apply migrations
python manage.py createsuperuser   # Create admin

# Frontend
npm run dev                         # Development
npm run build                       # Production build
npm run preview                     # Preview build
npm test                           # Run tests (if configured)
```

## Next Steps

1. Register test users through the UI
2. Create test posts and comments
3. Test all features in browser
4. Review API documentation
5. Check both server logs for any issues
6. Proceed to production deployment when ready

## Support & Documentation

- Django: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Project API Docs: See `API_ENDPOINTS.md`
- Frontend Docs: See `frontend/README.md`
- Frontend Setup: See `FRONTEND_SETUP.md`
