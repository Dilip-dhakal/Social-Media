# Social Media Application

A full-stack social media platform with user authentication, posts, comments, and likes functionality. Built with Django REST Framework backend and React frontend.

## Quick Links

- 📱 **Frontend Documentation**: See [frontend/README.md](frontend/README.md)
- 🔌 **API Reference**: See [API_ENDPOINTS.md](API_ENDPOINTS.md)
- 🚀 **Frontend Setup**: See [FRONTEND_SETUP.md](FRONTEND_SETUP.md)
- 📚 **Full Stack Setup**: See [FULL_STACK_SETUP.md](FULL_STACK_SETUP.md)
- ✨ **Build Summary**: See [FRONTEND_BUILD_SUMMARY.md](FRONTEND_BUILD_SUMMARY.md)

## Project Structure

```
social-media/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components (Login, Home, Profile, etc.)
│   │   ├── services/           # API integration layer
│   │   ├── context/            # React Context for state management
│   │   ├── App.jsx             # Main routing component
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   └── README.md               # Frontend documentation
│
├── core/                        # Django backend application
│   ├── auth/                   # Authentication (register, login)
│   ├── user/                   # User management
│   ├── post/                   # Post management
│   ├── comment/                # Comment management
│   └── abstract/               # Abstract models and utilities
│
├── socialmedia/                # Django project settings
│   ├── settings.py             # Django configuration
│   ├── urls.py                 # URL routing
│   ├── wsgi.py                 # WSGI configuration
│   └── asgi.py                 # ASGI configuration
│
├── manage.py                   # Django management script
├── API_ENDPOINTS.md            # Complete API endpoint reference
├── FRONTEND_SETUP.md           # Frontend setup guide
├── FULL_STACK_SETUP.md         # Full stack setup guide
└── README.md                   # This file
```

## Features

### User Management
- User registration with email, username, and profile info
- Secure login with JWT token authentication
- User profiles with bio and avatar
- Edit profile information

### Posts
- Create, read, update, and delete posts
- View all posts in home feed
- Like/unlike posts with count
- Delete own posts

### Comments
- Add comments to posts
- View all comments on a post
- Delete own comments
- Author information on comments

### Authentication
- JWT-based token authentication
- Automatic token refresh
- Protected routes on frontend
- Secure password handling

## Technology Stack

### Backend
- **Framework**: Django 4.0+
- **API**: Django REST Framework
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL (production) / SQLite (development)
- **CORS**: django-cors-headers

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router 6
- **Styling**: Pure CSS with CSS variables

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm package managers

### Quick Start

#### Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# Run migrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment (optional, defaults work locally)
cp .env.example .env

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Refresh JWT token

### Users
- `GET /api/user/` - List all users
- `GET /api/user/{id}/` - Get specific user
- `PATCH /api/user/{id}/` - Update user profile

### Posts
- `GET /api/post/` - List all posts
- `POST /api/post/` - Create new post
- `GET /api/post/{id}/` - Get specific post
- `PUT /api/post/{id}/` - Update post
- `DELETE /api/post/{id}/` - Delete post
- `POST /api/post/{id}/like/` - Like a post
- `POST /api/post/{id}/remove_like/` - Unlike a post

### Comments
- `GET /api/post/{post_id}/comment/` - List comments
- `POST /api/post/{post_id}/comment/` - Create comment
- `PUT /api/post/{post_id}/comment/{comment_id}/` - Update comment
- `DELETE /api/post/{post_id}/comment/{comment_id}/` - Delete comment

For detailed information, see [API_ENDPOINTS.md](API_ENDPOINTS.md)

## Development

### Running Both Servers

**Option 1: Terminal Windows**

Terminal 1:
```bash
source venv/bin/activate
python manage.py runserver
```

Terminal 2:
```bash
cd frontend
npm run dev
```

**Option 2: Using pm2**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### Making Changes

**Backend**: Changes auto-reload in development
**Frontend**: Vite provides HMR (Hot Module Reloading)

### Testing the Application

1. Register a new user at http://localhost:5173/register
2. Login with your credentials
3. Create a post using the sidebar
4. Like posts and add comments
5. Visit user profiles
6. Edit your profile information

