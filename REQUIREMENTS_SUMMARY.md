# Requirements Summary

## Quick Overview

This project uses Python dependencies managed through pip and requirements files. All dependencies are pinned to specific versions for stability.

## Available Requirements Files

### 1. `requirements.txt` (Main - 48 lines)
**Use when:** You want a balanced setup for development and production
**Install:** `pip install -r requirements.txt`

**Includes:**
- Core Django and DRF
- CORS support
- JWT authentication
- PostgreSQL driver
- Image processing
- Environment variables
- Production server (Gunicorn)
- API documentation
- Development tools (Black, Flake8, isort)
- Testing (pytest)
- Security packages
- Caching support (Redis)
- Rate limiting
- Logging
- Phone number validation

**File size:** 48 packages
**Best for:** Full featured development and small production deployments

### 2. `requirements-dev.txt` (33 lines)
**Use when:** You're actively developing the project
**Install:** `pip install -r requirements-dev.txt`

**Includes:**
- All packages from `requirements.txt`
- Code quality tools (Black, Flake8, isort, pylint, mypy)
- Testing tools (pytest with plugins)
- Debugging tools (Django debug toolbar, IPython)
- Documentation tools (Sphinx)

**Best for:** Active development with code quality checks

### 3. `requirements-prod.txt` (56 lines)
**Use when:** Deploying to production
**Install:** `pip install -r requirements-prod.txt`

**Includes:**
- Core production packages
- Security hardening
- Performance optimization
- Static file handling (WhiteNoise)
- Monitoring tools (Sentry SDK)
- Background tasks (Celery)

**Best for:** Production deployment with monitoring and scaling

### 4. `requirements-test.txt` (33 lines)
**Use when:** Running tests
**Install:** `pip install -r requirements-test.txt`

**Includes:**
- All packages from `requirements.txt`
- Testing frameworks (pytest, pytest-django)
- Test utilities (factory-boy, faker)
- Coverage reporting
- API testing tools
- Mock utilities

**Best for:** Comprehensive test coverage and CI/CD pipelines

## Dependency Breakdown

### Core Framework (Required)
```
Django==6.0.1
djangorestframework==3.14.0
```
- Modern web framework and REST API toolkit

### Authentication & Security (Required)
```
djangorestframework-simplejwt==5.3.2
cryptography==41.0.7
django-cors-headers==4.3.1
```
- JWT token support for API authentication
- Cryptographic operations
- Cross-origin request handling

### Database (Required)
```
psycopg2-binary==2.9.9
```
- PostgreSQL adapter for Python
- Enables communication with PostgreSQL database

### Image & File Handling (Required)
```
Pillow==10.1.0
```
- Image processing for user avatars and posts

### API Features (Required)
```
django-filter==24.1
drf-spectacular==0.27.0
djangorestframework-ratelimit==1.0.1
```
- Advanced filtering for API endpoints
- Auto-generated API documentation (Swagger/OpenAPI)
- API rate limiting to prevent abuse

### Environment & Configuration (Required)
```
python-dotenv==1.0.0
python-decouple==3.8
```
- Load environment variables from `.env` file
- Configuration management

### Production Server (Recommended)
```
gunicorn==21.2.0
whitenoise==6.6.0
```
- Production-grade WSGI server
- Efficient static file serving

### Performance (Optional)
```
django-redis==5.4.0
redis==5.0.1
```
- Redis integration for caching
- Improves response times and reduces database load

### Code Quality (Development Only)
```
black==23.12.0
flake8==6.1.0
isort==5.13.2
pylint==3.0.3
mypy==1.7.1
```
- Code formatting and linting
- Type checking
- Import sorting

### Testing (Development/CI Only)
```
pytest==7.4.3
pytest-django==4.7.0
pytest-cov==4.1.0
factory-boy==3.3.0
faker==21.0.0
```
- Testing framework and Django integration
- Coverage reporting
- Test data factories and fake data generation

### Debugging (Development Only)
```
django-extensions==3.2.3
django-debug-toolbar==4.2.0
ipython==8.18.1
ipdb==0.13.13
```
- Extra Django commands
- Visual debugging dashboard
- Enhanced Python shell

### Monitoring (Production Optional)
```
sentry-sdk==1.38.0
python-json-logger==2.0.7
```
- Error tracking and monitoring
- JSON formatted logging for better log analysis

