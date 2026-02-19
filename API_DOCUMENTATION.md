# Social Media API Documentation

Complete API documentation for the social media platform backend.

## Base URL

```
http://localhost:8000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer {access_token}
```

## Authentication Endpoints

### Register User

**Endpoint:** `POST /auth/register/`

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "bio": "I love coding",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "bio": "I love coding",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

### Login User

**Endpoint:** `POST /auth/login/`

**Request:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### Refresh Token

**Endpoint:** `POST /auth/refresh/`

**Request:**
```json
{
  "refresh": "{refresh_token}"
}
```

**Response:**
```json
{
  "access": "{new_access_token}"
}
```

---

### Logout User

**Endpoint:** `POST /auth/logout/`

**Headers:** `Authorization: Bearer {access_token}`

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### List All Users

**Endpoint:** `GET /users/`

**Query Parameters:**
- `search` - Search by username, first_name, or last_name
- `limit` - Number of results per page (default: 15)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "count": 50,
  "next": "http://localhost:8000/api/users/?offset=15",
  "previous": null,
  "results": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "bio": "I love coding",
      "avatar": "https://example.com/avatar.jpg",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get User Details

**Endpoint:** `GET /users/{id}/`

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "bio": "I love coding",
  "avatar": "https://example.com/avatar.jpg",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "posts_count": 5,
  "followers_count": 100,
  "following_count": 50
}
```

---

### Update User Profile

**Endpoint:** `PATCH /users/{id}/`

**Headers:** `Authorization: Bearer {access_token}`

**Request:**
```json
{
  "bio": "Updated bio",
  "first_name": "John",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "bio": "Updated bio",
  "avatar": "https://example.com/new-avatar.jpg",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

---

### Get User's Posts

**Endpoint:** `GET /users/{id}/posts/`

**Query Parameters:**
- `limit` - Number of results per page (default: 15)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "author": { "id": 1, "username": "john_doe" },
      "content": "Hello world!",
      "image": null,
      "likes_count": 10,
      "comments_count": 3,
      "is_liked": false,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Post Endpoints

### List All Posts

**Endpoint:** `GET /posts/`

**Query Parameters:**
- `search` - Search posts by content
- `author` - Filter by author ID
- `ordering` - Order by field (e.g., `-created_at`)
- `limit` - Results per page (default: 15)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/posts/?offset=15",
  "previous": null,
  "results": [
    {
      "id": 1,
      "author": {
        "id": 1,
        "username": "john_doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "content": "Hello world!",
      "image": "https://example.com/post-image.jpg",
      "likes_count": 10,
      "comments_count": 3,
      "is_liked": false,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Post

**Endpoint:** `POST /posts/`

**Headers:** `Authorization: Bearer {access_token}`

**Request:**
```json
{
  "content": "My first post!",
  "image": null
}
```

**Response:**
```json
{
  "id": 101,
  "author": {
    "id": 1,
    "username": "john_doe",
    "avatar": "https://example.com/avatar.jpg"
  },
  "content": "My first post!",
  "image": null,
  "likes_count": 0,
  "comments_count": 0,
  "is_liked": false,
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

---

### Get Post Details

**Endpoint:** `GET /posts/{id}/`

**Response:**
```json
{
  "id": 1,
  "author": {
    "id": 1,
    "username": "john_doe",
    "avatar": "https://example.com/avatar.jpg"
  },
  "content": "Hello world!",
  "image": "https://example.com/post-image.jpg",
  "likes_count": 10,
  "comments_count": 3,
  "is_liked": false,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

### Update Post

**Endpoint:** `PATCH /posts/{id}/`

**Headers:** `Authorization: Bearer {access_token}`

**Request:**
```json
{
  "content": "Updated content"
}
```

**Response:**
```json
{
  "id": 1,
  "author": {
    "id": 1,
    "username": "john_doe",
    "avatar": "https://example.com/avatar.jpg"
  },
  "content": "Updated content",
  "image": "https://example.com/post-image.jpg",
  "likes_count": 10,
  "comments_count": 3,
  "is_liked": false,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

---

### Delete Post

**Endpoint:** `DELETE /posts/{id}/`

**Headers:** `Authorization: Bearer {access_token}`

**Response:** 204 No Content

---

### Like/Unlike Post

**Endpoint:** `POST /posts/{id}/like/`

**Headers:** `Authorization: Bearer {access_token}`

**Response:**
```json
{
  "liked": true,
  "likes_count": 11
}
```

---

## Comment Endpoints

### List Comments

**Endpoint:** `GET /comments/`

**Query Parameters:**
- `post` - Filter by post ID
- `limit` - Results per page (default: 15)
- `offset` - Pagination offset

**Response:**
```json
{
  "count": 50,
  "results": [
    {
      "id": 1,
      "post": 1,
      "author": {
        "id": 2,
        "username": "jane_doe",
        "avatar": "https://example.com/jane-avatar.jpg"
      },
      "content": "Great post!",
      "created_at": "2024-01-15T10:45:00Z",
      "updated_at": "2024-01-15T10:45:00Z"
    }
  ]
}
```

---

### Create Comment

**Endpoint:** `POST /comments/`

**Headers:** `Authorization: Bearer {access_token}`

**Request:**
```json
{
  "post": 1,
  "content": "Great post!"
}
```

**Response:**
```json
{
  "id": 101,
  "post": 1,
  "author": {
    "id": 1,
    "username": "john_doe",
    "avatar": "https://example.com/avatar.jpg"
  },
  "content": "Great post!",
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

---

### Get Comment Details

**Endpoint:** `GET /comments/{id}/`

**Response:**
```json
{
  "id": 1,
  "post": 1,
  "author": {
    "id": 2,
    "username": "jane_doe",
    "avatar": "https://example.com/jane-avatar.jpg"
  },
  "content": "Great post!",
  "created_at": "2024-01-15T10:45:00Z",
  "updated_at": "2024-01-15T10:45:00Z"
}
```

---

### Update Comment

**Endpoint:** `PATCH /comments/{id}/`

**Headers:** `Authorization: Bearer {access_token}`

**Request:**
```json
{
  "content": "Updated comment"
}
```

---

### Delete Comment

**Endpoint:** `DELETE /comments/{id}/`

**Headers:** `Authorization: Bearer {access_token}`

**Response:** 204 No Content

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "details": {
    "field_name": ["Error message"]
  }
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limiting

Currently, no rate limiting is enforced. Consider implementing rate limiting in production using:
- Django REST Framework's throttling classes
- Redis-based rate limiting

---

## Pagination

All list endpoints support pagination:

```
GET /posts/?limit=20&offset=40
```

Response includes:
- `count` - Total number of items
- `next` - URL for next page
- `previous` - URL for previous page
- `results` - Array of items

---

## Sorting and Filtering

### Ordering

Sort results by appending `?ordering=-created_at`:

```
GET /posts/?ordering=-created_at
GET /posts/?ordering=author__username
```

### Searching

Search across multiple fields:

```
GET /posts/?search=hello
GET /users/?search=john
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "content": "Hello world!"
  }'
```

### Get Posts
```bash
curl -X GET "http://localhost:8000/api/posts/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
