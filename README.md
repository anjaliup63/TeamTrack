# TeamTrack — Productivity & Collaboration Workspace

A modern full-stack productivity platform built for teams to manage projects, organize workflows, track progress, and collaborate efficiently in a unified workspace environment.

TeamTrack combines task management, project organization, analytics dashboards, authentication, and responsive UI into a clean MERN-stack application.

---

## Preview

TeamTrack is designed as a modern workspace inspired by productivity-focused platforms with a futuristic and responsive user experience.

### Core Focus Areas

- Team collaboration
- Workflow management
- Project tracking
- Productivity monitoring
- Dashboard analytics
- Secure authentication
- Responsive workspace UI

---

## Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | React Router DOM |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Charts & Analytics | Chart.js |
| Notifications | React Hot Toast |
| HTTP Client | Axios |
| Icons | Heroicons |

---

## Key Features

### Authentication & Security

- JWT-based authentication system
- Protected routes
- Role-based access control
- Persistent login sessions
- Password hashing using bcrypt
- Secure API communication

---

### Project Management

- Create and manage projects
- Assign project members
- Organize workflows efficiently
- Track project progress
- Deadline monitoring

---

### Task Management

- Create, edit, and delete tasks
- Priority-based task organization
- Task assignment system
- Due date tracking
- Task status management
- Personal productivity workflows

---

### Dashboard & Analytics

- Interactive workspace dashboard
- Productivity insights
- Task completion statistics
- Team performance tracking
- Workspace overview analytics
- Overdue task monitoring

---

### Team Collaboration

- Shared workspace environment
- Admin & member access levels
- Team workflow organization
- Collaborative productivity system

---

### User Experience

- Modern workspace interface
- Responsive design
- Glassmorphism-inspired UI
- Smooth animations & transitions
- Mobile-friendly layout

---

## Project Structure

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
│   │   ├── layouts/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Backend `.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Local Development Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas or local MongoDB instance

---

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Architecture

The platform uses REST APIs for communication between frontend and backend.

### Main API Modules

| Module | Description |
|--------|-------------|
| Authentication APIs | Login, register, profile management |
| Project APIs | Project CRUD operations |
| Task APIs | Task management workflows |
| User APIs | User & role management |
| Dashboard APIs | Analytics & workspace statistics |

---

## Access Control

### Admin Access

Admins can:

- Manage projects
- Create & assign tasks
- Manage team members
- Access analytics dashboard
- Monitor workspace performance
- View team productivity statistics

---

### Member Access

Members can:

- Access assigned projects
- Manage personal tasks
- Update task status
- View dashboard insights
- Edit profile information

---

## Deployment

### Recommended Platforms

| Service | Platform |
|---------|-----------|
| Frontend Hosting | Vercel / Netlify |
| Backend Hosting | Railway / Render |
| Database | MongoDB Atlas |

---

## Development Highlights

- Full-stack MERN architecture
- Responsive workspace UI
- Reusable React component structure
- REST API integration
- Secure authentication workflow
- Productivity-focused dashboard system
- Modern glassmorphism styling
- Scalable backend organization

---

## Future Improvements

Potential future enhancements include:

- Real-time notifications
- AI productivity assistant
- Team messaging system
- File uploads
- Calendar integration
- Activity timeline
- Advanced analytics
- Workspace customization

---

## Developer Information

Developed as a modern productivity and collaboration workspace application using the MERN stack.
