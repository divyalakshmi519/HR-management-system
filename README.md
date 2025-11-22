# HR Management System

## Overview
The HR Management System is a full-stack deployed application demonstrating human resource management capabilities for organizations. It integrates database design, backend APIs, and frontend UI into a working system, showing how DBMS concepts are applied in real-world HR operations.

## How It Works

### Organization Registration & Login
- Organizations can register and create admin accounts
- Users are authenticated with JWT tokens for secure access

### Employee Management
- Logged-in users can create, view, update, and delete employee records
- Each employee is tied to the organization

### Team Management
- Users can create teams and assign employees to multiple teams
- Many-to-many relationship between employees and teams

### Activity Logging
- All backend operations are automatically logged
- Includes login, employee/team creation, assignments
- Maintains audit trails

### Real-time Data Management
- Employees and teams are dynamically managed
- Responsive UI components

## Tech Stack

**Database:**
- SQLite 

**Backend:**
- Node.js + Express.js REST APIs

**Frontend:**
- React.js with modular components
- Components: Login, Register, Dashboard, Employees, Teams

**Deployment:**
- Frontend → Netlify
- Backend → Render

**Authentication:**
- JWT tokens

**Version Control:**
- GitHub

## Backend API Endpoints

- **Authentication:** `/api/auth`
- **Employees:** `/api/employees`
- **Teams:** `/api/teams`
- **Logs:** Automatic logging system

## Features

- Secure Organization Registration & Login System
- Employee CRUD Operations
- Team Creation & Management
- Employee-Team Assignment System
- Activity Logging & Audit Trail
- Responsive UI for Seamless Use
- JWT-based Authentication

## Live Demo

**Backend API:** https://hr-management-system.onrender.com

**Frontend:** https://hr-management-system-evallo.netlify.app

## Getting Started

### Backend
**Deployment → Render**
- Ensure CORS is enabled for frontend requests

### Frontend
**Deployment → Netlify**

### Run Locally

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend  
npm install
npm start
```

## Run the App
Visit → `http://localhost:3000`

## Test Accounts
**Email:** admin@techsolutions.com  
**Password:** admin123

## Future Enhancements
- Advanced employee search and filtering
- Team performance analytics
- Email notifications for HR actions
- File upload for employee documents
- Role-based access control
- Reporting dashboard with charts
