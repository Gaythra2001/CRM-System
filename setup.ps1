#!/usr/bin/env powershell

Write-Host "🚀 CRM System - Complete Setup Script" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is installed
Write-Host "1️⃣  Checking MySQL..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name MySQL* -ErrorAction SilentlyContinue

if ($null -eq $mysqlService) {
    Write-Host "❌ MySQL not found. Installing MySQL Community Server..." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download and install MySQL from:" -ForegroundColor Yellow
    Write-Host "https://dev.mysql.com/downloads/mysql/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Installation Steps:" -ForegroundColor Yellow
    Write-Host "  1. Download MySQL Community Server (Windows msi installer)"
    Write-Host "  2. Run the installer"
    Write-Host "  3. Choose 'Server only' or 'Developer Default'"
    Write-Host "  4. Configure MySQL Server"
    Write-Host "  5. Set root password (e.g., 'root123')"
    Write-Host "  6. Complete the installation"
    Write-Host ""
    Write-Host "After installation, run this script again." -ForegroundColor Cyan
    Read-Host "Press Enter to open the MySQL download page"
    Start-Process "https://dev.mysql.com/downloads/mysql/"
    exit
}

Write-Host "✅ MySQL found. Starting service..." -ForegroundColor Green
Get-Service -Name MySQL* | Start-Service -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

$status = (Get-Service -Name MySQL* -ErrorAction SilentlyContinue).Status
if ($status -eq "Running") {
    Write-Host "✅ MySQL service is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MySQL service may not be running. Continuing anyway..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "2️⃣  Setting up database..." -ForegroundColor Yellow

$mysqlPassword = Read-Host "Enter MySQL root password"
$workspace = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$usersSql = Join-Path $workspace "financial_crm_db_users.sql"
$ticketsSql = Join-Path $workspace "financial_crm_db_tickets.sql"

# Create database
Write-Host "Creating database 'financial_crm_db'..." -ForegroundColor Cyan
$cmd = "mysql -u root -p$mysqlPassword -e `"CREATE DATABASE IF NOT EXISTS financial_crm_db;`" 2>&1"
$result = Invoke-Expression $cmd
if ($LASTEXITCODE -eq 0 -or $result -like "*already exists*") {
    Write-Host "✅ Database created/verified" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database creation issue: $result" -ForegroundColor Yellow
}

# Import users schema
Write-Host "Importing users schema..." -ForegroundColor Cyan
$cmd = "mysql -u root -p$mysqlPassword financial_crm_db < `"$usersSql`" 2>&1"
$result = Invoke-Expression $cmd
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Users schema imported" -ForegroundColor Green
} else {
    Write-Host "⚠️  Users import issue: $result" -ForegroundColor Yellow
}

# Import tickets schema
Write-Host "Importing tickets schema..." -ForegroundColor Cyan
$cmd = "mysql -u root -p$mysqlPassword financial_crm_db < `"$ticketsSql`" 2>&1"
$result = Invoke-Expression $cmd
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Tickets schema imported" -ForegroundColor Green
} else {
    Write-Host "⚠️  Tickets import issue: $result" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "3️⃣  Updating backend configuration..." -ForegroundColor Yellow

$envFile = Join-Path $workspace "backend\.env"
$envContent = @"
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$mysqlPassword
DB_NAME=financial_crm_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
USE_DEV_LOGIN=false
"@

$envContent | Set-Content -Path $envFile
Write-Host "✅ Updated $envFile" -ForegroundColor Green

Write-Host ""
Write-Host "4️⃣  Seeding database with sample data..." -ForegroundColor Yellow

$backendPath = Join-Path $workspace "backend"
Push-Location $backendPath
$env:DB_PASSWORD = $mysqlPassword
node seedDatabase.js
Pop-Location

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 - Start Backend:" -ForegroundColor Cyan
Write-Host "  cd C:\Users\User\Desktop\crm-system-main\backend" -ForegroundColor Gray
Write-Host "  npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "Terminal 2 - Start Frontend:" -ForegroundColor Cyan
Write-Host "  cd C:\Users\User\Desktop\crm-system-main\frontend" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Then visit: http://localhost:5173/" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Test Credentials:" -ForegroundColor Yellow
Write-Host "  Admin: admin / admin123" -ForegroundColor Gray
Write-Host "  Planner: planner1 / planner123" -ForegroundColor Gray
Write-Host "  Broker: broker1 / broker123" -ForegroundColor Gray
Write-Host ""
