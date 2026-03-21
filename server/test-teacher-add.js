import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function test() {
  console.log('Testing Teacher Add Student...');

  try {
    // 1. Login as teacher
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          email: 'teacher@school.com',
          password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login status:', loginRes.status, loginData.message);
    const token = loginData.data?.token;

    if (!token) {
        console.error('Failed to login. Please ensure the DB was seeded with recent teacher role.');
        return;
    }

    // 2. Try to add student
    const res = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: 'New Student',
        rollNumber: 'NS001',
        class: 'Class 11',
        email: 'newstudent@example.com'
      })
    });

    const data = await res.json();
    console.log('Add Student Response:', res.status, data.message || data.name);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
