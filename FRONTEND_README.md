# Social Media Frontend

A modern, minimal Next.js 15 frontend for a Django REST Framework social media backend.

## Features

- **Authentication**: User registration and login with JWT tokens
- **Feed**: View posts from all users with like functionality
- **Create Posts**: Create, edit, and delete your own posts
- **Comments**: View and post comments on posts
- **User Profiles**: View user profiles with their posts
- **Responsive Design**: Works on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running at `http://localhost:8000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Create a `.env.local` file (optional, defaults are provided):
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Feed page
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Register page
│   ├── profile/[userId]/        # User profile page
│   └── post/[postId]/           # Post detail page
├── components/                   # React components
│   ├── layout/                  # Layout components
│   ├── post/                    # Post components
│   ├── comment/                 # Comment components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── lib/                          # Utility functions
│   ├── api-client.ts            # Axios configuration
│   └── services/                # API services
│       ├── auth.service.ts
│       ├── user.service.ts
│       ├── post.service.ts
│       └── comment.service.ts
├── store/                        # Zustand stores
│   └── authStore.ts             # Authentication state
├── globals.css                   # Global styles
└── tailwind.config.ts           # Tailwind CSS config
```

## API Endpoints

The frontend communicates with these backend endpoints:

### Authentication
- `POST /auth/register/` - Register new user
- `POST /auth/login/` - Login user
- `POST /auth/refresh/` - Refresh JWT token

### Users
- `GET /user/` - List all users
- `GET /user/{id}/` - Get user profile
- `PATCH /user/{id}/` - Update user profile

### Posts
- `GET /post/` - Get all posts
- `POST /post/` - Create post
- `GET /post/{id}/` - Get post details
- `PUT /post/{id}/` - Update post
- `DELETE /post/{id}/` - Delete post
- `POST /post/{id}/like/` - Like post
- `POST /post/{id}/remove_like/` - Unlike post

### Comments
- `GET /post/{postId}/comment/` - Get comments for post
- `POST /post/{postId}/comment/` - Create comment
- `PUT /post/{postId}/comment/{id}/` - Update comment
- `DELETE /post/{postId}/comment/{id}/` - Delete comment

## State Management

We use **Zustand** for state management:

- **authStore**: Manages user authentication state, login/register/logout operations

## Styling

The application uses **Tailwind CSS** for styling with a minimal color palette:

- **Primary**: `#1f2937` (dark gray)
- **Secondary**: `#6b7280` (medium gray)
- **Accent**: `#3b82f6` (blue)
- **Light Background**: `#f9fafb`
- **Card Background**: `#ffffff`
- **Border Color**: `#e5e7eb`

## Build

To create a production build:

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL (default: `http://localhost:8000/api`)

## Troubleshooting

### "Can't reach the backend"
- Ensure the backend is running on `http://localhost:8000`
- Check that CORS is properly configured on the Django backend
- Verify the API base URL in environment variables

### "Login fails with 401"
- Check that your credentials are correct
- Ensure the backend user registration/authentication is working

### "Comments not loading"
- Verify the backend has the comment endpoints implemented
- Check browser console for API errors

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand 4
- **HTTP Client**: Axios 1
- **React Version**: 19

## License

MIT
