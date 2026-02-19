# 🚀 START HERE

Welcome to the Social Media Platform - a complete, production-ready application with frontend and backend!

## ⚡ Quick Start (2 minutes)

```bash
# 1. Start the database
docker-compose up -d

# 2. Setup backend
pip install -r requirements.txt
python manage.py migrate

# 3. Start backend (in one terminal)
python manage.py runserver

# 4. Setup frontend (in another terminal)
npm install

# 5. Start frontend
npm run dev

# 6. Open browser
# http://localhost:3000
```

That's it! You're ready to go.

---

## 📚 Documentation Quick Links

Pick based on what you need:

### Just Getting Started?
→ **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** (10 min read)
- Command cheat sheet
- Common fixes
- Key info

### Need Detailed Setup?
→ **[SETUP_GUIDE.md](SETUP_GUIDE.md)** (30 min read)
- Step-by-step instructions
- Troubleshooting
- Docker setup
- Database guide

### Using the API?
→ **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**
- All endpoints
- Examples
- Request/response formats
- cURL commands

### Configuring CORS or JWT?
→ **[CONFIGURATION.md](CONFIGURATION.md)**
- CORS setup
- JWT configuration
- Database setup
- Security settings

### Looking at Frontend Code?
→ **[FRONTEND_README.md](FRONTEND_README.md)**
- Component structure
- State management
- Page layout

### Testing Everything?
→ **[VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)**
- Complete testing guide
- Configuration checks
- Security verification

### Want an Overview?
→ **[README.md](README.md)** or **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)**
- Project overview
- Tech stack
- Features

---

## 🎯 What Can You Do?

✅ Register and create accounts
✅ Create, edit, and delete posts
✅ Like and unlike posts
✅ Comment on posts
✅ View user profiles
✅ Search and filter posts
✅ Manage your profile
✅ Use JWT authentication

---

## 🛠 Most Useful Commands

```bash
# Backend
python manage.py runserver          # Start Django
python manage.py migrate            # Run migrations
python manage.py createsuperuser    # Create admin account

# Frontend
npm run dev                          # Start Next.js
npm run build                        # Build for production

# Docker
docker-compose up -d                # Start database
docker-compose down                 # Stop database

# Using Makefile (Unix/Linux/Mac)
make run-backend                    # Start Django
make run-frontend                   # Start Next.js
make migrate                        # Run migrations
make docker-up                      # Start Docker
```

---

## 🚨 Common Issues & Fixes

### CORS Error?
- Check Django is running on `http://localhost:8000`
- Restart Django server
- Clear browser cache
→ See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more

### 401 Error (Not Authenticated)?
- Make sure you're logged in
- Check tokens in browser DevTools (F12)
- Try registering again
→ See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for more

### Can't Connect to Database?
- Check PostgreSQL is running: `docker-compose ps`
- Verify `.env` credentials
- Run: `python manage.py migrate`
→ See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more

### Port 3000 or 8000 Already in Use?
```bash
# Use different port
python manage.py runserver 8001
npm run dev -- -p 3001

# Update API URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

---

## 📁 Project Structure at a Glance

```
Project Root/
├── app/                    # Frontend pages
│   ├── page.tsx           # Home/Feed
│   ├── auth/              # Login/Register
│   └── profile/           # User profiles
├── components/            # React components
├── lib/                   # API services
├── core/                  # Django backend apps
├── socialmedia/           # Django config
├── SETUP_GUIDE.md        # Detailed setup
├── API_DOCUMENTATION.md  # API reference
├── CONFIGURATION.md      # Config guide
├── QUICK_REFERENCE.md    # Cheat sheet
└── ... (and more)
```

---

## 🔑 Key Information

**Frontend URL:** http://localhost:3000
**Backend URL:** http://localhost:8000
**API Base URL:** http://localhost:8000/api

**Database:**
- Name: coredb
- User: postgres
- Password: root
- Host: localhost:5432

**API Endpoints:**
- Register: `POST /api/auth/register/`
- Login: `POST /api/auth/login/`
- Posts: `GET /api/posts/`, `POST /api/posts/`
- Comments: `GET /api/comments/`, `POST /api/comments/`

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for all endpoints.

---

## 📊 Technology Stack

**Backend:**
- Django 6.0
- Django REST Framework
- PostgreSQL
- JWT Authentication

**Frontend:**
- Next.js 15
- React 19
- Tailwind CSS
- Zustand (State Management)

---

## ✨ What's Already Done

✓ Complete backend API
✓ Complete frontend application
✓ CORS properly configured
✓ JWT authentication working
✓ Database models created
✓ All features implemented
✓ Complete documentation
✓ Docker setup ready
✓ Error handling
✓ Responsive design

---

## 🎓 Learning Resources

**Official Docs:**
- Django: https://docs.djangoproject.com/
- Django REST: https://www.django-rest-framework.org/
- Next.js: https://nextjs.org/docs
- React: https://react.dev

**In This Project:**
- All API info: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Configuration: [CONFIGURATION.md](CONFIGURATION.md)
- Setup help: [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 🎬 Your Next Steps

### Option 1: Just Play With It
1. Run the quick start above (2 min)
2. Open http://localhost:3000
3. Register and test features
4. Done!

### Option 2: Understand It
1. Read [README.md](README.md) for overview (5 min)
2. Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for details (10 min)
3. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for endpoints (15 min)
4. Try some API calls in browser DevTools

### Option 3: Set It Up Properly
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) (30 min)
2. Follow all setup steps carefully
3. Run [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) to test (30 min)
4. Review [CONFIGURATION.md](CONFIGURATION.md) for production (20 min)

### Option 4: Deploy It
1. Read [CONFIGURATION.md](CONFIGURATION.md) production section
2. Update environment variables
3. Deploy backend (Heroku, AWS, Vercel, etc.)
4. Deploy frontend (Vercel, Netlify, etc.)

---

## 🆘 Need Help?

1. **Quick fixes:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. **Setup issues:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. **API questions:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
4. **Configuration:** [CONFIGURATION.md](CONFIGURATION.md)
5. **All docs index:** [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## ✅ Pre-Flight Checklist

Before you start:

- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] PostgreSQL installed or Docker available
- [ ] Port 3000 and 8000 available
- [ ] Text editor or IDE ready
- [ ] Terminal/Command prompt open

All set? → Start with the **Quick Start** section above!

---

## 📞 Questions?

- Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) to find the right doc
- Review [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) to test everything
- See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common issues

---

**Ready?** Run these 6 commands and you're done:

```bash
docker-compose up -d
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &
npm install
npm run dev
```

Then open http://localhost:3000 and start building! 🎉

---

*Last Updated: February 2026*
*Status: Complete & Production-Ready*
*Next: Pick a documentation file above and dive in!*
