# 💼 CRM Pro - Financial Management System

<div align="center">

![CRM Pro](https://img.shields.io/badge/CRM-Professional-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-00758f?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, full-stack Customer Relationship Management (CRM) system designed for financial institutions and mortgage brokerage firms.

[Features](#features) • [Quick Start](#quick-start) • [Installation](#installation) • [Documentation](#documentation) • [Support](#support)

</div>

---

## 🎯 Overview

**CRM Pro** is a comprehensive financial management solution built with cutting-edge web technologies. It enables financial planners, mortgage brokers, and administrators to manage clients, tickets, and financial transactions in a unified, intuitive platform.

### 🌟 Key Highlights

- **Role-Based Access Control** - Admin, Financial Planner, and Mortgage Broker roles
- **Ticket Management System** - Track and manage client financial requests
- **Real-Time Dashboard** - Monitor tickets and financial activities
- **Secure Authentication** - JWT-based token authentication
- **Responsive Design** - Works seamlessly on desktop and tablet devices
- **Modern UI/UX** - Built with React and Tailwind CSS

---

## ✨ Features

### 📊 Dashboard
- **Finance Planner Dashboard** - Overview of assigned tickets and financial metrics
- **Admin Dashboard** - System-wide statistics and user management
- **Real-time Updates** - Live ticket status tracking

### 🎫 Ticket Management
- Create, read, update, and delete financial tickets
- Assign tickets to brokers and planners
- Track ticket status (open, in_progress, closed)
- Client information management
- Financial amount tracking

### 👥 User Management
- Create and manage multiple user accounts
- Role-based access control (Admin, Planner, Broker)
- User profile management
- Secure password reset functionality

### 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing with bcrypt
- Email-based password recovery
- Session management

### 📱 Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Smooth animations and transitions

---

## 🧭 Core CRM Components

### ✅ Implemented Features

1. **✅ User & Role Management**
  - Admin, Financial Planner, Mortgage Broker roles
  - Login/logout with JWT authentication
  - Password reset via email
  - Role-based access control

2. **✅ Customer Management**
  - Add/Edit/Delete customers
  - Customer profiles (name, phone, email, address)
  - Owner assignment and tracking
  - Customer status management (active/inactive)

3. **✅ Lead Management**
  - Create and capture leads from multiple sources
  - Lead statuses (New, Contacted, Qualified, Lost)
  - Convert lead → customer with one click
  - Track lead value and next action dates
  - Lead assignment and ownership

4. **✅ Contact Management**
  - Database support for multiple contacts per customer
  - Contact details (name, email, phone, title)
  - Primary contact designation

5. **✅ Task & Activity Management**
  - Create and assign tasks to team members
  - Due dates and reminder scheduling
  - Task status tracking (Open, In Progress, Done)
  - Link tasks to leads, customers, deals, or tickets
  - Task inbox for assigned activities

6. **✅ Ticket System**
  - Create and manage financial tickets
  - Assign tickets to brokers and planners
  - Track ticket status (Open, In Progress, Closed)
  - Client information and amount tracking
  - Serial number generation

7. **✅ Communication Tracking**
  - Database support for interaction logging
  - Track calls, emails, meetings, SMS, and notes
  - Link interactions to leads, customers, deals, or tickets

8. **✅ Dashboard & Reports**
  - Role-based dashboards (Admin, Planner, Broker)
  - Real-time ticket statistics
  - User management overview
  - Customer and lead tracking

9. **✅ Notification System**
  - Database infrastructure ready
  - User-specific notifications
  - Read/unread status tracking

10. **✅ Document Management**
   - Database support for document storage
   - Link documents to leads, customers, deals, or tickets
   - Track uploaded files and uploaders

### 🚧 Database-Ready (UI Coming Soon)

11. **Deals & Pipeline Management**
   - Database tables created for deal tracking
   - Stage management (Prospect, Negotiation, Won, Lost)
   - Expected revenue and close date tracking
   - Deal ownership and customer linking

12. **Settings & Configuration**
   - Database table for system-wide settings
   - Key-value storage for configurations

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.0 - UI library
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **Sequelize** - ORM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing

### Database
- **MySQL 8.0+** - Relational database

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL Server** 8.0+ - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** (optional) - [Download](https://git-scm.com/)

### Verify Installation
```bash
node --version
npm --version
mysql --version
```

---

## 🚀 Quick Start

Get the system running in 5 minutes:

### 1. Ensure MySQL is Running
MySQL Server 8.4+ is required. If not installed, download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)

**Check if MySQL is running:**
```powershell
Get-Service -Name MySQL*
```

**Start MySQL if needed:**
```powershell
# If MySQL service exists
Get-Service -Name MySQL* | Start-Service

# If no service, start manually:
Start-Process -FilePath "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" -ArgumentList "--datadir=`"C:\ProgramData\MySQL\MySQL Server 8.4\Data`"" -WindowStyle Hidden
```

### 2. Initialize MySQL (First Time Only)
If MySQL was just installed and never initialized:
```powershell
# Create data directory
New-Item -ItemType Directory -Path "C:\ProgramData\MySQL\MySQL Server 8.4\Data" -Force

# Initialize MySQL with no root password
& "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --initialize-insecure --datadir="C:\ProgramData\MySQL\MySQL Server 8.4\Data"
```

### 3. Run Database Setup
```bash
cd backend
node fullSetup.js
```

This will:
- ✅ Create the database `financial_crm_db`
- ✅ Import all table schemas (users, tickets, customers, leads, tasks, etc.)
- ✅ Seed sample data (users, tickets, customers, leads)
- ✅ Configure backend environment

### 4. Start Backend Server
```bash
cd backend
node server.js
```

Expected output: `Server running on port 5000` and `✅ Connected to database`

### 5. Start Frontend (New Terminal)
```bash
cd frontend
npm run dev -- --host --port 5174
```

### 6. Access the Application
Open your browser: **http://localhost:5174/**

---

## 📦 Installation

### Full Setup Guide

#### Step 1: Clone or Extract Project
```bash
# If using git
git clone <repository-url>
cd crm-system-main

# OR extract the provided archive
```

#### Step 2: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### Step 3: Setup Database

Ensure MySQL is running:
```powershell
# Windows - PowerShell
# Check if service exists
Get-Service -Name MySQL*

# If service exists, start it
Get-Service -Name MySQL* | Start-Service

# If no service, start manually
Start-Process -FilePath "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" -ArgumentList "--datadir=`"C:\ProgramData\MySQL\MySQL Server 8.4\Data`"" -WindowStyle Hidden
```

Create the database and import schemas:
```bash
cd backend
node fullSetup.js
```

#### Step 4: Configure Environment

**Backend Configuration** (`backend/.env`):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=financial_crm_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
USE_DEV_LOGIN=false
```

**Note:** Root password is empty by default with `--initialize-insecure`. To set a password, use MySQL commands after initialization.

**Frontend Configuration** (`frontend/.env`):
```env
VITE_BASE_URL=http://localhost:5000
```

#### Step 5: Start Servers
```bash
# Backend
cd backend
node server.js

# Frontend (in another terminal)
cd frontend
npm run dev -- --host --port 5174
```

#### Step 6: Access Application
Navigate to: **http://localhost:5174/**

---

## 🔑 Test Credentials

After setup, use these credentials to log in:

| Role | Username | Password | Email |
|------|----------|----------|-------|
| Admin | `admin` | `admin123` | admin@crm.com |
| Financial Planner | `planner1` | `planner123` | planner1@crm.com |
| Mortgage Broker | `broker1` | `broker123` | broker1@crm.com |
| Planner | `planner2` | `planner456` | planner2@crm.com |

### Role Capabilities

**Admin:**
- Full user management (create, edit, delete users)
- View all tickets, customers, leads
- System-wide statistics

**Financial Planner / Mortgage Broker:**
- Create and manage tickets
- Add and manage customers
- Create and convert leads
- Assign and track tasks
- View assigned tickets and owned records

---

## 📁 Project Structure

```
crm-system-main/
├── frontend/                          # React Frontend Application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── forgetPassword.jsx
│   │   │   └── resetPassword.jsx
│   │   ├── components/               # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Dashboard/
│   │   │   ├── Ticket/
│   │   │   └── user/
│   │   ├── context/                  # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   └── service/                  # API services
│   │       ├── authAPI.js
│   │       ├── ticketsAPI.js
│   │       └── userAPI.js
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/                           # Node.js Backend API
│   ├── server.js                      # Entry point
│   ├── config/
│   │   ├── config.js                 # Environment config
│   │   └── db.js                     # Database connection
│   ├── controllers/                   # Request handlers
│   │   ├── authController.js
│   │   ├── ticketController.js
│   │   └── userController.js
│   ├── models/                        # Data models
│   │   ├── User.js
│   │   └── Ticket.js
│   ├── routes/                        # API routes
│   │   ├── authRoutes.js
│   │   ├── ticketRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── scripts/
│   │   └── import-db.ps1
│   ├── package.json
│   ├── .env
│   ├── createTestUser.js
│   ├── seedDatabase.js
│   ├── fullSetup.js
│   └── README.md
│
├── financial_crm_db_users.sql         # User table schema
├── financial_crm_db_tickets.sql       # Ticket table schema
├── financial_crm_db_crm.sql           # CRM extension tables (customers, leads, tasks, etc.)
├── SETUP.bat                          # Windows setup helper
└── README.md                          # This file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "planner1",
  "password": "planner123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "financial_planner",
  "id": 2
}
```

#### Forgot Password
```
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "admin@crm.com"
}
```

#### Reset Password
```
PUT /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "newpassword123"
}
```

### Ticket Endpoints

#### Get All Tickets
```
GET /tickets
Headers: Authorization: Bearer {token}
```

#### Create Ticket
```
POST /tickets
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "serial_number": "TKT006",
  "client_name": "Client Name",
  "client_address": "123 Main St",
  "client_contact": "555-0100",
  "amount": 50000.00,
  "assigned_to": 3,
  "status": "open"
}
```

#### Update Ticket
```
PUT /tickets/{id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "in_progress",
  "assigned_to": 3
}
```

#### Delete Ticket
```
DELETE /tickets/{id}
Headers: Authorization: Bearer {token}
```

### User Endpoints

#### Get All Users
```
GET /users
Headers: Authorization: Bearer {token}
```

#### Create User
```
POST /users
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@crm.com",
  "password": "password123",
  "fullName": "New User",
  "role": "financial_planner"
}
```

#### Update User
```
PUT /users/{id}
Headers: Authorization: Bearer {token}
```

#### Delete User
```
DELETE /users/{id}
Headers: Authorization: Bearer {token}
```

### Customer Endpoints

#### Get All Customers
```http
GET /customers
Headers: Authorization: Bearer {token}
```

#### Create Customer
```http
POST /customers
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "555-1234",
  "address": "123 Business Ave",
  "ownerId": 2
}
```

#### Get Customer Details
```http
GET /customers/{id}
Headers: Authorization: Bearer {token}

