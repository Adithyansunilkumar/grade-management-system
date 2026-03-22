import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { signup } from '../services/api';

const SignupPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { user, token } = await signup(formData);
      if (user && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
        navigate('/dashboard');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-gray-900">
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
            <h2 className="text-5xl font-bold leading-tight text-white">Get Started.</h2>
            <p className="text-lg text-primary-100 max-w-md leading-relaxed">
              Create an account to access the system and manage your academic records.
            </p>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full -ml-32 -mb-32 blur-2xl pointer-events-none" />
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in group">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Register User</h1>
            <p className="text-gray-500 font-medium">Please enter your information to register.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group/input">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input-field pl-12 h-12 w-full bg-gray-50 border-gray-100 focus:bg-white transition-all shadow-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="example@mail.com" 
                    className="input-field pl-12 h-12 w-full bg-gray-50 border-gray-100 focus:bg-white transition-all shadow-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Minimum 6 characters" 
                    className="input-field pl-12 h-12 w-full bg-gray-50 border-gray-100 focus:bg-white transition-all shadow-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'teacher'})}
                    className={`h-12 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${formData.role === 'teacher' ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-md' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span>Faculty</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'student'})}
                    className={`h-12 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${formData.role === 'student' ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-md' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                  >
                    <GraduationCap className="h-5 w-5" />
                    <span>Student</span>
                  </button>
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
              className="btn btn-primary w-full h-12 rounded-xl flex items-center justify-center space-x-2 text-lg font-bold shadow-xl active:scale-95 transition-all"
            >
              <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
              {!isLoading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            Already have an account? {' '}
            <Link to="/" className="text-primary-600 font-bold hover:underline decoration-2 underline-offset-4 text-sm">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
