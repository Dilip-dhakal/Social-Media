# Requirements & Dependencies Index

## Quick Links

Need help with something specific? Jump to the right guide:

- **Just want to install?** → [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
- **Need a quick reference?** → [REQUIREMENTS_SUMMARY.md](REQUIREMENTS_SUMMARY.md)
- **Want detailed info on packages?** → [REQUIREMENTS_GUIDE.md](REQUIREMENTS_GUIDE.md)
- **Having issues?** → [DEPENDENCY_TROUBLESHOOTING.md](DEPENDENCY_TROUBLESHOOTING.md)
- **Want all commands?** → [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

## Requirements Files Reference

### Main Requirements Files

#### 1. `requirements.txt` (Recommended for Development)
- **Purpose**: Balanced setup for development and production
- **Packages**: 48 packages including development tools
- **Install**: `pip install -r requirements.txt`
- **Best for**: General development and learning

```bash
pip install -r requirements.txt
```

#### 2. `requirements-dev.txt` (Development Only)
- **Purpose**: Full development setup with code quality tools
- **Packages**: All of requirements.txt + development tools
- **Install**: `pip install -r requirements-dev.txt`
- **Best for**: Active development with code quality checks

```bash
pip install -r requirements-dev.txt
```

#### 3. `requirements-prod.txt` (Production)
- **Purpose**: Optimized for production deployment
- **Packages**: 44 packages, security hardened
- **Install**: `pip install -r requirements-prod.txt`
- **Best for**: Deploying to production servers

```bash
pip install -r requirements-prod.txt
```

#### 4. `requirements-test.txt` (Testing)
- **Purpose**: Complete testing setup
- **Packages**: All base packages + testing tools
- **Install**: `pip install -r requirements-test.txt`
- **Best for**: Running tests and CI/CD pipelines

```bash
pip install -r requirements-test.txt
```

## By Use Case

### I want to start developing
```bash
pip install -r requirements-dev.txt
python manage.py migrate
python manage.py runserver
```
→ Read: [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)

### I want to deploy to production
```bash
pip install -r requirements-prod.txt
python manage.py collectstatic
gunicorn socialmedia.wsgi:application
```
→ Read: [CONFIGURATION.md](CONFIGURATION.md)

### I want to run tests
```bash
pip install -r requirements-test.txt
pytest
```
→ Read: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### I'm having dependency issues
```bash
pip check
pip cache purge
pip install -r requirements.txt --force-reinstall
```
→ Read: [DEPENDENCY_TROUBLESHOOTING.md](DEPENDENCY_TROUBLESHOOTING.md)

## Package Categories

### Core Framework (Required)
- Django 6.0.1
- Django REST Framework 3.14.0
- CORS Headers 4.3.1

### Authentication (Required)
- djangorestframework-simplejwt 5.3.2

### Database (Required)
- psycopg2-binary 2.9.9

### Utilities (Required)
- Pillow 10.1.0 (image processing)
- python-dotenv 1.0.0 (environment variables)
- Gunicorn 21.2.0 (production server)

### API Enhancements
- drf-spectacular 0.27.0 (API documentation)
- django-filter 24.1 (advanced filtering)
- djangorestframework-ratelimit 1.0.1 (rate limiting)

### Performance (Optional)
- django-redis 5.4.0
- redis 5.0.1

### Development Only
- Black 23.12.0 (code formatter)
- Flake8 6.1.0 (linter)
- Pytest 7.4.3 (testing)

## Installation Scenarios

### Scenario 1: Fresh Start
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```
Time: ~2-3 minutes

### Scenario 2: Development + Testing
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements-dev.txt
python manage.py migrate
pytest
```
Time: ~3-4 minutes

### Scenario 3: Production Deployment
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements-prod.txt
python manage.py collectstatic
gunicorn socialmedia.wsgi:application
```
Time: ~2-3 minutes

### Scenario 4: Docker Setup (No installation needed)
```bash
docker-compose build
docker-compose up
docker-compose exec web python manage.py migrate
```

## Common Commands

### Installation
```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt
pip install -r requirements-prod.txt
pip install -r requirements-test.txt
```

### Verification
```bash
pip list
pip check
pip show Django
```

### Updates
```bash
pip list --outdated
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt
```

### Troubleshooting
```bash
pip cache purge
pip install --force-reinstall -r requirements.txt
pip install -r requirements.txt --no-cache-dir
```

## Total Package Count

| Environment | Packages | Size |
|------------|----------|------|
| Minimal | 10 | ~300 MB |
| Standard (requirements.txt) | 48 | ~1.2 GB |
| Development | 55+ | ~2.5 GB |
| Production | 44 | ~1.0 GB |
| Testing | 55+ | ~2.0 GB |

## Documentation Structure

```
├── REQUIREMENTS_INDEX.md (You are here)
├── REQUIREMENTS_SUMMARY.md (Quick overview)
├── REQUIREMENTS_GUIDE.md (Detailed package info)
├── INSTALLATION_GUIDE.md (Step-by-step setup)
├── DEPENDENCY_TROUBLESHOOTING.md (Problems & solutions)
├── QUICK_REFERENCE.md (Command cheatsheet)
│
├── requirements.txt (Main dependencies)
├── requirements-dev.txt (Development tools)
├── requirements-prod.txt (Production only)
├── requirements-test.txt (Testing tools)
│
├── .env (Backend configuration)
├── .env.example (Backend example)
├── .env.local (Frontend configuration)
└── .env.local.example (Frontend example)
```

## File Descriptions

### Documentation Files

#### REQUIREMENTS_SUMMARY.md (this section's summary)
- Quick overview of all requirements files
- Package breakdown by category
- Total counts and statistics
- Common issues and solutions
- **Read when:** You want a quick overview

#### REQUIREMENTS_GUIDE.md (detailed reference)
- Complete explanation of each package
- Why each package is needed
- How to install and troubleshoot
- Environment-specific recommendations
- **Read when:** You want to understand specific packages

#### INSTALLATION_GUIDE.md (full setup instructions)
- Step-by-step installation process
- PostgreSQL setup
- Backend and frontend setup
- Virtual environment management
- Verification steps
- **Read when:** Setting up the project for the first time

#### DEPENDENCY_TROUBLESHOOTING.md (problem solving)
- Common dependency errors and solutions
- Platform-specific issues (macOS, Windows, Linux)
- Version compatibility information
- Security update procedures
- **Read when:** You encounter dependency errors

#### QUICK_REFERENCE.md (commands cheatsheet)
- Common commands and shortcuts
- Quick setup scripts
- Testing commands
- Deployment commands
- **Read when:** You need a quick command

## Virtual Environment

### Create Virtual Environment
```bash
python -m venv venv
```

### Activate Virtual Environment
```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Verify Activation
```bash
which python  # macOS/Linux
where python  # Windows
# Should show path with 'venv' in it
```

### Deactivate Virtual Environment
```bash
deactivate
```

## Database Setup

### With Docker (Recommended)
```bash
docker-compose up postgres redis
```

### Manual PostgreSQL
```bash
createdb socialmedia_db
createuser socialmedia_user --password
```

## Next Steps

1. **First time?** → Go to [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
2. **Need details?** → Go to [REQUIREMENTS_GUIDE.md](REQUIREMENTS_GUIDE.md)
3. **Having issues?** → Go to [DEPENDENCY_TROUBLESHOOTING.md](DEPENDENCY_TROUBLESHOOTING.md)
4. **Quick help?** → Go to [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

## Getting Started (Choose One)

### Option 1: Automatic Setup (Recommended)
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Option 3: Docker Setup
```bash
docker-compose up
docker-compose exec web python manage.py migrate
```

## Support Resources

| Issue | Resource |
|-------|----------|
| Installation problems | [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) |
| Dependency errors | [DEPENDENCY_TROUBLESHOOTING.md](DEPENDENCY_TROUBLESHOOTING.md) |
| Package details | [REQUIREMENTS_GUIDE.md](REQUIREMENTS_GUIDE.md) |
| Quick commands | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| Configuration | [CONFIGURATION.md](CONFIGURATION.md) |

## Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-key-here
DB_NAME=socialmedia_db
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Summary

This project has **comprehensive dependency documentation**:
- 4 different requirements files for different use cases
- 5 detailed documentation files
- Clear instructions for each scenario
- Troubleshooting guides
- Command references

Choose the file that matches your needs and follow the instructions!

---

**Last updated:** February 2026
**Status:** Production Ready ✓
