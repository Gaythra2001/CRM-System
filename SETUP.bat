@echo off
echo.
echo 🚀 CRM System - Setup Instructions
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo STEP 1: Install MySQL
echo ──────────────────────
echo Download from: https://dev.mysql.com/downloads/mysql/
echo - Choose "Server only" or "Developer Default"
echo - Remember your root password
echo.
echo STEP 2: After MySQL is installed, run these PowerShell commands:
echo ──────────────────────────────────────────────────────────────
echo.
echo Get-Service -Name MySQL* ^| Start-Service
echo.
echo SET YOUR_ROOT_PASSWORD=your_password_here
echo.
echo mysql -u root -p%%YOUR_ROOT_PASSWORD%% -e "CREATE DATABASE IF NOT EXISTS financial_crm_db;"
echo.
echo mysql -u root -p%%YOUR_ROOT_PASSWORD%% financial_crm_db ^< "C:\Users\User\Desktop\crm-system-main\financial_crm_db_users.sql"
echo.
echo mysql -u root -p%%YOUR_ROOT_PASSWORD%% financial_crm_db ^< "C:\Users\User\Desktop\crm-system-main\financial_crm_db_tickets.sql"
echo.
echo STEP 3: Update backend/.env with your root password
echo ──────────────────────────────────────────────────
echo Change USE_DEV_LOGIN=false
echo Change DB_PASSWORD=your_password_here
echo.
echo STEP 4: Seed the database with sample data
echo ────────────────────────────────────────
echo cd C:\Users\User\Desktop\crm-system-main\backend
echo npm run seed:prod
echo.
echo STEP 5: Start the servers
echo ────────────────────────
echo Terminal 1: cd backend ^&^& npm start
echo Terminal 2: cd frontend ^&^& npm run dev
echo.
echo STEP 6: Visit http://localhost:5173/
echo ──────────────────────────────────
echo Login with:
echo   admin / admin123
echo   planner1 / planner123
echo   broker1 / broker123
echo.
pause
