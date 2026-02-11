# Frontend Setup Guide

Complete guide to set up and run the React frontend for the Social Media application.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:8000`

## Quick Start

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file if needed (optional - defaults work for local development):
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Development Workflow

### File Structure Quick Reference

```
src/
├── pages/              # Full page components
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Home.jsx        # Home feed
│   └── Profile.jsx     # User profile
├── components/         # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Sidebar.jsx     # Left sidebar
│   ├── PostCard.jsx    # Post display
│   ├── CommentSection.jsx
│   ├── CreatePostModal.jsx
│   └── EditProfileModal.jsx
├── services/           # API integration
│   └── api.js          # Axios instance and API calls
├── context/            # State management
│   └── AuthContext.jsx # Authentication context
└── App.jsx             # Main routing component
```

### Common Development Tasks

#### Adding a New Page

1. Create new component in `src/pages/NewPage.jsx`
2. Add route to `src/App.jsx`
3. Create corresponding CSS file `src/pages/NewPage.css`

Example:
```jsx
// src/pages/NewPage.jsx
import React from 'react'
import Navbar from '../components/Navbar'
import './NewPage.css'

const NewPage = () => {
  return (
    <div className="new-page-layout">
      <Navbar />
      <main className="new-page-container">
        {/* Page content */}
      </main>
    </div>
  )
}

export default NewPage
```

#### Adding a New Component

1. Create component in `src/components/NewComponent.jsx`
2. Create CSS file `src/components/NewComponent.css`
3. Import and use in relevant pages

#### Adding API Integration

All API calls should go through `src/services/api.js`:

```jsx
// In api.js
export const myService = {
  getData: () => api.get('/endpoint/'),
  createData: (data) => api.post('/endpoint/', data),
}

// In component
import { myService } from '../services/api'

const MyComponent = () => {
  const handleFetch = async () => {
    try {
      const response = await myService.getData()
      // Handle response
    } catch (err) {
      // Handle error
    }
  }
}
```

### Authentication Context Usage

Access authentication state anywhere with `useAuth` hook:

```jsx
import { useAuth } from '../context/AuthContext'

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.username}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  )
}
```

## Building for Production

### Build the Application
```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the correct URL.

### Module Not Found Errors
Ensure all imports are correct:
```jsx
// Correct
import { useAuth } from '../context/AuthContext'

// Incorrect (will fail)
import { useAuth } from '../AuthContext'
```

### API Connection Fails
1. Verify backend is running: `http://localhost:8000/admin` should be accessible
2. Check CORS settings on backend
3. Verify `VITE_API_BASE_URL` in `.env` matches backend URL
4. Check browser console for specific error messages

### Token Expiration Issues
Tokens are automatically refreshed via the Axios interceptor. If still having issues:
1. Clear localStorage in browser DevTools
2. Log out and log in again
3. Check backend JWT settings

### HMR (Hot Module Reload) Not Working
Ensure the dev server is running and not blocked by firewalls. Try:
1. Restart the dev server
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser cache

## Performance Tips

### Optimize Components
```jsx
// Use React.memo for components that don't need to re-render
const PostCard = React.memo(({ post }) => {
  return <div>{post.body}</div>
})
```

### Lazy Load Routes
```jsx
// In App.jsx
const Home = React.lazy(() => import('./pages/Home'))
const Profile = React.lazy(() => import('./pages/Profile'))

<Suspense fallback={<LoadingSpinner />}>
  <Route path="/" element={<Home />} />
</Suspense>
```

### Limit Re-renders
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Avoid creating functions in render

## Code Style Guidelines

### Component Structure
```jsx
// Imports
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Component.css'

// Component
const Component = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null)
  const { user } = useAuth()

  const handleClick = () => {
    // Handler logic
  }

  return (
    <div className="component">
      {/* JSX */}
    </div>
  )
}

export default Component
```

### CSS Classes Naming
Use BEM-like naming convention:
```css
.component { }
.component-header { }
.component-header-title { }
.component--active { }
```

### Error Handling
Always wrap API calls in try-catch:
```jsx
try {
  const response = await apiService.getData()
  // Handle success
} catch (err) {
  console.error('Error:', err)
  // Show user-friendly error message
  setError('Failed to load data')
}
```

## Browser DevTools

### React DevTools Extension
Install React DevTools for Chrome/Firefox to inspect components and track state changes.

### Network Tab
Monitor API requests and responses:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR to see API calls

### Console
Watch for warnings and errors:
```jsx
console.log('[v0] Variable:', variable) // Debug logs
console.warn('Warning message')
console.error('Error message')
```

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Build completes without errors (`npm run build`)
- [ ] Production build runs without errors (`npm run preview`)
- [ ] No console errors in production
- [ ] All routes work correctly
- [ ] Authentication flow works
- [ ] API calls use correct endpoints
- [ ] Error handling is comprehensive
- [ ] Performance is acceptable

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## Getting Help

For issues not covered in this guide:
1. Check browser console for error messages
2. Review backend API logs for server errors
3. Verify API endpoints in `API_ENDPOINTS.md`
4. Check component and API documentation in README.md
