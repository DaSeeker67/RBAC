# RBAC Application

## Overview

This project is a Role-Based Access Control (RBAC) system that enables secure user management and access control. The system consists of a Node.js and Express backend with a React and Tailwind CSS frontend.

## Key Features

- **User Authentication**: Secure login with JWT-based authentication
- **Role-Based Access Control**: Admin, Editor, and Viewer roles
- **Admin Dashboard**: 
  - View, add, edit, and delete users
  - Manage user roles and statuses
- **Responsive Frontend**: Modern UI using React and Tailwind CSS
- **Secure Backend**: Protected API endpoints with JWT authentication

## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/rbac-app.git
   cd rbac-app
   ```
2. Install backend dependencies:
```bash
cd backend-rbac
npm install
```

3. Install frontend dependencies:
   
```bash
cd ../RolebaseSignp
npm install
```
4. Configuration

Create a .env file in the backend directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

5 Running the Application
Backend

```bash
  cd backend
  npm start
  # Runs on http://localhost:5000
```
Frontend

```bash
 cd ../RolebaseSignp
npm run dev
# Runs on http://localhost:5173

```
API Endpoints

POST /api/auth/login: User login
GET /api/users: Fetch all users (Admin only)
PUT /api/users/:id: Update user role/status
DELETE /api/users/:id: Delete user (Admin only)

Project Structure

```
rbac-app/
├── backend-rbac/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── RolebasedSignp/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
