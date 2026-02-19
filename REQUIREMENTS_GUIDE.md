# Requirements.txt Guide

## Overview
This document explains all dependencies in `requirements.txt` and how to manage them.

## Installation Instructions

### First Time Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install all dependencies
pip install -r requirements.txt

# Upgrade pip (recommended)
pip install --upgrade pip
```

### Update Existing Installation
```bash
# Activate virtual environment first
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Install/upgrade dependencies
pip install -r requirements.txt --upgrade
```

## Dependency Breakdown

### Core Framework (Required)
- **Django==6.0.1**: Web framework for building the API
- **djangorestframework==3.14.0**: Toolkit for building REST APIs

### CORS Support (Required)
- **django-cors-headers==4.3.1**: Handles Cross-Origin Resource Sharing for frontend communication

### Authentication (Required)
- **djangorestframework-simplejwt==5.3.2**: JWT token authentication and refresh tokens

### Database (Required)
- **psycopg2-binary==2.9.9**: PostgreSQL adapter for Python (ensure PostgreSQL is installed)

### Filtering & Search (Required)
- **django-filter==24.1**: Advanced filtering capabilities for API endpoints

### Image Processing (Required)
- **Pillow==10.1.0**: Image handling for user avatars and post images

### Environment Variables (Required)
- **python-dotenv==1.0.0**: Load environment variables from `.env` file
- **python-decouple==3.8**: Alternative environment variable configuration

### Production (Recommended)
- **gunicorn==21.2.0**: WSGI HTTP Server for production deployment

### API Documentation (Recommended)
- **drf-spectacular==0.27.0**: Auto-generate API documentation (Swagger/OpenAPI)

### Development Tools (Optional)
- **django-extensions==3.2.3**: Extra Django management commands
- **black==23.12.0**: Code formatter
- **flake8==6.1.0**: Code linter
- **isort==5.13.2**: Import sorting tool

### Testing (Optional)
- **pytest==7.4.3**: Testing framework
- **pytest-django==4.7.0**: Django plugin for pytest
- **pytest-cov==4.1.0**: Coverage reporting

### Security (Recommended)
- **cryptography==41.0.7**: Cryptographic recipes and primitives

### Caching (Optional)
- **django-redis==5.4.0**: Redis cache backend
- **redis==5.0.1**: Redis Python client

### Rate Limiting (Optional)
- **djangorestframework-ratelimit==1.0.1**: API rate limiting

### Background Tasks (Optional)
- **celery==5.3.4**: Distributed task queue

### Logging (Optional)
- **python-json-logger==2.0.7**: JSON logging formatter

### Validation (Optional)
- **django-phonenumber-field==7.3.0**: Phone number field
- **phonenumbers==8.13.0**: Phone number parsing

## Minimal Requirements.txt

If you want a minimal setup with only essential dependencies:

```txt
# Core Framework
Django==6.0.1
djangorestframework==3.14.0

# CORS Support
django-cors-headers==4.3.1

# JWT Authentication
djangorestframework-simplejwt==5.3.2

# Database
psycopg2-binary==2.9.9

# Filtering
django-filter==24.1

# Image Processing
Pillow==10.1.0

# Environment Variables
python-dotenv==1.0.0

# Production Server
gunicorn==21.2.0
```

## Production Requirements.txt

For production deployment:

```txt
# Core Framework
Django==6.0.1
djangorestframework==3.14.0

# CORS Support
django-cors-headers==4.3.1

# JWT Authentication
djangorestframework-simplejwt==5.3.2

# Database
psycopg2-binary==2.9.9

# Filtering
django-filter==24.1

# Image Processing
Pillow==10.1.0

# Environment Variables
python-dotenv==1.0.0

# Production Server
gunicorn==21.2.0

# Security
cryptography==41.0.7

# API Documentation
drf-spectacular==0.27.0

# Caching
django-redis==5.4.0
redis==5.0.1

# Rate Limiting
djangorestframework-ratelimit==1.0.1

# Logging
python-json-logger==2.0.7
```

## Managing Virtual Environment

### Freeze Current Installed Packages
```bash
pip freeze > requirements.txt
```

### Install from Specific Requirements
```bash
pip install -r requirements.txt
```

### Update Single Package
```bash
pip install --upgrade <package_name>
# Example:
pip install --upgrade Django
```

### Remove Package
```bash
pip uninstall <package_name>
```

### Check Installed Versions
```bash
pip list
```

### Check for Outdated Packages
```bash
pip list --outdated
```

## Troubleshooting

### psycopg2 Installation Issues
If you have issues installing `psycopg2-binary`:
```bash
# Alternative: install from source
pip install psycopg2

# Or ensure PostgreSQL development files are installed:
# On Ubuntu/Debian:
sudo apt-get install postgresql-client postgresql-contrib libpq-dev

# On macOS:
brew install postgresql
```

### Pillow Installation Issues
If you have issues with Pillow, ensure you have development libraries:
```bash
# On Ubuntu/Debian:
sudo apt-get install libjpeg-dev zlib1g-dev

# On macOS:
brew install jpeg libpng
```

### Virtual Environment Issues
```bash
# Delete and recreate virtual environment
rm -rf venv  # On Windows: rmdir /s venv
python -m venv venv

# Activate and reinstall
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

## Generating Requirements for Your Project

To create a minimal requirements.txt from your current environment:
```bash
pip freeze > requirements.txt
```

To update existing requirements.txt without recreating it:
```bash
pip freeze | grep -i "Django\|djangorestframework" >> requirements.txt
```

## Version Pinning Strategy

- **Major versions** (e.g., 6.0.1): Pinned to specific version for stability
- **Security updates**: Update immediately when available
- **Minor updates**: Test before updating in production

### Checking for Security Vulnerabilities
```bash
pip install safety
safety check
```

## Common Commands

```bash
# List all installed packages
pip list

# Show package details
pip show Django

# Install specific version
pip install Django==5.0.1

# Install with extras
pip install drf-spectacular[sidecar]

# Install from GitHub
pip install git+https://github.com/encode/django-rest-framework.git

# Create development requirements
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

## Environment-Specific Installation

### Development Environment
```bash
pip install -r requirements.txt
pip install pytest pytest-django black flake8 isort
```

### Production Environment
```bash
pip install -r requirements.txt
# Additional production packages
pip install gunicorn drf-spectacular django-redis
```

### Testing Environment
```bash
pip install -r requirements.txt
pip install pytest pytest-django pytest-cov
```

## Notes
- Always use a virtual environment
- Test package updates in development before production
- Keep Python version consistent across environments
- Use `pip freeze` after adding new packages to lock versions
- Regularly check for security updates
