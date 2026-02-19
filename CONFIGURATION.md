# Configuration Guide

This guide explains all the configurations for CORS, JWT, database, and other important settings.

## CORS Configuration

Cross-Origin Resource Sharing (CORS) allows the frontend to make requests to the backend from a different origin.

### Django CORS Settings

Location: `socialmedia/settings.py`

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",      # Local Next.js frontend
    "http://127.0.0.1:3000",
    "http://localhost:8000",      # Local Django backend
    "http://127.0.0.1:8000",
]

CORS_ALLOW_CREDENTIALS = True    # Allow cookies in requests

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
```

### Adding New Origins

To add more origins (e.g., production URLs), update `CORS_ALLOWED_ORIGINS`:

**Development:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

**Production:**
```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

### Middleware Order

The CORS middleware must be placed high in the middleware stack (near the top):

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Must be high
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... other middleware
]
```

## JWT Authentication Configuration

Location: `socialmedia/settings.py`

```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),      # 1 hour
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),         # 7 days
    'ROTATE_REFRESH_TOKENS': True,                        # Auto-rotate tokens
    'BLACKLIST_AFTER_ROTATION': True,                     # Blacklist old tokens
    'ALGORITHM': 'HS256',                                 # Encryption algorithm
    'SIGNING_KEY': SECRET_KEY,                            # Use Django secret key
}
```

### Token Expiration Times

Adjust token lifetimes based on your security requirements:

```python
# Short-lived (High Security)
'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),

# Medium-lived (Balanced)
'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),

# Long-lived (User Convenience)
'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
```

### Token Refresh Flow

1. User logs in → receives `access_token` and `refresh_token`
2. User makes API requests with `access_token`
3. When `access_token` expires → use `refresh_token` to get new `access_token`
4. When `refresh_token` expires → user must login again

The frontend (Next.js) handles token refresh automatically via the axios interceptor in `lib/api-client.ts`.

## Database Configuration

Location: `socialmedia/settings.py` or `.env` file

### PostgreSQL

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'coredb',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### SQLite (Development Only)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Environment Variables

For better security, use environment variables:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': os.getenv('DATABASE_ENGINE', 'django.db.backends.postgresql_psycopg2'),
        'NAME': os.getenv('DATABASE_NAME', 'coredb'),
        'USER': os.getenv('DATABASE_USER', 'postgres'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD', 'root'),
        'HOST': os.getenv('DATABASE_HOST', 'localhost'),
        'PORT': os.getenv('DATABASE_PORT', '5432'),
    }
}
```

## REST Framework Configuration

Location: `socialmedia/settings.py`

```python
REST_FRAMEWORK = {
    # Authentication
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    
    # Permissions
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    
    # Filtering, Searching, Ordering
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    
    # Pagination
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 15,
    
    # Response Format
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
```

### Changing Default Permissions

For public read, private write:
```python
'DEFAULT_PERMISSION_CLASSES': (
    'rest_framework.permissions.IsAuthenticatedOrReadOnly',
)
```

For authenticated only:
```python
'DEFAULT_PERMISSION_CLASSES': (
    'rest_framework.permissions.IsAuthenticated',
)
```

For public access:
```python
'DEFAULT_PERMISSION_CLASSES': (
    'rest_framework.permissions.AllowAny',
)
```

## Frontend Configuration

Location: `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Social Media Platform
```

### Changing API URL for Different Environments

**Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Staging:**
```env
NEXT_PUBLIC_API_URL=https://api-staging.example.com/api
```

**Production:**
```env
NEXT_PUBLIC_API_URL=https://api.example.com/api
```

### Using Environment in Code

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const appName = process.env.NEXT_PUBLIC_APP_NAME
```

## Security Settings

### Debug Mode

**Development:**
```python
DEBUG = True
```

**Production:**
```python
DEBUG = False
```

### Secret Key

Generate a new secret key:

```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

Then update in `.env`:
```env
SECRET_KEY=your-generated-secret-key-here
```

### Allowed Hosts

**Development:**
```python
ALLOWED_HOSTS = ['*']
```

**Production:**
```python
ALLOWED_HOSTS = [
    'example.com',
    'www.example.com',
    'api.example.com',
]
```

### HTTPS Configuration

For production, enforce HTTPS:

```python
# If behind a proxy
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Force HTTPS
SECURE_SSL_REDIRECT = True

# HSTS Headers
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

## Static Files Configuration

### Development

```python
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

### Production (Using WhiteNoise or CDN)

```python
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

## Logging Configuration

Add logging for debugging:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
        },
    },
}
```

## Media Files Configuration

For handling user uploads (avatars, post images):

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

Update `socialmedia/urls.py` for development:

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your patterns
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## Common Issues and Solutions

### Issue: CORS Error - "No 'Access-Control-Allow-Origin' header"

**Solution:**
1. Ensure `corsheaders.middleware.CorsMiddleware` is in MIDDLEWARE
2. Check frontend URL is in `CORS_ALLOWED_ORIGINS`
3. Restart Django server
4. Clear browser cache

### Issue: 401 Unauthorized After Login

**Solution:**
1. Check JWT token is being stored in localStorage
2. Verify token is sent in Authorization header
3. Check token expiration time
4. Ensure `rest_framework_simplejwt.authentication.JWTAuthentication` is configured

### Issue: CSRF Token Missing

**Solution:**
1. For AJAX requests, include CSRF token in header
2. Or disable CSRF for API endpoints using `@csrf_exempt` decorator
3. Or use session-based authentication

### Issue: Connection Refused to Database

**Solution:**
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database exists
4. Check host and port are correct

## Checklist for Production

- [ ] Set `DEBUG = False`
- [ ] Update `SECRET_KEY` to a secure value
- [ ] Update `ALLOWED_HOSTS` with production domain
- [ ] Configure `CORS_ALLOWED_ORIGINS` with production frontend URL
- [ ] Set up HTTPS with SSL certificates
- [ ] Configure proper logging
- [ ] Set up email backend for notifications
- [ ] Configure static file serving (CloudFront, S3, etc.)
- [ ] Configure media file storage (S3, etc.)
- [ ] Set up database backups
- [ ] Configure monitoring and error tracking (Sentry, etc.)
- [ ] Load environment variables from secure source
- [ ] Test all API endpoints
- [ ] Load test the application
- [ ] Set up CI/CD pipeline

---

For more information, see:
- [Django Settings Documentation](https://docs.djangoproject.com/en/6.0/ref/settings/)
- [DRF Documentation](https://www.django-rest-framework.org/)
- [SimpleJWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/)