Response includes customer data + interaction history
```

#### Update Customer
```http
PUT /customers/{id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "status": "inactive"
}
```

#### Delete Customer
```http
DELETE /customers/{id}
Headers: Authorization: Bearer {token}
```

### Lead Endpoints

#### Get All Leads
```http
GET /leads
Headers: Authorization: Bearer {token}
```

#### Create Lead
```http
POST /leads
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Potential Client",
  "email": "lead@example.com",
  "phone": "555-5678",
  "source": "Website",
  "value": 100000,
  "notes": "Interested in mortgage",
  "nextActionAt": "2026-01-25T10:00:00",
  "ownerId": 3
}
```

#### Update Lead Status
```http
PUT /leads/{id}/status
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "qualified"
}
```
Allowed statuses: new, contacted, qualified, lost

#### Convert Lead to Customer
```http
POST /leads/{id}/convert
Headers: Authorization: Bearer {token}

Response:
{
  "message": "Lead converted",
  "customerId": 5
}
```

### Task Endpoints

#### Get My Tasks
```http
GET /tasks
Headers: Authorization: Bearer {token}

Returns all tasks assigned to authenticated user
```

#### Create Task
```http
POST /tasks
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Follow up with client",
  "description": "Call about refinancing options",
  "dueDate": "2026-01-22T14:00:00",
  "relatedType": "lead",
  "relatedId": 5,
  "assignedTo": 2,
  "reminderAt": "2026-01-22T13:00:00"
}
```

#### Update Task Status
```http
PUT /tasks/{id}/status
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "done"
}
```
Allowed statuses: open, in_progress, done

#### Delete Task
```http
DELETE /tasks/{id}
Headers: Authorization: Bearer {token}
```

---

## 📝 npm Scripts

### Backend Scripts
```bash
npm start           # Start production server (node server.js)
npm run dev         # Start with nodemon (hot reload)
npm run seed:prod   # Seed database with sample data
node fullSetup.js   # Full database setup (creates DB, tables, seeds data)
node seedDatabase.js # Seed data only (requires existing tables)
```

### Frontend Scripts
```bash
npm run dev         # Start development server (default port 5173)
npm run dev -- --host --port 5174  # Start on specific port
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## 🐛 Troubleshooting

