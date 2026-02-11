# Django & React Commands Reference

## Quick Reference

### Backend Commands (Django)

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create virtual environment
python3 -m venv venv

# Run migrations
python3 manage.py migrate

# Create superuser
python3 manage.py createsuperuser

# Start development server
python3 manage.py runserver
python3 manage.py runserver 0.0.0.0:8000  # Listen on all interfaces

# Create new migrations
python3 manage.py makemigrations

# Check migrations
python3 manage.py showmigrations

# Shell (Django interactive shell)
python3 manage.py shell

# Collect static files (production)
python3 manage.py collectstatic

# Clear database (WARNING: deletes all data)
python3 manage.py flush

# Run tests
python3 manage.py test
```

### Frontend Commands (React/Vite)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Preview production build locally
npm run preview
```

## Full Startup Process

### Terminal 1 - Backend:
```bash
# Create venv (first time only)
python3 -m venv venv

# Activate venv
source venv/bin/activate  # or: venv\Scripts\activate on Windows

# Install dependencies (first time only)
pip install -r requirements.txt

# Run migrations (first time only)
python3 manage.py migrate

# Create superuser (first time only)
python3 manage.py createsuperuser

# Start server
python3 manage.py runserver
```

### Terminal 2 - Frontend:
```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

Then visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Django Admin: http://localhost:8000/admin

## Development Workflow

### After Modifying Models:
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### Testing API Endpoints:
```bash
# Use curl:
curl http://localhost:8000/api/posts/

# Or use the browsable API:
# Visit: http://localhost:8000/api/
```

### Checking Database:
```bash
# Enter Django shell
python3 manage.py shell

# Example queries:
# from core.user.models import CustomUser
# users = CustomUser.objects.all()
# users.count()
```

## Deactivate Virtual Environment

```bash
deactivate
```

## Windows-Specific Notes

- Use `python` instead of `python3`
- Use `venv\Scripts\activate` to activate venv
- Use backslashes for file paths: `venv\Scripts\activate`
- PowerShell may need: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
