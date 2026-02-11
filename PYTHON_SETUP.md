# Python Virtual Environment Setup

## Quick Setup (Recommended)

### On Linux/Mac:
```bash
# 1. Create virtual environment
python3 -m venv venv

# 2. Activate it
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python3 manage.py migrate

# 5. Create superuser (admin account)
python3 manage.py createsuperuser

# 6. Run development server
python3 manage.py runserver
```

### On Windows:
```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate it
venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. Create superuser (admin account)
python manage.py createsuperuser

# 6. Run development server
python manage.py runserver
```

## Detailed Steps

### 1. Create Virtual Environment
This creates an isolated Python environment for your project.

**Linux/Mac:**
```bash
python3 -m venv venv
```

**Windows:**
```bash
python -m venv venv
```

### 2. Activate Virtual Environment
You must activate the venv before installing packages or running Django.

**Linux/Mac:**
```bash
source venv/bin/activate
```

You should see `(venv)` at the start of your terminal line.

**Windows (Command Prompt):**
```bash
venv\Scripts\activate
```

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

If you get a PowerShell execution error, run this once:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. Install Dependencies
Once venv is activated, install all required packages:

```bash
pip install -r requirements.txt
```

This installs:
- Django
- Django REST Framework
- django-cors-headers
- And other dependencies

### 4. Run Migrations
Initialize the database:

```bash
python3 manage.py migrate
```

**On Windows, use:**
```bash
python manage.py migrate
```

### 5. Create Superuser Account
Create an admin account:

```bash
python3 manage.py createsuperuser
```

Follow the prompts:
- Username: (enter your admin username)
- Email: (enter your email)
- Password: (enter a secure password)
- Confirm Password: (re-enter password)

### 6. Run Development Server
Start the Django development server:

```bash
python3 manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

Visit: `http://localhost:8000/` to see the API root
Visit: `http://localhost:8000/admin/` to access admin panel (use superuser credentials)

## Troubleshooting

### "venv: command not found"
- Make sure you're using `python3 -m venv` not `venv`

### Still getting "No module named 'django'"
- Verify venv is activated (you should see `(venv)` in your terminal)
- Run `pip install -r requirements.txt` again

### "python3: command not found"
- On some systems, use just `python` instead of `python3`
- Or install Python 3.8+

### "ModuleNotFoundError" even after activation
- Deactivate and reactivate: `deactivate` then `source venv/bin/activate`

## Deactivate Virtual Environment
When you're done:

```bash
deactivate
```

## Always Remember
- **Always activate** the virtual environment before working on this project
- Run migrations **once** when setting up initially
- The venv folder can be safely deleted and recreated if needed

## Next Steps
Once the backend is running at `http://localhost:8000/`:

1. In another terminal, start the React frontend:
```bash
cd frontend
npm install
npm run dev
```

2. Visit `http://localhost:5173` to use the app

3. Login with the superuser credentials you created, or register a new account
