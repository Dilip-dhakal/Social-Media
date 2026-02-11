# Social Media Frontend

A production-level React frontend for a Social Media application, built with Vite and styled with pure CSS. The application provides features for user authentication, posting, commenting, and liking functionality.

## Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Home Feed**: View all posts from users, sorted by creation date (newest first)
- **Create Posts**: Write and publish new posts from the sidebar
- **Like/Unlike**: Like or unlike posts with real-time count updates
- **Comments**: Add comments to posts and view all comments with delete functionality
- **User Profile**: View user profiles with their posts and bio information
- **Edit Profile**: Update profile information including name, bio, and avatar
- **Responsive Design**: Fully responsive layout that works on mobile and desktop devices

## Tech Stack

- **React 18.3** - UI library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **Pure CSS** - Styling with CSS variables for theming

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Left sidebar with user info
│   │   ├── PostCard.jsx            # Individual post component
│   │   ├── CreatePostModal.jsx     # Modal for creating new posts
│   │   ├── CommentSection.jsx      # Comments for posts
│   │   ├── EditProfileModal.jsx    # Edit user profile modal
│   │   └── ProtectedRoute.jsx      # Route protection component
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Register.jsx            # Registration page
│   │   ├── Home.jsx                # Home feed page
│   │   └── Profile.jsx             # User profile page
│   ├── services/
│   │   └── api.js                  # Axios API client and endpoints
│   ├── context/
│   │   └── AuthContext.jsx         # Authentication context
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Global styles and theme
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set the API base URL if needed (default: `http://localhost:8000/api`)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality

The codebase follows these practices:
- Functional components with hooks
- Reusable components with proper separation of concerns
- Clean state management using React Context
- Centralized API service with interceptors for token management
- Responsive design with mobile-first approach
- Error handling and user feedback for all API calls

## API Integration

The frontend communicates with the Django backend API. The API service (`src/services/api.js`) provides:

### Authentication
- `authService.register(data)` - Register new user
- `authService.login(email, password)` - Login user

### Posts
- `postService.getPosts()` - Fetch all posts
- `postService.createPost(data)` - Create new post
- `postService.updatePost(id, data)` - Update post
- `postService.deletePost(id)` - Delete post
- `postService.likePost(id)` - Like a post
- `postService.unlikePost(id)` - Unlike a post

### Comments
- `commentService.getComments(postId)` - Fetch comments for a post
- `commentService.createComment(postId, data)` - Add comment to post
- `commentService.updateComment(postId, commentId, data)` - Update comment
- `commentService.deleteComment(postId, commentId)` - Delete comment

### Users
- `userService.getUsers()` - Fetch all users
- `userService.getUser(id)` - Fetch specific user
- `userService.updateUser(id, data)` - Update user profile

## Authentication Flow

1. User registers or logs in on the Auth pages
2. Backend returns JWT access and refresh tokens
3. Tokens are stored in localStorage
4. Axios interceptor adds access token to all requests
5. If access token expires, refresh token is used to get new access token
6. On token expiration, user is redirected to login

## Styling System

The application uses CSS variables for consistent theming:

```css
--primary: Main dark color for text
--secondary: Brand color (blue) for interactive elements
--bg: Light background color
--bg-secondary: Secondary background (light gray)
--text: Main text color
--text-secondary: Secondary text color (gray)
--border: Border color
--error: Error/danger color
--success: Success color
```

## Performance Optimizations

- Lazy loading of routes
- Memoized components to prevent unnecessary re-renders
- Efficient state updates
- Debounced API calls where appropriate
- Optimized CSS with no unused styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Ensure the Django backend is running on `http://localhost:8000`
- Check that `VITE_API_BASE_URL` in `.env` matches your backend URL
- Verify CORS settings on the backend

### Authentication Issues
- Clear localStorage and try logging in again
- Check browser console for token errors
- Ensure backend JWT settings are configured correctly

### Component Not Displaying
- Check browser console for React errors
- Verify all component imports are correct
- Ensure CSS classes are properly defined

## Future Enhancements

- Real-time notifications using WebSockets
- Search functionality for posts and users
- Infinite scroll pagination
- Image uploads for posts and avatars
- Follow/Unfollow users
- Hashtag support
- Direct messaging between users
- Dark mode toggle

## License

This project is part of a social media application and follows the main project's license.

## Support

For issues and questions, please refer to the main project documentation or contact the development team.
