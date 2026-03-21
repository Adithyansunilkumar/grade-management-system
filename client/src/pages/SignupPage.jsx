import React, { useState } from 'react';
import { GraduationCap, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { signup as signupApi } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !role) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signupApi({ name, email, password, role });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md p-8 glass card shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-full mb-4">
            <GraduationCap className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-gray-500 mt-2">Join GradeSync Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="input pl-10 h-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="john@example.com"
                className="input pl-10 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="********"
                className="input pl-10 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">Role</label>
            <select
              className="input h-12"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full h-12 flex items-center justify-center space-x-2 group"
          >
            {loading ? 'Creating...' : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Already have an account? {' '}
            <Link to="/" className="font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