## Production Deployment

### Backend
```bash
# Using Gunicorn
pip install gunicorn
gunicorn socialmedia.wsgi:application --bind 0.0.0.0:8000
```

### Frontend
```bash
# Build optimized version
npm run build

# Output in frontend/dist/ ready for deployment
```

Deploy to:
- Vercel, Netlify, or GitHub Pages (frontend)
- AWS, Heroku, Railway, or DigitalOcean (backend)

## Documentation

### For Frontend Developers
- [Frontend README](frontend/README.md) - Complete frontend documentation
- [FRONTEND_SETUP.md](FRONTEND_SETUP.md) - Development setup and workflow

### For Backend Developers
- Backend code in `/core` directory
- Django admin available at `http://localhost:8000/admin`

### For Full Stack Setup
- [FULL_STACK_SETUP.md](FULL_STACK_SETUP.md) - Complete setup guide for both stacks
- [FRONTEND_BUILD_SUMMARY.md](FRONTEND_BUILD_SUMMARY.md) - Summary of what was built

## API Integration

All frontend API calls go through a centralized service (`src/services/api.js`) that:
- Handles JWT authentication
- Manages token refresh
- Provides consistent error handling
- Manages request/response interceptors

## Security Features

- JWT-based authentication with token refresh
- Password hashing with Django's password hashers
- CORS protection
- Protected routes on frontend
- Secure token storage in localStorage
- Input validation on both frontend and backend
- SQL injection prevention via ORM

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The application is optimized for:
- Fast page loads with Vite
- Efficient React rendering
- Minimal bundle size
- CSS optimization
- API request batching where possible

## Contributing

When contributing to the project:
1. Follow existing code style
2. Test your changes thoroughly
3. Update documentation as needed
4. Ensure both backend and frontend work together

## Troubleshooting

### API Connection Issues
- Ensure backend is running on http://localhost:8000
- Check CORS configuration in Django settings
- Verify `VITE_API_BASE_URL` in frontend `.env`

### Authentication Issues
- Clear localStorage in browser
- Log out and log in again
- Check JWT secret in Django settings

### Database Issues
- Run migrations: `python manage.py migrate`
- Check database connection settings

### Port Conflicts
- Backend: `python manage.py runserver 8001`
- Frontend: Vite automatically uses next available port

See individual documentation files for more troubleshooting steps.

## Future Enhancements

- Real-time notifications with WebSockets
- User follow/unfollow system
- Direct messaging
- Search functionality
- Image uploads for posts and avatars
- Hashtag and mention support
- User activity feeds
- Dark mode theme
- API rate limiting and caching

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions:
1. Check the relevant documentation file
2. Review the API_ENDPOINTS.md for endpoint details
3. Check browser console for frontend errors
4. Check Django logs for backend errors
5. Review FULL_STACK_SETUP.md troubleshooting section

## Quick Command Reference

### Backend Commands
```bash
python manage.py migrate           # Run database migrations
python manage.py createsuperuser   # Create admin user
python manage.py runserver         # Start dev server
python manage.py shell             # Open Django shell
python manage.py test              # Run tests
python manage.py makemigrations    # Create migrations
```

### Frontend Commands
```bash
npm install                        # Install dependencies
npm run dev                        # Start dev server
npm run build                      # Build for production
npm run preview                    # Preview production build
```

## Project Status

✅ **Complete**: Core functionality implemented
✅ **Production Ready**: Code is clean and optimized
✅ **Well Documented**: Comprehensive documentation provided
✅ **Tested**: All features tested and working
✅ **Extensible**: Easy to add new features

## Getting Help

- Frontend issues: See `frontend/README.md` or `FRONTEND_SETUP.md`
- Backend issues: Check Django documentation
- API issues: See `API_ENDPOINTS.md`
- Setup issues: See `FULL_STACK_SETUP.md`
- Build summary: See `FRONTEND_BUILD_SUMMARY.md`

---

**Ready to get started?** Follow the Quick Start section above or see [FULL_STACK_SETUP.md](FULL_STACK_SETUP.md) for detailed instructions.
