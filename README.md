# Social Media Platform

A modern, full-stack social media platform built with Django REST Framework (backend) and Next.js (frontend).

## Features

- **User Authentication**: Register, login, and secure JWT-based authentication
- **Posts**: Create, read, update, delete posts with image support
- **Likes**: Like and unlike posts with real-time counts
- **Comments**: Add comments to posts with threaded conversations
- **User Profiles**: View and edit user profiles with bio and avatar
- **Feed**: Real-time feed showing posts from all users
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, minimal design with Shadcn components

## Project Structure

```
social-media/
├── frontend/                 # Next.js application
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utilities and services
│   ├── store/               # Zustand state management
│   └── package.json
├── backend/                 # Django REST Framework application
│   ├── core/               # Django apps (auth, user, post, comment)
│   ├── socialmedia/        # Django project settings
│   ├── manage.py
│   └── requirements.txt
├── SETUP_GUIDE.md          # Detailed setup instructions
├── API_DOCUMENTATION.md    # Complete API reference
├── FRONTEND_README.md      # Frontend-specific documentation
└── docker-compose.yml      # Docker configuration
```

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+

### Using Docker (Recommended for Database)

1. Start PostgreSQL and Redis with Docker:
```bash
docker-compose up -d
```

2. Install backend dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Start Django backend:
```bash
python manage.py runserver
```

5. In a new terminal, install frontend dependencies:
```bash
npm install
```

6. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

7. Start Next.js frontend:
```bash
npm run dev
```

8. Open http://localhost:3000 in your browser

### Without Docker

1. Set up PostgreSQL database locally
2. Copy `.env.example` to `.env` and update database credentials
3. Install dependencies and run migrations as above
4. Start both servers

## Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions with troubleshooting
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Full API endpoint reference
- **[FRONTEND_README.md](./FRONTEND_README.md)** - Frontend architecture and components

## Backend Stack

- **Framework**: Django 6.0
- **API**: Django REST Framework 3.14
- **Authentication**: djangorestframework-simplejwt
- **Database**: PostgreSQL
- **Utilities**: 
  - django-cors-headers (CORS support)
  - django-filter (Filtering)
  - Pillow (Image processing)
  - python-dotenv (Environment variables)

## Frontend Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Data Fetching**: SWR

## API Base URL

- Development: `http://localhost:8000/api`
- Production: Updated based on deployment

## Helpful Commands

### Using Make

```bash
make help              # Show all available commands
make install          # Install dependencies
make migrate          # Run migrations
make run-backend      # Start Django backend
make run-frontend     # Start Next.js frontend
make docker-up        # Start Docker services
make docker-down      # Stop Docker services
make superuser        # Create admin user
```

### Manual Commands

**Backend:**
```bash
python manage.py runserver
python manage.py migrate
python manage.py createsuperuser
```

**Frontend:**
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run test          # Run tests
```

## Environment Variables

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_NAME=coredb
DATABASE_USER=postgres
DATABASE_PASSWORD=root
DATABASE_HOST=localhost
DATABASE_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Social Media Platform
```

## Development Workflow

1. Create a new branch for your feature
2. Make changes to backend or frontend
3. Test locally
4. Commit and push to your branch
5. Create a pull request

## API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/` | Register new user |
| POST | `/auth/login/` | Login user |
| POST | `/auth/refresh/` | Refresh JWT token |
| GET | `/users/` | List all users |
| GET | `/users/{id}/` | Get user details |
| GET | `/posts/` | List all posts |
| POST | `/posts/` | Create post |
| GET | `/posts/{id}/` | Get post details |
| POST | `/posts/{id}/like/` | Like post |
| GET | `/comments/` | List comments |
| POST | `/comments/` | Create comment |

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Troubleshooting

### CORS Errors
- Ensure Django backend is running
- Check `CORS_ALLOWED_ORIGINS` in `socialmedia/settings.py`
- Clear browser cache and restart servers

### Database Connection Issues
- Verify PostgreSQL is running
- Check `.env` file database credentials
- Run `python manage.py migrate` if needed

### Port Already in Use
- Change port: `python manage.py runserver 8001`
- Update `NEXT_PUBLIC_API_URL` in `.env.local` accordingly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) troubleshooting section
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
3. Check existing issues on GitHub
4. Create a new issue with detailed information

## Deployment

For production deployment:
- Backend: See [Django deployment guide](https://docs.djangoproject.com/en/6.0/howto/deployment/)
- Frontend: See [Next.js deployment guide](https://nextjs.org/docs/deployment)

---

Made with ❤️ by the development team
