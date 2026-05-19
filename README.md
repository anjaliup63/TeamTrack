# TeamTrack — Full Stack Team Task Manager

TeamTrack is a modern full-stack task management and collaboration platform built using the MERN stack.  
It allows teams to create projects, assign tasks, manage workflows, and track productivity with secure role-based access control.

This project was developed as part of a Full-Stack Team Task Manager assignment. :contentReference[oaicite:0]{index=0}

---

# Live Demo

## Frontend
https://teamtrack-gwge.onrender.com

## Backend API
https://teamtrack-production-ba09.up.railway.app/api/health

---

# GitHub Repository

https://github.com/anjaliup63/TeamTrack

---

# Features

## Authentication & Authorization

- User Signup & Login
- JWT Authentication
- Password Encryption using bcryptjs
- Protected Routes
- Role-Based Access Control (Admin / Member)

---

## Project Management

- Create Projects
- Manage Team Projects
- Assign Members to Projects
- Track Project Progress

---

## Task Management

- Create Tasks
- Edit & Delete Tasks
- Assign Tasks to Team Members
- Task Status Tracking
- Priority Management
- Due Date Monitoring

---

## Dashboard

- Task Overview Dashboard
- Overdue Task Monitoring
- Project Statistics
- Productivity Insights
- Status Analytics

---

## Team Collaboration

### Admin Features

- Create Projects
- Manage Team Members
- Assign Tasks
- View Analytics
- Monitor Team Productivity

### Member Features

- View Assigned Projects
- Update Task Status
- Manage Personal Tasks
- Access Dashboard

---

# Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcryptjs |
| API Testing | Postman |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Deployment | Render, Railway |

---

# Folder Structure

```bash
TeamTrack/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── layouts/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│
└── README.md