### Issue: "Invalid credentials" on login

**Solution:**
1. Verify backend is running: `node server.js` in backend folder
2. Check `.env` file: `USE_DEV_LOGIN=false` and `DB_PASSWORD=` (empty for default setup)
3. Ensure MySQL is running and database exists
4. Verify user exists in database:
   ```bash
   mysql -u root financial_crm_db -e "SELECT username, role FROM users;"
   ```

### Issue: MySQL connection refused

**Solution:**
```powershell
# Check if MySQL is running
Get-Process -Name mysqld -ErrorAction SilentlyContinue

# If not running, start it manually:
Start-Process -FilePath "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" -ArgumentList "--datadir=`"C:\ProgramData\MySQL\MySQL Server 8.4\Data`"" -WindowStyle Hidden

# Verify connection
& "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -e "SELECT 1"
```

### Issue: Database tables don't exist

**Solution:**
```bash
# Run full setup to create all tables
cd backend
node fullSetup.js

# Or import SQL files manually:
Get-Content financial_crm_db_users.sql | mysql -u root financial_crm_db
Get-Content financial_crm_db_tickets.sql | mysql -u root financial_crm_db
Get-Content financial_crm_db_crm.sql | mysql -u root financial_crm_db
```

### Issue: Port 5000 or 5174 already in use

**Solution:**
```powershell
# Kill node processes
Get-Process -Name node | Stop-Process -Force

