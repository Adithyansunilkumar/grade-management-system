import React, { useState } from 'react';
import { GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';
import { login as loginApi } from '../services/api';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await loginApi({ email, password });
      onLogin(response.data);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to GradeSync Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="admin@college.com"
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
                placeholder="admin123"
                className="input pl-10 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full h-12 flex items-center justify-center space-x-2 group"
          >
            {loading ? 'Logging in...' : (
              <>
                <span>Login</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-4">
          <p className="text-sm text-gray-500">
            For demo purposes, use: <br />
            <span className="font-mono text-primary-600">admin@college.com / admin123</span>
          </p>
          <p className="text-sm text-gray-500">
            Don't have an account? {' '}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
