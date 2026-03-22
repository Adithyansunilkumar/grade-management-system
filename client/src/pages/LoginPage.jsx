import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Mail, Lock } from 'lucide-react';
import { login } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { user, token } = await login(formData);
      if (user && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-col justify-center p-20 bg-primary-600 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-xl">
              <GraduationCap className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white/90">Grade Management System</span>
          </div>
          
          <div className="space-y-4 pt-6">
            <h2 className="text-5xl font-bold leading-tight">Welcome Back.</h2>
            <p className="text-lg text-primary-100 max-w-md">
              A simple platform for teachers and students to manage grades.
            </p>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full -ml-32 -mb-32 blur-2xl pointer-events-none" />
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">User Login</h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                  <input 
                    type="email" 
                    placeholder="Enter email" 
                    className="input-field pl-12 h-12 w-full border-gray-100"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    className="input-field pl-12 h-12 w-full border-gray-100"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary w-full h-12 rounded-xl flex items-center justify-center space-x-2 font-bold"
            >
              <span>{isLoading ? 'Loading...' : 'Login'}</span>
              {!isLoading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            New user? {' '}
            <Link to="/signup" className="text-primary-600 font-bold hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
