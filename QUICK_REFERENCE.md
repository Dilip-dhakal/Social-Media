# Quick Reference Card

## One-Minute Setup

```bash
# 1. Start PostgreSQL
docker-compose up -d

# 2. Install and migrate (Backend)
pip install -r requirements.txt
python manage.py migrate

# 3. Start Backend
python manage.py runserver

# 4. In new terminal - Install and start Frontend
npm install
npm run dev

# 5. Open http://localhost:3000
```

## Common Commands

### Backend (Django)

```bash
# Start development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Django shell
python manage.py shell

# Collect static files (production)
python manage.py collectstatic
```

### Frontend (Next.js)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Format code
npm run format
```

### Docker

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `socialmedia/settings.py` | Django configuration (CORS, JWT, etc.) |
| `.env` | Backend environment variables |
| `.env.local` | Frontend environment variables |
| `lib/api-client.ts` | API communication setup |
| `store/authStore.ts` | Authentication state |
| `core/routers.py` | API routes configuration |

## API Base URL

- **Development:** `http://localhost:8000/api`
- **Production:** Update `NEXT_PUBLIC_API_URL` in `.env.local`

## Token Management

**Access Token:**
- Lifetime: 60 minutes
- Sent in `Authorization: Bearer {token}` header
- Auto-refreshed by frontend

**Refresh Token:**
- Lifetime: 7 days
- Used to get new access token
- Stored in localStorage

## Database

- **Type:** PostgreSQL
- **Name:** coredb
- **User:** postgres
- **Password:** root
- **Host:** localhost (or docker container)
- **Port:** 5432

## Key Endpoints

### Auth
- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh token

### Users
- `GET /api/users/` - List users
- `GET /api/users/{id}/` - Get user
- `PATCH /api/users/{id}/` - Update profile

### Posts
- `GET /api/posts/` - List posts
- `POST /api/posts/` - Create post
- `GET /api/posts/{id}/` - Get post
- `PATCH /api/posts/{id}/` - Update post
- `DELETE /api/posts/{id}/` - Delete post
- `POST /api/posts/{id}/like/` - Like post

### Comments
- `GET /api/comments/` - List comments
- `POST /api/comments/` - Create comment
- `DELETE /api/comments/{id}/` - Delete comment

## Common Issues & Fixes

### CORS Error
- Ensure Django is running
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Clear browser cache

### 401 Unauthorized
- Check if logged in
- Verify tokens in localStorage
- Check token expiration

### Database Connection Error
- Verify PostgreSQL running: `docker-compose ps`
- Check credentials in `.env`
- Run migrations: `python manage.py migrate`

### Port Already in Use
```bash
# Change port
python manage.py runserver 8001
npm run dev -- -p 3001

# Update API URL
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

## Project Structure Quick View

```
root/
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Utilities & services
├── store/           # State management
├── core/            # Django apps
├── socialmedia/     # Django config
├── requirements.txt # Python deps
├── package.json     # Node deps
└── docker-compose.yml # DB setup
```

## Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000/api |
| Admin Panel | http://localhost:8000/admin |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

## Environment Variables

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-key-here
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

## Login Flow

1. User enters username and password
2. Frontend sends POST to `/auth/login/`
3. Backend returns `access_token` and `refresh_token`
4. Frontend stores tokens in localStorage
5. Subsequent requests include `Authorization: Bearer {access_token}`
6. When token expires, frontend auto-refreshes using `refresh_token`

## Development Workflow

```
1. Create feature branch
2. Make changes to backend or frontend
3. Test locally
4. Commit changes
5. Push to repository
```

## Testing API with cURL

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'

# Get Posts
curl -X GET http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Create Post
curl -X POST http://localhost:8000/api/posts/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"content":"Hello world"}'
```

## Useful Make Commands

```bash
make help              # Show all commands
make install          # Install deps
make migrate          # Run migrations
make run-backend      # Start Django
make run-frontend     # Start Next.js
make docker-up        # Start Docker
make docker-down      # Stop Docker
make superuser        # Create admin
make clean            # Clean cache
```

## File Locations Cheat Sheet

| What | Where |
|------|-------|
| Login page | `app/auth/login/page.tsx` |
| Feed page | `app/page.tsx` |
| Post component | `components/post/PostCard.tsx` |
| API client | `lib/api-client.ts` |
| Auth store | `store/authStore.ts` |
| Django settings | `socialmedia/settings.py` |
| Django URLs | `socialmedia/urls.py` |
| User model | `core/user/models.py` |
| Post model | `core/post/models.py` |

## Performance Tips

- Use browser DevTools Network tab to monitor API calls
- Check Redux DevTools for state changes (Zustand)
- Use Next.js dev tools for performance
- Monitor Django logs for slow queries
- Use pagination for large datasets
- Cache static assets with CloudFront (production)

## Security Reminders

- ✓ Never commit `.env` files
- ✓ Keep `SECRET_KEY` private
- ✓ Always use HTTPS in production
- ✓ Update dependencies regularly
- ✓ Use strong passwords
- ✓ Validate all user inputs
- ✓ Review API permissions regularly

---

For more details:
- Full setup: See `SETUP_GUIDE.md`
- All APIs: See `API_DOCUMENTATION.md`
- Configuration: See `CONFIGURATION.md`
