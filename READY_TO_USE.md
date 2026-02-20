# 🎉 DocScript — Ready to Use!

## What's Included
✅ **Complete doctor prescription SaaS** with authentication, role-based access, and patient management  
✅ **Local SQLite database** (no setup needed)  
✅ **User authentication** with JWT tokens  
✅ **Admin & User roles** with different permissions  
✅ **React frontend** + **Node.js backend** + **Prisma ORM**  

---

## 🚀 Quick Start (30 seconds)

### Option 1: Automatic Setup (Easiest)

**Windows users:** Double-click `setup.bat` in the project root, then run the two commands it shows.

**Mac/Linux users:** Run in terminal from project root:
```bash
npm install
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### Option 2: Manual Commands

```bash
# Terminal 1: Install and start backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# Terminal 2: Start frontend (from project root, NOT backend folder)
npm install
npm run dev
```

---

## 📱 Login & Test

1. Open **http://localhost:5173**
2. Click **"Register here"**
3. Use these credentials:
   - **Email:** `admin@example.com`
   - **Password:** `Admin123!@#`
4. Click Register → You're now an ADMIN with full access!

---

## 👥 User Roles

| Role | Permissions |
|------|------------|
| **ADMIN** | View all patients, edit, delete, access settings |
| **USER** | Create new prescriptions only |

When you register, the first user with email `admin@example.com` (set in `backend/.env`) auto-becomes ADMIN. All other users are regular USERs.

---

## 🗂️ Project Structure

```
dr-project/
├── src/                    # React frontend
│   ├── components/        # UI components
│   ├── hooks/            # Auth context & protected routes
│   ├── App.tsx           # Main app with routing
│   └── types.ts          # TypeScript types
├── backend/
│   ├── index.js          # Express API server
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── dev.db        # SQLite database (created on first run)
│   └── .env              # Backend configuration
├── package.json          # Root dependencies
├── setup.bat             # Windows setup (double-click!)
└── QUICKSTART.md         # Quick reference
```

---

## 🛠️ What Happens on First Run

1. **npm install** → Installs all packages
2. **npx prisma generate** → Creates Prisma types
3. **npx prisma migrate dev --name init** → Creates SQLite database + tables
4. **npm run dev** → Starts the app

The SQLite database (`backend/prisma/dev.db`) is created automatically. No external database setup needed!

---

## 🔐 Authentication

- **Register:** `POST /api/auth/register` with `{ email, password, name }`
- **Login:** `POST /api/auth/login` with `{ email, password }`
- **Returns:** JWT token (valid 7 days)
- **Usage:** Add header: `Authorization: Bearer <token>`

---

## 📊 Database

**Tables created automatically:**
- `Clinic` - Clinic info (name, doctor name, address, etc.)
- `User` - Users with roles and hashed passwords
- `Patient` - Patient records with prescriptions

**Reset database:**
```bash
cd backend
rm prisma/dev.db
npx prisma migrate dev --name init
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` in that folder |
| Database errors | Delete `backend/prisma/dev.db` and rerun migrations |
| Port already in use | Kill other Node processes or change PORT in `.env` |
| Frontend won't connect to backend | Check `VITE_API_URL` in root `.env` (should be `http://localhost:4000`) |

---

## 📈 Production Deployment

When ready to deploy:

1. **Switch database:** Change `backend/.env` to use PostgreSQL:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   ```

2. **Deploy backend** to Railway, Render, or Heroku
3. **Deploy frontend** to Vercel, Netlify, or GitHub Pages
4. **Update frontend:** Set `VITE_API_URL` to your deployed backend URL

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production steps.

---

## ✨ Features

✅ User registration & login  
✅ JWT token-based authentication  
✅ Role-based access control (ADMIN/USER)  
✅ Patient management (create, read, update, delete)  
✅ Clinic settings (customize doctor name, address, etc.)  
✅ Search patients by name or mobile  
✅ Dashboard with stats  
✅ Responsive design (desktop & mobile)  

---

**That's it!** Your SaaS is ready to use and extend. 🚀

Questions? Check [QUICKSTART.md](./QUICKSTART.md) or [DEPLOYMENT.md](./DEPLOYMENT.md).
