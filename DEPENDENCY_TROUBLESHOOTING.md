# Dependency Troubleshooting Guide

## Common Dependency Issues and Solutions

### 1. psycopg2-binary Installation Fails

**Error:**
```
error: could not create 'build/temp.linux-x86_64-3.9/psycopg2' directory
```

**Solutions:**

Option A: Use pre-built binary (Recommended)
```bash
pip install psycopg2-binary
```

Option B: Install from source with dependencies
```bash
# macOS
brew install postgresql libpq
pip install psycopg2

# Ubuntu/Debian
sudo apt-get install postgresql-client postgresql-contrib libpq-dev
pip install psycopg2

# Windows (use pre-built)
pip install psycopg2-binary
```

Option C: Use docker-compose for database
```bash
# No need to install psycopg2 if using Docker
docker-compose up postgres
```

### 2. Pillow Installation Fails

**Error:**
```
error: could not create 'build/temp.linux-x86_64-3.9' directory
```

**Solutions:**

Option A: Install development libraries first

macOS:
```bash
brew install jpeg libpng libtiff littlecms webp freetype
pip install Pillow
```

Ubuntu/Debian:
```bash
sudo apt-get install python3-dev libjpeg-dev zlib1g-dev liblcms2-dev libwebp-dev libharfbuzz0b libwebpdemux0
pip install Pillow
```

Windows:
```bash
# Use pre-built wheels
pip install Pillow
```

Option B: Use conda instead of pip
```bash
conda install pillow
```

### 3. Django Version Conflicts

**Error:**
```
ERROR: pip's dependency resolver does not currently take into account all the packages
```

**Solution:**
```bash
# Update pip, setuptools, and wheel
pip install --upgrade pip setuptools wheel

# Clear pip cache
pip cache purge

# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

### 4. Virtual Environment Issues

**Error:**
```
python: can't open file 'manage.py'
```

**Solution:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Verify activation (should see (venv) in prompt)
which python  # macOS/Linux
where python  # Windows
```

### 5. Module Not Found Error

**Error:**
```
ModuleNotFoundError: No module named 'django'
```

**Solution:**
```bash
# Activate virtual environment
source venv/bin/activate

# Reinstall all dependencies
pip install -r requirements.txt

# Verify installation
pip list | grep Django
```

### 6. Redis Connection Issues

**Error:**
```
redis.exceptions.ConnectionError: Error 111 connecting to localhost:6379
```

**Solution:**

Option A: Start Redis with Docker
```bash
docker-compose up redis

# Or if Docker not available:
docker run -d -p 6379:6379 redis:latest
```

Option B: Install and run Redis locally

macOS:
```bash
brew install redis
redis-server
```

Ubuntu/Debian:
```bash
sudo apt-get install redis-server
redis-server
```

Windows:
```bash
# Download from: https://github.com/microsoftarchive/redis/releases
# Or use WSL with Linux instructions
```

Option C: Disable Redis temporarily
```python
# In settings.py, comment out Redis caching
# CACHES = {...}  # Comment this out
```

### 7. Cryptography Library Issues

**Error:**
```
Couldn't find libcrypto
```

**Solution:**

macOS:
```bash
brew install openssl
pip install --upgrade cryptography
```

Ubuntu/Debian:
```bash
sudo apt-get install libssl-dev libffi-dev
pip install --upgrade cryptography
```

Windows:
```bash
# Use pre-built wheel
pip install cryptography
```

### 8. Django Migrations Errors

**Error:**
```
django.db.utils.ProgrammingError: relation "auth_user" does not exist
```

**Solution:**
```bash
# Run all pending migrations
python manage.py migrate

# If migrations stuck:
python manage.py migrate zero auth  # Reset auth migrations
python manage.py migrate  # Reapply all migrations
```

### 9. ImportError for Installed Packages

**Error:**
```
ImportError: cannot import name 'function_name' from 'module_name'
```

**Solution:**
```bash
# Ensure correct version is installed
pip show module_name

# Reinstall specific package
pip install --force-reinstall module_name

# Check for compatibility with Python version
python --version
```

### 10. Out of Memory During Installation

**Error:**
```
MemoryError or pip killed process
```

**Solution:**
```bash
# Install one package at a time
pip install Django==6.0.1
pip install djangorestframework==3.14.0
# ... continue for each package

# Or use --no-cache-dir to reduce memory usage
pip install -r requirements.txt --no-cache-dir

# Or increase system memory for VM/Docker
```