### Background Jobs (Optional)
```
celery==5.3.4
celery-beat==2.5.0
```
- Asynchronous task queue
- Scheduled task execution

## Installation Instructions

### First Time Setup

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# 3. Install dependencies
pip install -r requirements.txt
```

### Development Setup

```bash
pip install -r requirements-dev.txt
```

### Production Setup

```bash
pip install -r requirements-prod.txt
```

### Testing Setup

```bash
pip install -r requirements-test.txt
```

## Total Package Count

- **requirements.txt**: 48 packages (balanced)
- **requirements-dev.txt**: 48 + development tools
- **requirements-prod.txt**: Optimized subset for production (44 packages)
- **requirements-test.txt**: 48 + testing tools

## Version Information

- **Python**: 3.9+
- **Django**: 6.0.1
- **Django REST Framework**: 3.14.0
- **PostgreSQL**: 12+ (recommended 13+)
- **Node.js**: 18+ (for frontend)

## Database Setup

Before installing Python dependencies, ensure PostgreSQL is set up:

```bash
# Using Docker (Recommended)
docker-compose up postgres

# Or manually
createdb socialmedia_db
createuser socialmedia_user --password
```

## Verification

After installation, verify everything works:

```bash
# Check all imports
pip check

# Run migrations
python manage.py migrate

# Test API
python manage.py runserver
# Visit http://localhost:8000/api/

# Run tests (if requirements-test.txt installed)
pytest
```

## Updating Dependencies

### Check for Updates
```bash
pip list --outdated
```

### Update Safely
```bash
# Update specific package
pip install --upgrade Django

# Update all (caution)
pip install --upgrade -r requirements.txt

# Freeze updated versions
pip freeze > requirements.txt
```

## Common Issues & Solutions

### psycopg2 Installation Fails
```bash
pip install psycopg2-binary
# or use PostgreSQL from system: pip install psycopg2
```

### Pillow Installation Fails
```bash
# macOS
brew install jpeg libpng

# Ubuntu/Debian
sudo apt-get install libjpeg-dev zlib1g-dev
```

### Virtual Environment Not Activated
```bash
# Check if activated (should see (venv) in prompt)
source venv/bin/activate  # macOS/Linux
```

### Module Not Found
```bash
# Reinstall all dependencies
pip install -r requirements.txt --force-reinstall
```

## Performance Tips

### Faster Installation
```bash
# Skip cache for faster download
pip install --no-cache-dir -r requirements.txt

# Prefer pre-built wheels
pip install --prefer-binary -r requirements.txt
```

### Lighter Installation
```bash
# Use minimal requirements only
pip install -r requirements.txt

# Exclude optional packages like Celery if not needed
```

## Security Best Practices

1. **Regular Updates**: Check for security updates monthly
   ```bash
   safety check
   ```

2. **Use Virtual Environment**: Always isolate project dependencies
   ```bash
   python -m venv venv
   ```

3. **Pin Versions**: Never use unpinned dependencies in production
   ```bash
   Django==6.0.1  # Good
   Django>=6.0    # Not for production
   ```

4. **Audit Dependencies**: Check for known vulnerabilities
   ```bash
   pip install safety
   safety check
   ```

## Documentation Files

For more information, see:
- **REQUIREMENTS_GUIDE.md** - Detailed package explanations
- **INSTALLATION_GUIDE.md** - Step-by-step installation
- **DEPENDENCY_TROUBLESHOOTING.md** - Common issues and solutions
- **QUICK_REFERENCE.md** - Quick command reference

## Summary Table

| File | Use Case | Package Count | Size |
|------|----------|---------------|------|
| requirements.txt | Balanced/Development | 48 | ~1.2 MB |
| requirements-dev.txt | Active Development | 55+ | ~2.5 MB |
| requirements-prod.txt | Production | 44 | ~1.0 MB |
| requirements-test.txt | Testing/CI-CD | 55+ | ~2.0 MB |

## Next Steps

1. Run `pip install -r requirements.txt`
2. Follow [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for full setup
3. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
4. Review [REQUIREMENTS_GUIDE.md](REQUIREMENTS_GUIDE.md) for details

## Support

- For installation issues, see [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
- For dependency errors, see [DEPENDENCY_TROUBLESHOOTING.md](DEPENDENCY_TROUBLESHOOTING.md)
- For package details, see [REQUIREMENTS_GUIDE.md](REQUIREMENTS_GUIDE.md)
