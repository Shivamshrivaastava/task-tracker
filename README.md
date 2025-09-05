# Task Tracker (MERN)

A full-stack **Task Tracking Application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and styled using **TailwindCSS**.

## 🚀 Features
- User authentication (Register / Login with JWT)
- Create, update, delete tasks
- Track progress with completion percentage
- Task attributes: `title`, `priority (low/medium/high)`, `dueDate`, `completed`
- Responsive UI with TailwindCSS
- Backend REST API for task management

## 📂 Project Structure
```
task-tracker/
│── backend/       # Express + MongoDB backend
│── frontend/      # React + Vite + Tailwind frontend
│── README.md      # Documentation
```

## ⚡ Backend Setup
```bash
cd backend
npm install
npm start
```
#backend hosted and Runs on: `https://task-tracker-1wen.onrender.com/api` 
---
#frontend hosted and Runs on: `https://the-task-tracking-app.netlify.app/`
---
### Backend Endpoints
- `POST /auth/register` → Register user
- `POST /auth/login` → Login & get JWT
- `GET /tasks` → Get all tasks (auth required)
- `POST /tasks` → Create task
- `PUT /tasks/:id` → Update task
- `DELETE /tasks/:id` → Delete task

## 🎨 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```


## 🔑 Environment Variables

Create a `.env` file in the **backend** folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## ✅ Usage
1. Register a new user
2. Login to get token (stored in localStorage)
3. Start adding and tracking tasks!

---

Made with ❤️ using MERN + TailwindCSS.
