# Complete Setup Guide - Social Media Platform

This guide will help you set up both the Django backend and Next.js frontend for the social media application.

## Prerequisites

- Python 3.8+ installed
- Node.js 18+ and npm installed
- PostgreSQL database running locally or remote connection

## Backend Setup (Django)

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update with your local settings:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials and configuration:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_NAME=coredb
DATABASE_USER=postgres
DATABASE_PASSWORD=root
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### 3. Database Setup

Create the PostgreSQL database:

```bash
createdb coredb
```

Run migrations:

```bash
python manage.py migrate
```

Create a superuser (optional, for admin access):

```bash
python manage.py createsuperuser
```

### 4. Start the Django Server

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`
API endpoints documentation: `http://localhost:8000/api/`

## Frontend Setup (Next.js)

### 1. Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

Or with pnpm:

```bash
pnpm install
```

### 2. Environment Configuration

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Update the `.env.local` file with your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Social Media Platform
```

### 3. Start the Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Or with pnpm:

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## CORS Configuration

The backend has CORS enabled for local development. If you need to add more origins, update `ALLOWED_ORIGINS` in `socialmedia/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add more as needed
]
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/logout/` - Logout user

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user details
- `GET /api/users/{id}/posts/` - Get user's posts

### Posts
- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get post details
- `PATCH /api/posts/{id}/` - Update post
- `DELETE /api/posts/{id}/` - Delete post
- `POST /api/posts/{id}/like/` - Like/unlike post

### Comments
- `GET /api/comments/` - List comments
- `POST /api/comments/` - Create comment
- `GET /api/comments/{id}/` - Get comment details
- `DELETE /api/comments/{id}/` - Delete comment

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Verify the backend is running on `http://localhost:8000`
2. Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL in Django settings
3. Check that the `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
4. Clear browser cache and restart both servers

### 401 Unauthorized Errors

If you get 401 errors after registration:

1. Make sure you're registered and can login
2. Check that tokens are being stored in localStorage
3. Verify that the JWT authentication is configured in Django settings
4. Check the Network tab in DevTools to see the Authorization header

### Database Connection Issues

If the backend can't connect to the database:

1. Verify PostgreSQL is running
2. Check database credentials in `.env` file
3. Ensure the database exists: `psql -l | grep coredb`
4. Run migrations if needed: `python manage.py migrate`

### Port Already in Use

If ports 3000 or 8000 are already in use:

**For Next.js frontend:**
```bash
npm run dev -- -p 3001
```

**For Django backend:**
```bash
python manage.py runserver 8001
```

Then update `NEXT_PUBLIC_API_URL` in `.env.local` accordingly.

## Development Workflow

1. Start PostgreSQL database
2. Start Django backend: `python manage.py runserver`
3. In a new terminal, start Next.js frontend: `npm run dev`
4. Open `http://localhost:3000` in your browser
5. Register a new account or login to test the application

## Production Deployment

For production deployment, see the individual README files:
- Backend: [Django deployment guide](https://docs.djangoproject.com/en/6.0/howto/deployment/)
- Frontend: [Next.js deployment guide](https://nextjs.org/docs/deployment)

## Additional Resources

- [Django REST Framework Documentation](https://www.django-rest-framework.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [JWT Authentication Guide](https://django-rest-framework-simplejwt.readthedocs.io/)
