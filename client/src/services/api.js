const API_BASE_URL = 'http://localhost:5000/api';

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }
    return data;
  } catch (error) {
    console.error('Signup Error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Students
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const getStudents = () => fetchData('students');

export const addStudent = async (studentData) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error('Failed to add student');
  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete student');
  return response.json();
};

// Grades
export const getGrades = () => fetchData('grades');

export const getMyGrades = async () => {
    const response = await fetch(`${API_BASE_URL}/grades/my-grades`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch grades');
    return response.json();
  };

export const addGrade = async (gradeData) => {
  const response = await fetch(`${API_BASE_URL}/grades`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(gradeData),
  });
  if (!response.ok) throw new Error('Failed to assign grade');
  return response.json();
};

export default API_BASE_URL;
