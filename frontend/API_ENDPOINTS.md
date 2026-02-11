# Social Media API Endpoints

Complete documentation of the Django REST Framework API endpoints used by the frontend.

## Base URL
```
http://localhost:8000/api
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### Register
- **Endpoint**: `POST /auth/register/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "password": "securepassword123",
    "bio": "Optional bio",
    "avatar": "https://..."
  }
  ```
- **Response** (201):
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "bio": "Optional bio",
    "avatar": "https://...",
    "is_active": true,
    "created": "2024-01-01T12:00:00Z",
    "updated": "2024-01-01T12:00:00Z"
  }
  ```

#### Login
- **Endpoint**: `POST /auth/login/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response** (200):
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "first_name": "John",
      "last_name": "Doe",
      "bio": "Optional bio",
      "avatar": "https://...",
      "is_active": true,
      "created": "2024-01-01T12:00:00Z",
      "updated": "2024-01-01T12:00:00Z"
    },
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
  ```

#### Refresh Token
- **Endpoint**: `POST /auth/refresh/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "refresh": "refresh_token_string"
  }
  ```
- **Response** (200):
  ```json
  {
    "access": "new_access_token"
  }
  ```

### Users

#### List Users
- **Endpoint**: `GET /user/`
- **Authentication**: Required
- **Query Parameters**: None
- **Response** (200):
  ```json
  [
    {
      "id": "uuid",
      "username": "username",
      "first_name": "John",
      "last_name": "Doe",
      "bio": "User bio",
      "avatar": "https://...",
      "email": "user@example.com",
      "is_active": true,
      "created": "2024-01-01T12:00:00Z",
      "updated": "2024-01-01T12:00:00Z"
    }
  ]
  ```

#### Get User
- **Endpoint**: `GET /user/{id}/`
- **Authentication**: Required
- **Path Parameters**: `id` - User UUID
- **Response** (200): Same as single user object above

#### Update User
- **Endpoint**: `PATCH /user/{id}/`
- **Authentication**: Required
- **Path Parameters**: `id` - User UUID
- **Request Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "bio": "Updated bio",
    "avatar": "https://..."
  }
  ```
- **Response** (200): Updated user object

### Posts

#### List Posts
- **Endpoint**: `GET /post/`
- **Authentication**: Required
- **Response** (200):
  ```json
  [
    {
      "id": "uuid",
      "author": {
        "id": "uuid",
        "username": "author_username",
        "first_name": "John",
        "last_name": "Doe",
        "bio": "Author bio",
        "avatar": "https://...",
        "email": "author@example.com",
        "is_active": true,
        "created": "2024-01-01T12:00:00Z",
        "updated": "2024-01-01T12:00:00Z"
      },
      "body": "Post content",
      "edited": false,
      "liked": false,
      "likes_count": 5,
      "created": "2024-01-01T12:00:00Z",
      "updated": "2024-01-01T12:00:00Z"
    }
  ]
  ```

#### Create Post
- **Endpoint**: `POST /post/`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "body": "Post content here"
  }
  ```
- **Response** (201): Post object

#### Get Post
- **Endpoint**: `GET /post/{id}/`
- **Authentication**: Required
- **Path Parameters**: `id` - Post UUID
- **Response** (200): Post object

#### Update Post
- **Endpoint**: `PUT /post/{id}/`
- **Authentication**: Required
- **Path Parameters**: `id` - Post UUID
- **Request Body**:
  ```json
  {
    "body": "Updated post content"
  }
  ```
- **Response** (200): Updated post object

#### Delete Post
- **Endpoint**: `DELETE /post/{id}/`
- **Authentication**: Required
- **Path Parameters**: `id` - Post UUID
- **Response** (204): No content

#### Like Post
- **Endpoint**: `POST /post/{id}/like/`
- **Authentication**: Required
- **Path Parameters**: `id` - Post UUID
- **Request Body**: Empty
- **Response** (200): Updated post object with `liked: true`

#### Unlike Post
- **Endpoint**: `POST /post/{id}/remove_like/`
- **Authentication**: Required
- **Path Parameters**: `id` - Post UUID
- **Request Body**: Empty
- **Response** (200): Updated post object with `liked: false`

### Comments

#### List Comments for Post
- **Endpoint**: `GET /post/{post_id}/comment/`
- **Authentication**: Required
- **Path Parameters**: `post_id` - Post UUID
- **Response** (200):
  ```json
  [
    {
      "id": "uuid",
      "post": "post_uuid",
      "author": {
        "id": "uuid",
        "username": "commenter_username",
        "first_name": "Jane",
        "last_name": "Smith",
        "bio": "Commenter bio",
        "avatar": "https://...",
        "email": "commenter@example.com",
        "is_active": true,
        "created": "2024-01-01T12:00:00Z",
        "updated": "2024-01-01T12:00:00Z"
      },
      "body": "Comment content",
      "edited": false,
      "created": "2024-01-01T12:00:00Z",
      "updated": "2024-01-01T12:00:00Z"
    }
  ]
  ```

#### Create Comment
- **Endpoint**: `POST /post/{post_id}/comment/`
- **Authentication**: Required
- **Path Parameters**: `post_id` - Post UUID
- **Request Body**:
  ```json
  {
    "body": "Comment text"
  }
  ```
- **Response** (201): Comment object

#### Update Comment
- **Endpoint**: `PUT /post/{post_id}/comment/{comment_id}/`
- **Authentication**: Required
- **Path Parameters**: 
  - `post_id` - Post UUID
  - `comment_id` - Comment UUID
- **Request Body**:
  ```json
  {
    "body": "Updated comment text"
  }
  ```
- **Response** (200): Updated comment object

#### Delete Comment
- **Endpoint**: `DELETE /post/{post_id}/comment/{comment_id}/`
- **Authentication**: Required
- **Path Parameters**:
  - `post_id` - Post UUID
  - `comment_id` - Comment UUID
- **Response** (204): No content

## HTTP Status Codes

- **200** - OK - Request succeeded
- **201** - Created - Resource created successfully
- **204** - No Content - Request succeeded with no content to return
- **400** - Bad Request - Invalid request parameters
- **401** - Unauthorized - Missing or invalid authentication
- **403** - Forbidden - User doesn't have permission
- **404** - Not Found - Resource not found
- **500** - Internal Server Error - Server error

## Error Response Format

```json
{
  "field_name": ["Error message"],
  "detail": "General error message"
}
```

## Data Types

- **uuid**: UUID format (e.g., "550e8400-e29b-41d4-a716-446655440000")
- **email**: Valid email format
- **datetime**: ISO 8601 format (e.g., "2024-01-01T12:00:00Z")
- **string**: Text data
- **boolean**: true or false
- **integer**: Whole numbers

## Rate Limiting

Currently, the API does not implement rate limiting. This should be added in production.

## Pagination

Currently, the API returns all results. Pagination may be implemented in future versions.

## Filtering and Sorting

The API currently does not support filtering or sorting parameters. These features may be added in future updates.

## CORS

The frontend must be served from the same origin or CORS must be properly configured on the backend.
