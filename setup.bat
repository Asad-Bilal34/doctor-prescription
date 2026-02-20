@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo  DocScript Setup (SQLite - No DB needed!)
echo ========================================
echo.

REM Install root dependencies
echo [1/3] Installing dependencies...
call npm install

REM Go to backend
cd backend || exit /b 1

REM Install backend dependencies & Prisma
echo [2/3] Setting up backend...
call npm install
call npm install prisma@5.12.0 --save-dev

REM Generate Prisma and create database
echo [3/3] Creating SQLite database...
call npx prisma generate
call npx prisma migrate dev --name init

echo.
echo ========================================
echo Setup complete! 
echo ========================================
echo.
echo Start your app in 2 terminals:
echo.
echo Terminal 1 (Backend):
echo   cd D:\dr-project\backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd D:\dr-project
echo   npm run dev
echo.
echo Open: http://localhost:5173
echo Register with: admin@example.com / Admin123!@#
echo.
pause
