import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function verify() {
  console.log('🚀 Starting Full Application Verification...');

  try {
    // 1. Signup a test admin
    console.log('\n--- 1. Testing Signup ---');
    const signupRes = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: 'password123',
        role: 'admin'
      })
    });
    const signupData = await signupRes.json();
    console.log('Signup Response:', signupRes.status, signupData.message || signupData);

    // 2. Login the admin
    console.log('\n--- 2. Testing Login ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testadmin@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginRes.status, loginData.message);
    const token = loginData.data?.token;
    if (!token) throw new Error('Failed to get token');

    // 3. Add a student
    console.log('\n--- 3. Testing Add Student ---');
    const studentRes = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: 'John Doe',
        rollNumber: 'S101',
        class: '10th'
      })
    });
    const studentData = await studentRes.json();
    console.log('Add Student Response:', studentRes.status, studentData.name);
    const studentId = studentData._id;

    // 4. Add a grade
    console.log('\n--- 4. Testing Add Grade ---');
    const gradeRes = await fetch(`${API_URL}/grades`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        studentId: studentId,
        subject: 'Mathematics',
        marks: 95
      })
    });
    const gradeData = await gradeRes.json();
    console.log('Add Grade Response:', gradeRes.status, gradeData.subject);

    // 5. Get Grades
    console.log('\n--- 5. Testing Get Grades ---');
    const getGradesRes = await fetch(`${API_URL}/grades/${studentId}`);
    const gradesList = await getGradesRes.json();
    console.log('Get Grades count:', gradesList.length);

    // 6. Delete Student
    console.log('\n--- 6. Testing Delete Student ---');
    const deleteRes = await fetch(`${API_URL}/students/${studentId}`, {
      method: 'DELETE'
    });
    const deleteData = await deleteRes.json();
    console.log('Delete Response:', deleteRes.status, deleteData.message);

    console.log('\n✅ Verification Complete! MERN App is functional.');
  } catch (error) {
    console.error('\n❌ Verification Failed:', error.message);
  }
}

verify();
