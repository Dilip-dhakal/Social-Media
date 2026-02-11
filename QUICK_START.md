# Quick Start Guide

Get the Social Media application running in 5 minutes.

## Prerequisites Check

```bash
# Check Python version (need 3.8+)
python --version

# Check Node version (need 16+)
node --version

# Check pip and npm
pip --version
npm --version
```

## Backend Setup (3 minutes)

```bash
# 1. Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # macOS/Linux
# OR
venv\Scripts\activate              # Windows

# 2. Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# 3. Setup database
python manage.py migrate

# 4. Create admin user (follow prompts)
python manage.py createsuperuser

# 5. Start backend server
python manage.py runserver
```

✅ Backend running at `http://localhost:8000`
✅ Admin panel at `http://localhost:8000/admin`
✅ API at `http://localhost:8000/api`

## Frontend Setup (2 minutes)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

## Test the Application

### In Two Browser Tabs

**Tab 1: Register**
```
http://localhost:5173/register
- Email: test@example.com
- Username: testuser
- First Name: Test
- Last Name: User
- Password: testpass123 (min 8 chars)
- Click Register
```

**Tab 2: Login**
```
http://localhost:5173/login
- Email: test@example.com
- Password: testpass123
- Click Login
```

### Create Your First Post

```
1. You should be on Home page
2. Look at sidebar on left
3. Click "New Post" button
4. Type your message
5. Click "Post" button
6. See your post in the feed!
```

### Like and Comment

```
1. Find a post (yours or others)
2. Click heart (❤️) to like
3. Click comment (💬) to see comments
4. Type a reply and click "Reply"
```

### View Profile

```
1. Click on author's name in any post
2. See their profile with all posts
3. If it's YOUR profile, click "Edit Profile"
4. Update your name, bio, and avatar
```

## Key Files to Know

### Frontend

| File | Purpose |
|------|---------|
| `frontend/src/App.jsx` | Main routing & component setup |
| `frontend/src/pages/Home.jsx` | Home feed page |
| `frontend/src/pages/Login.jsx` | Login page |
| `frontend/src/components/PostCard.jsx` | Post display |
| `frontend/src/services/api.js` | API communication |
| `frontend/src/context/AuthContext.jsx` | Authentication state |

### Backend

| File | Purpose |
|------|---------|
| `core/user/models.py` | User model definition |
| `core/post/models.py` | Post model definition |
| `core/comment/models.py` | Comment model definition |
| `core/auth/views.py` | Auth endpoints |
| `core/routers.py` | API routing |
| `socialmedia/settings.py` | Django configuration |

## Environment Files

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### Backend (uses defaults, no .env needed for development)

## Useful URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:5173` | Frontend |
| `http://localhost:8000` | Backend |
| `http://localhost:8000/admin` | Django admin |
| `http://localhost:8000/api` | API base |
| `http://localhost:8000/api/post/` | Posts API |

## Common Commands

### Frontend
```bash
cd frontend
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm install       # Install dependencies
```

### Backend
```bash
python manage.py runserver           # Start server
python manage.py migrate             # Apply migrations
python manage.py createsuperuser     # Create admin
python manage.py makemigrations      # Create migrations
python manage.py shell               # Python shell
```

## Debugging

### Frontend Issues

```javascript
// Add to see what's happening
console.log("[v0] Variable name:", variableName)

// Check network requests
// Press F12 → Network tab → Filter "XHR"

// Check authentication
localStorage.getItem('access_token')
localStorage.getItem('user')
```

### Backend Issues

```bash
# Check migrations
python manage.py showmigrations

# Check database
python manage.py dbshell

# View logs (appears in terminal)
```

## Common Issues

### ❌ "Port already in use"
```bash
# Use different port
python manage.py runserver 8001
```

### ❌ "Module not found"
```bash
# Activate virtual environment
source venv/bin/activate
```

### ❌ "CORS error in console"
```
Check CORS_ALLOWED_ORIGINS in socialmedia/settings.py
Should include: http://localhost:5173
```

### ❌ "401 Unauthorized"
```
1. Clear localStorage: F12 → Application → localStorage → delete all
2. Log out and log in again
```

### ❌ "No such table" error
```bash
python manage.py migrate
```

## API Testing (Using cURL)

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"user","password":"pass123"}'

# Login (get token)
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Get posts (replace TOKEN with actual token)
curl -X GET http://localhost:8000/api/post/ \
  -H "Authorization: Bearer TOKEN"

# Create post
curl -X POST http://localhost:8000/api/post/ \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"body":"Hello World"}'
```

## Next Steps

✅ **Now you have the app running!**

### To Learn More
1. Read [FULL_STACK_SETUP.md](FULL_STACK_SETUP.md) for detailed setup
2. Read [frontend/README.md](frontend/README.md) for frontend details
3. Read [API_ENDPOINTS.md](API_ENDPOINTS.md) for API reference
4. Explore the code in `frontend/src/` and `core/`

### To Deploy
1. Follow deployment section in [FULL_STACK_SETUP.md](FULL_STACK_SETUP.md)
2. Backend: Deploy to Heroku, AWS, Railway, or DigitalOcean
3. Frontend: Deploy to Vercel, Netlify, or GitHub Pages

### To Add Features
1. Create backend API endpoint
2. Create frontend component to use it
3. Test in both browsers
4. Update documentation

## Terminal Commands Reference

```bash
# Quick restart both servers
# Terminal 1:
python manage.py runserver

# Terminal 2:
cd frontend && npm run dev

# Stop servers
# Press Ctrl+C in each terminal

# View logs
# Check terminal where server is running

# Reset database (careful!)
# python manage.py migrate zero  (then migrate again)
```

## Getting Help

| Issue | File to Check |
|-------|--------------|
| Frontend won't start | `FRONTEND_SETUP.md` |
| Backend won't start | `FULL_STACK_SETUP.md` → Backend Setup |
| API not working | `API_ENDPOINTS.md` |
| Build issues | `FRONTEND_BUILD_SUMMARY.md` |
| Complex setup | `FULL_STACK_SETUP.md` |

## What's Working

✅ User registration and login  
✅ Create and view posts  
✅ Like/unlike posts  
✅ Add/view comments  
✅ View user profiles  
✅ Edit your profile  
✅ Delete own posts and comments  
✅ Responsive design  
✅ Error handling  
✅ Token-based authentication  

## What's NOT Working (No API)

❌ Search posts  
❌ Follow users  
❌ Direct messages  
❌ Notifications  
❌ Image uploads (URL only)  
❌ Hashtags  
❌ Real-time updates  

*These can be added when backend APIs are created*

---

**Everything working?** Congratulations! 🎉

Now explore the code, make changes, or deploy to production!

For detailed information, see the other documentation files.
