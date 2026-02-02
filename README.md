# 💬 Chatty – Full Stack Chat Application (MERN)

Chatty is a full-stack chat application built using the MERN stack with secure authentication and authorization.  
The project is deployed on Render with MongoDB Atlas and handles real-world production issues like SPA routing and database inactivity.

🔗 **Live Demo:** https://chatapp-frontend-81gr.onrender.com  

---

## 🚀 Features
- User authentication & authorization (JWT)
- Secure login & signup system
- Protected routes
- Responsive and clean UI
- Client-side routing using React Router
- Production-ready deployment

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

### Deployment
- Render (Frontend + Backend)
- MongoDB Atlas (Free Tier)

---

## 🧠 Key Learnings & Challenges Solved

This project helped me understand **real-world deployment issues**, not just local development:

- MongoDB Atlas free-tier cluster auto-pauses after inactivity  
- Debugged backend authentication failures caused by database unavailability  
- Fixed SPA refresh issue (`404 Not Found`) by configuring **rewrite rules** on Render  
- Managed environment variables securely in production  
- Understood the difference between frontend and backend deployment behavior  

