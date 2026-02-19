# Verification Checklist

Use this checklist to verify that all configurations are in place and working correctly.

## CORS Configuration ✓

### Backend Setup
- [ ] `corsheaders` is in `INSTALLED_APPS` in `socialmedia/settings.py`
- [ ] `corsheaders.middleware.CorsMiddleware` is in `MIDDLEWARE` (before `SessionMiddleware`)
- [ ] `CORS_ALLOWED_ORIGINS` includes `http://localhost:3000`
- [ ] `CORS_ALLOW_CREDENTIALS = True` is set
- [ ] `CORS_ALLOW_METHODS` includes GET, POST, PUT, PATCH, DELETE

### Testing CORS
Run this test in browser console on frontend:
```javascript
fetch('http://localhost:8000/api/posts/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(r => r.json())
.then(d => console.log('✓ CORS working!', d))
.catch(e => console.log('✗ CORS error:', e))
```

Expected: Response with posts data (not CORS error)

## JWT Authentication ✓

### Backend Setup
- [ ] `rest_framework_simplejwt` is installed (`pip list | grep simplejwt`)
- [ ] `rest_framework_simplejwt.authentication.JWTAuthentication` is configured
- [ ] `SIMPLE_JWT` settings are in `socialmedia/settings.py`
- [ ] `ACCESS_TOKEN_LIFETIME = timedelta(minutes=60)`
- [ ] `REFRESH_TOKEN_LIFETIME = timedelta(days=7)`

### Frontend Setup
- [ ] `axios` is installed (`npm list axios`)
- [ ] `lib/api-client.ts` includes request interceptor for JWT
- [ ] `lib/api-client.ts` includes response interceptor for token refresh
- [ ] Tokens are stored in localStorage

### Testing JWT
```bash
# 1. Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# 2. Copy the access token from response
# 3. Use it in requests
curl -X GET http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Expected: 200 OK with posts data

## REST Framework Configuration ✓

### API Settings
- [ ] `DEFAULT_AUTHENTICATION_CLASSES` includes JWTAuthentication
- [ ] `DEFAULT_PERMISSION_CLASSES` is configured
- [ ] `DEFAULT_PAGINATION_CLASS` is set
- [ ] `PAGE_SIZE` is 15

### Testing Pagination
```bash
curl http://localhost:8000/api/posts/?limit=10&offset=0
```

Expected: Response with `count`, `next`, `previous`, `results`

## Database Configuration ✓

### PostgreSQL Setup
- [ ] PostgreSQL running (check with `psql -l`)
- [ ] Database `coredb` exists
- [ ] User `postgres` can connect
- [ ] `DATABASE_*` variables in `.env` match actual setup

### Testing Database
```bash
# Check migrations
python manage.py showmigrations

# Run shell
python manage.py shell
>>> from core_user.models import User
>>> User.objects.count()
# Should show number of users or 0
```

Expected: Shell commands execute without errors

## Environment Variables ✓

### Backend (.env)
- [ ] `.env` file exists in project root
- [ ] Contains `DEBUG`, `SECRET_KEY`, `DATABASE_*`
- [ ] Contains `CORS_ALLOWED_ORIGINS`
- [ ] All required variables are set

Check with:
```bash
cat .env | grep -E "DEBUG|SECRET_KEY|DATABASE|CORS"
```

### Frontend (.env.local)
- [ ] `.env.local` file exists in project root
- [ ] Contains `NEXT_PUBLIC_API_URL`
- [ ] `NEXT_PUBLIC_API_URL` is set to backend URL

Check with:
```bash
cat .env.local | grep NEXT_PUBLIC_API_URL
```

## Dependencies ✓

### Backend
Check `requirements.txt` contains:
- [ ] Django==6.0.1
- [ ] djangorestframework==3.14.0
- [ ] django-cors-headers==4.3.1
- [ ] djangorestframework-simplejwt==5.3.2
- [ ] psycopg2-binary (or psycopg2)

Verify with:
```bash
pip list | grep -E "Django|djangorest|cors|simplejwt|psycopg"
```

### Frontend
Check `package.json` contains:
- [ ] next
- [ ] react
- [ ] tailwindcss
- [ ] axios
- [ ] zustand

Verify with:
```bash
npm list next react tailwindcss axios zustand
```

## Files & Structure ✓

### Backend Files
- [ ] `socialmedia/settings.py` - CORS and JWT configured
- [ ] `socialmedia/urls.py` - API routes set up
- [ ] `core/routers.py` - DRF routers defined
- [ ] `requirements.txt` - All dependencies listed
- [ ] `.env` - Environment variables set

### Frontend Files
- [ ] `lib/api-client.ts` - Axios client with interceptors
- [ ] `store/authStore.ts` - Zustand auth store
- [ ] `app/layout.tsx` - Root layout
- [ ] `app/page.tsx` - Home/feed page
- [ ] `.env.local` - Frontend env variables

### Documentation Files
- [ ] `README.md` - Project overview
- [ ] `SETUP_GUIDE.md` - Setup instructions
- [ ] `API_DOCUMENTATION.md` - API reference
- [ ] `CONFIGURATION.md` - Config details
- [ ] `QUICK_REFERENCE.md` - Cheat sheet

## Servers Running ✓

### Backend Server
```bash
python manage.py runserver
```

Check in browser: `http://localhost:8000/api/`

Expected: JSON response showing available endpoints

### Frontend Server
```bash
npm run dev
```

Check in browser: `http://localhost:3000`

Expected: Social media feed page loads

### Docker Services (if using Docker)
```bash
docker-compose ps
```

