import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import GradesPage from './pages/GradesPage';
import GradebookPage from './pages/GradebookPage';
import Layout from './components/Layout';
import { 
  getStudents as fetchStudents, 
  getGrades as fetchGrades,
  addStudent as apiAddStudent,
  deleteStudent as apiDeleteStudent,
  addGrade as apiAddGrade
} from './services/api';

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Auth initialization error:", err);
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!(token && token !== 'null' && token !== 'undefined');
  });
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated) {
        try {
          const fetchedStudents = await fetchStudents();
          const fetchedGrades = await fetchGrades();
          setStudents(fetchedStudents);
          setGrades(fetchedGrades);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    };
    loadData();
  }, [isAuthenticated]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

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
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const addGrade = async (gradeData) => {
    try {
      const newGrade = await apiAddGrade(gradeData);
      setGrades(prev => [...prev, newGrade]);
    } catch (error) {
      console.error("Failed to assign grade:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLoginSuccess} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage onLogin={handleLoginSuccess} /> : <Navigate to="/dashboard" />} />

        {/* Protected App Routes with Layout */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard user={user} studentsCount={students.length} subjectsCount={6} />
              </Layout>
            ) : <Navigate to="/" />
          } 
        />
        <Route 
          path="/students" 
          element={
            isAuthenticated ? (
              <Layout user={user} onLogout={handleLogout}>
                <StudentsPage user={user} students={students} onDelete={deleteStudent} allGrades={grades} />
              </Layout>
            ) : <Navigate to="/" />
          } 
        />
        <Route 
          path="/grades" 
          element={
            isAuthenticated ? (
              <Layout user={user} onLogout={handleLogout}>
                <GradesPage user={user} students={students} grades={grades} onAddGrade={addGrade} />
              </Layout>
            ) : <Navigate to="/" />
          } 
        />
         <Route 
          path="/gradebook" 
          element={
            isAuthenticated && user?.role === 'teacher' ? (
              <Layout user={user} onLogout={handleLogout}>
                <GradebookPage students={students} allGrades={grades} />
              </Layout>
            ) : <Navigate to="/" />
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