## Dependency Version Checking

### Check Installed Versions
```bash
# List all installed packages
pip list

# Check specific package
pip show Django

# Check if package is compatible
pip check
```

### Update Dependencies Safely
```bash
# Update pip, setuptools, wheel
pip install --upgrade pip setuptools wheel

# Update specific package
pip install --upgrade Django

# Update all packages (not recommended)
pip list --outdated
pip install --upgrade -r requirements.txt
```

### Create Fresh Requirements
```bash
# Freeze current environment
pip freeze > requirements.txt

# Install from frozen requirements
pip install -r requirements.txt

# Update requirements with upgrades
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt
```

## Testing Dependencies

### Verify All Imports Work
```bash
python -c "import django; print('Django OK')"
python -c "import rest_framework; print('DRF OK')"
python -c "import corsheaders; print('CORS OK')"
python -c "import rest_framework_simplejwt; print('JWT OK')"
python -c "from PIL import Image; print('Pillow OK')"
```

### Run Full Dependency Check
```bash
# Create a test script (test_imports.py)
cat > test_imports.py << 'EOF'
import sys
packages = [
    'django',
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'django_filters',
    'PIL',
    'dotenv',
    'psycopg2'
]

failed = []
for package in packages:
    try:
        __import__(package)
        print(f"✓ {package}")
    except ImportError as e:
        print(f"✗ {package}: {e}")
        failed.append(package)

if failed:
    print(f"\nFailed packages: {failed}")
    sys.exit(1)
else:
    print("\nAll packages OK!")
EOF

python test_imports.py
```

## Clean Installation

When experiencing multiple issues, do a clean installation:

```bash
# 1. Deactivate current environment
deactivate

# 2. Remove old virtual environment
rm -rf venv  # macOS/Linux
rmdir /s venv  # Windows

# 3. Clear pip cache
pip cache purge

# 4. Create new virtual environment
python -m venv venv

# 5. Activate new environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows

# 6. Upgrade pip
pip install --upgrade pip

# 7. Install requirements
pip install -r requirements.txt
```

## Platform-Specific Issues

### macOS
```bash
# If you have issues with architecture (Intel vs Apple Silicon)
# Use conda instead:
conda create -n socialmedia python=3.9
conda activate socialmedia
conda install -c conda-forge -r requirements.txt
```

### Windows
```bash
# Use WSL2 (Windows Subsystem for Linux) for better compatibility
# Then follow Linux instructions
```

### Linux (WSL)
```bash
# Ensure WSL2 is using correct resources
wsl --list -v
wsl --set-version Ubuntu 2

# Then proceed with Ubuntu instructions
```

## Checking Python Compatibility

```bash
# Check Python version
python --version

# Ensure Python 3.9 or higher
python -c "import sys; assert sys.version_info >= (3, 9), 'Python 3.9+ required'"

# Check if you have multiple Python versions
python --version
python3 --version
python3.9 --version
```

## Dependency Security

### Check for Vulnerabilities
```bash
# Install safety tool
pip install safety

# Check dependencies
safety check

# Fix vulnerabilities
pip install --upgrade <package_name>
```

### Update to Latest Secure Versions
```bash
# Check for outdated packages
pip list --outdated

# Update all packages
pip install --upgrade -r requirements.txt

# Create updated requirements
pip freeze > requirements.txt
```

## Performance Optimization

### Faster Installation
```bash
# Use --no-cache-dir to reduce disk usage
pip install --no-cache-dir -r requirements.txt

# Use --prefer-binary to avoid compilation
pip install --prefer-binary -r requirements.txt

# Parallel installation with faster-pip
pip install --upgrade pip
pip install -r requirements.txt
```

## Getting Help

If you're still having issues:

1. Run `pip check` to see if there are conflicts
2. Check the package's GitHub issues
3. Look at the error message carefully
4. Try a clean installation
5. Check Python and pip versions
6. Consider using conda instead of pip
7. Post on Stack Overflow with error details

## Useful Commands Reference

```bash
# Virtual environment
python -m venv venv
source venv/bin/activate
deactivate

# Dependency management
pip install -r requirements.txt
pip list
pip show <package>
pip freeze > requirements.txt
pip check

# Troubleshooting
pip cache purge
pip install --force-reinstall -r requirements.txt
pip install --no-cache-dir -r requirements.txt

# Testing
python -c "import <module>"
python -m pytest

# Version checking
python --version
pip --version