Expected:
```
NAME               STATUS
socialmedia_postgres   Up (healthy)
socialmedia_redis      Up (healthy)
```

## API Endpoints ✓

### Authentication
- [ ] `POST /api/auth/register/` - Returns status 201/400
- [ ] `POST /api/auth/login/` - Returns tokens
- [ ] `POST /api/auth/refresh/` - Returns new access token

Test:
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test1","email":"test1@test.com","password":"test123456"}'
```

### Users
- [ ] `GET /api/users/` - Returns user list
- [ ] `GET /api/users/1/` - Returns user detail
- [ ] `PATCH /api/users/1/` - Updates user (auth required)

Test:
```bash
curl http://localhost:8000/api/users/
```

### Posts
- [ ] `GET /api/posts/` - Returns posts list
- [ ] `POST /api/posts/` - Creates post (auth required)
- [ ] `GET /api/posts/1/` - Returns post detail
- [ ] `POST /api/posts/1/like/` - Likes post (auth required)

### Comments
- [ ] `GET /api/comments/` - Returns comments
- [ ] `POST /api/comments/` - Creates comment (auth required)

## Frontend Features ✓

### Authentication Pages
- [ ] `/auth/login` page loads and functions
- [ ] `/auth/register` page loads and functions
- [ ] Login stores tokens in localStorage
- [ ] Tokens sent in subsequent requests

### Feed Page
- [ ] `/` page displays posts
- [ ] Create post form visible
- [ ] Posts show author info
- [ ] Like button works
- [ ] Comments visible

### User Profile
- [ ] `/profile/1` page loads
- [ ] Shows user info
- [ ] Shows user's posts
- [ ] Profile editable by owner

### Post Detail
- [ ] `/post/1` page loads
- [ ] Shows full post
- [ ] Comments section visible
- [ ] Can add comments

## Security Checks ✓

- [ ] Tokens not logged to console
- [ ] Passwords hashed in database
- [ ] CSRF protection enabled
- [ ] Secret key is unique and secret
- [ ] Debug mode is False in production
- [ ] No sensitive data in error messages
- [ ] API permissions properly configured

Test token security:
```javascript
// Browser console - should see tokens without logging them
localStorage.getItem('access_token')
localStorage.getItem('refresh_token')
```

## Performance Checks ✓

### Backend Performance
- [ ] Pagination working (default 15 per page)
- [ ] Filtering/search working
- [ ] Response times < 200ms for simple queries

Test:
```bash
time curl http://localhost:8000/api/posts/
```

### Frontend Performance
- [ ] Pages load in < 2 seconds
- [ ] No console errors
- [ ] Network requests are minimal

Check in DevTools Network tab:
- [ ] All requests succeed (200, 201, 204)
- [ ] No 404 or 500 errors
- [ ] No CORS errors

## Browser Compatibility ✓

Test in:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if Mac)
- [ ] Edge

All should work without console errors

## Final System Test ✓

Run this complete flow:

1. **Register**
   ```bash
   curl -X POST http://localhost:8000/api/auth/register/ \
     -H "Content-Type: application/json" \
     -d '{"username":"finaltest","email":"final@test.com","password":"finaltest123","first_name":"Final","last_name":"Test"}'
   ```
   Expected: 201 with user data

2. **Login**
   ```bash
   curl -X POST http://localhost:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username":"finaltest","password":"finaltest123"}'
   ```
   Expected: 200 with access_token and refresh_token

3. **Create Post**
   ```bash
   TOKEN="your_access_token_here"
   curl -X POST http://localhost:8000/api/posts/ \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{"content":"Test post from API"}'
   ```
   Expected: 201 with post data

4. **Get Posts**
   ```bash
   curl http://localhost:8000/api/posts/
   ```
   Expected: 200 with posts list including your test post

5. **Like Post**
   ```bash
   TOKEN="your_access_token_here"
   curl -X POST http://localhost:8000/api/posts/1/like/ \
     -H "Authorization: Bearer $TOKEN"
   ```
   Expected: 200 with like status

6. **Test in Browser**
   - Open http://localhost:3000
   - Register with new account
   - Create a post
   - Like a post
   - View profile
   - Add comment

All actions should work without errors.

## Troubleshooting During Verification

### If CORS test fails:
```bash
# Restart Django
python manage.py runserver

# Check middleware order
grep -A 5 "MIDDLEWARE = " socialmedia/settings.py
```

### If JWT test fails:
```bash
# Check SECRET_KEY is set
grep SECRET_KEY socialmedia/settings.py

# Check token format
# Access token should be valid JWT
```

### If database test fails:
```bash
# Check connection
psql -U postgres -d coredb -c "SELECT 1"

# Run migrations
python manage.py migrate
```

### If API endpoint fails:
```bash
# Check URL routing
python manage.py show_urls | grep -E "posts|auth|users"

# Check view is registered
grep -r "ViewSet" core/*/viewsets.py
```

## Sign-off ✓

Once all checks pass:

- [ ] All CORS tests pass
- [ ] All JWT tests pass
- [ ] All endpoints respond correctly
- [ ] Frontend loads without errors
- [ ] Registration/login flow works
- [ ] Post creation works
- [ ] Comments work
- [ ] All pages load
- [ ] No console errors
- [ ] No network errors

**Date Verified:** _______________

**By:** _______________

**Status:** ✓ READY FOR DEVELOPMENT

---

If any check fails, refer to:
- `SETUP_GUIDE.md` for setup issues
- `CONFIGURATION.md` for config issues
- `API_DOCUMENTATION.md` for API issues
- `QUICK_REFERENCE.md` for quick fixes
