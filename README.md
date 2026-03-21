# GradeSync: Full-Stack Academy Management System

A beautiful, light-weight, and professional full-stack solution for college grade management built with React, Node.js, and MongoDB.

## 📁 Project Structure

### Frontend (`/client`)
- `client/src/components/`: Reusable UI elements
- `client/src/pages/`: Main application views
- `client/src/services/`: API communication layer

### Backend (`/server`)
- `server/config/`: Database connection settings
- `server/models/`: Mongoose schemas (Students, Grades)
- `server/controllers/`: Logic for API requests
- `server/routes/`: API endpoint definitions

## 🚀 Getting Started

### 1. Monorepo Setup (Recommended)
1. **Initialize Root**: `npm install`
2. **Install All Deps**: `npm run install-all`
3. **Run Both Client & Server**: `npm run dev`

### 2. Backend Setup Only
1. **Change Directory**: `cd server`
2. **Install**: `npm install`
3. **Configure**: Update `.env` with your `MONGO_URI`.
4. **Start**: `npm run dev`

### 3. Frontend Setup Only
1. **Change Directory**: `cd client`
2. **Install**: `npm install`
3. **Start**: `npm run dev`

## 🔐 Login Credentials
- **Email**: `admin@college.com`
- **Password**: `admin123`

## ✨ Features

- **Dashboard**: Visualize enrollment and performance at a glance.
- **RESTful API**: Clean separation of concerns with MVC architecture.
- **Relational Data**: Grades are linked to students via MongoDB ObjectId references.
- **Responsive UI**: Fluid layout built with Tailwind CSS v4.
- **Persistence**: Real-time updates stored in MongoDB.

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS v4, Lucide Icons, React Router
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **State**: useState + useEffect (No complex libraries)
