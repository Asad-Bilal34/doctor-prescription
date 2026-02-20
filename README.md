# DocScript — Doctor Prescription SaaS

A complete, ready-to-use SaaS application for managing medical prescriptions with user authentication, role-based access, and patient management.

**🚀 Want to get started in 30 seconds?** → Read [READY_TO_USE.md](./READY_TO_USE.md)

---

## ✨ What's Included

- ✅ **Complete frontend** (React + Vite + TypeScript)
- ✅ **API backend** (Node.js + Express)
- ✅ **Authentication** (JWT + bcrypt)
- ✅ **Database** (SQLite - no setup required!)
- ✅ **Role-based access** (Admin/User roles)
- ✅ **Patient management** (CRUD operations)
- ✅ **Responsive design** (mobile-friendly)

---

## 🎯 Quick Setup

### 1. Install (30 seconds)
```bash
npm install
cd backend
npm install
```

### 2. Migrate Database (10 seconds)
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Run (start 2 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Test
Open http://localhost:5173 → Register → Use app!

---

## 👤 Demo Login

**Email:** `admin@example.com`  
**Password:** `Admin123!@#`

(First user with this email auto-becomes ADMIN)

---

## 📚 Documentation

- [READY_TO_USE.md](./READY_TO_USE.md) — Detailed setup & features
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Deploy to production
- [QUICKSTART.md](./QUICKSTART.md) — Copy-paste commands

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, TypeScript, React Router
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** SQLite (local development)
- **Auth:** JWT + bcrypt

---

**Ready to start?** Go to [READY_TO_USE.md](./READY_TO_USE.md) 🎉
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
