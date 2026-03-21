import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import GradesPage from './pages/GradesPage';
import './index.css';

import { 
  getStudents as fetchStudents, 
  addStudent as apiAddStudent, 
  deleteStudent as apiDeleteStudent,
  getGrades as fetchGrades,
  addGrade as apiAddGrade
} from './services/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);

  // Load data from API
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        try {
          const fetchedStudents = await fetchStudents();
          const fetchedGrades = await fetchGrades();
          setStudents(fetchedStudents);
          setGrades(fetchedGrades);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };
      loadData();
    }
  }, [isAuthenticated]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setStudents([]);
    setGrades([]);
  };

  // Student CRUD (Backend Sync)
  const addStudent = async (student) => {
    try {
      const newStudent = await apiAddStudent(student);
      setStudents(prev => [...prev, newStudent]);
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await apiDeleteStudent(id);
      setStudents(prev => prev.filter(s => s._id !== id));
      setGrades(prev => prev.filter(g => g.studentId !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  // Grade CRUD (Backend Sync)
  const addGrade = async (grade) => {
    try {
      const newGrade = await apiAddGrade(grade);
      setGrades(prev => [...prev, newGrade]);
    } catch (error) {
      console.error("Failed to add grade:", error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar user={user} onLogout={logout} />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={!isAuthenticated ? <LoginPage onLogin={login} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/signup" 
              element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard user={user} studentsCount={students.length} subjectsCount={new Set(grades.map(g => g.subject)).size} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/students" 
              element={isAuthenticated ? <StudentsPage user={user} students={students} onAdd={addStudent} onDelete={deleteStudent} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/grades" 
              element={isAuthenticated ? <GradesPage user={user} students={students} grades={grades} onAddGrade={addGrade} /> : <Navigate to="/" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