# Restart servers
cd backend
node server.js

# In new terminal
cd frontend
npm run dev -- --host --port 5174
```

### Issue: Backend shows "Database connection failed"

**Solution:**
1. Check if MySQL is running (see MySQL connection issue above)
2. Verify database exists:
   ```bash
   mysql -u root -e "SHOW DATABASES LIKE 'financial_crm_db';"
   ```
3. If database doesn't exist, run `node fullSetup.js`
4. Check backend/.env has correct DB credentials

### Issue: Backend shows "Error connecting to database"

**Solution:**
1. MySQL must be installed and running
2. Check root password in `.env` is correct
3. Verify database was created: `npm run setup -- password`
4. For dev/testing without MySQL, set `USE_DEV_LOGIN=true` in `.env`

### Issue: CORS errors when calling API

**Solution:**
1. Verify backend is running on port 5000
2. Check `frontend/.env` has correct `VITE_BASE_URL`
3. Restart frontend: `npm run dev`
4. Clear browser cache

---

## 🔐 Security Notes

- ⚠️ **Change default passwords** before deploying to production
- ⚠️ **Update JWT_SECRET** in `.env` with a strong random string
- ⚠️ **Enable HTTPS** in production
- ⚠️ **Use environment variables** for sensitive data
- ⚠️ **Implement rate limiting** on API endpoints
- ⚠️ **Validate all inputs** on backend

---

## 📧 Email Configuration

To enable password reset emails:

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password at [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Update `backend/.env`:
```env
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(255),
  role ENUM('admin', 'financial_planner', 'mortgage_broker'),
  resetPasswordToken VARCHAR(255),
  resetPasswordExpires DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tickets Table
```sql
CREATE TABLE tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  serial_number VARCHAR(50) UNIQUE NOT NULL,
  client_name VARCHAR(100) NOT NULL,
  client_address VARCHAR(255),
  client_contact VARCHAR(50),
  amount DECIMAL(10,2),
  created_by INT,
  assigned_to INT,
  status ENUM('open', 'in_progress', 'closed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💡 Tips & Best Practices

### For Administrators
- Create separate user accounts for each team member
- Regularly backup the database
- Monitor ticket status and team performance
- Review access logs for security

### For Financial Planners
- Assign tickets to brokers promptly
- Update ticket status regularly
- Add detailed client information
- Use the dashboard to track workload

### For Mortgage Brokers
- Respond to assigned tickets promptly
- Update client status and financial details
- Close tickets when complete
- Track assigned amounts and portfolio

---

## 🆘 Support & Help

### Troubleshooting
- Check the [Troubleshooting](#troubleshooting) section above
- Review backend console logs for errors
- Verify all services are running

### Documentation
- Review code comments in source files
- Check API Documentation section
- Examine database schema

### Contact
For issues, feature requests, or questions:
- Create an issue in the repository
- Review existing documentation
- Check console logs for error messages

---

## 🎉 Getting Started Checklist

- [ ] Install Node.js and MySQL
- [ ] Clone/extract the project
- [ ] Install dependencies (`npm install` in both folders)
- [ ] Run setup script (`npm run setup -- password`)
- [ ] Update `.env` files with correct configuration
- [ ] Start backend (`npm start`)
- [ ] Start frontend (`npm run dev`)
- [ ] Open http://localhost:5174/
- [ ] Log in with test credentials
- [ ] Explore the dashboard

---

## 📈 Performance Tips

- Enable caching for API responses
- Use database indexes on frequently queried fields
- Implement pagination for large datasets
- Optimize images and assets
- Use CDN for static files in production

---

## 🚀 Deployment

### For Production

1. **Build frontend:**
```bash
cd frontend
npm run build
```

2. **Configure environment variables:**
- Update all `.env` values for production
- Use strong JWT_SECRET
- Configure real database host

3. **Use process manager:**
```bash
npm install -g pm2
pm2 start backend/server.js --name "crm-backend"
```

4. **Setup reverse proxy (Nginx/Apache)**

5. **Enable HTTPS with SSL certificate**

---

## 📞 Quick Reference

| Component | Port | URL |
|-----------|------|-----|
| Frontend | 5173/5174 | http://localhost:5173 |
| Backend API | 5000 | http://localhost:5000 |
| MySQL | 3306 | localhost:3306 |

---

<div align="center">

### Made with ❤️ for Financial Professionals

**Happy Managing!** 🎯

[⬆ Back to Top](#-crm-pro---financial-management-system)

</div>
