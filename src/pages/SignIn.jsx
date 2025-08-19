import React, { useState } from 'react';
import { useSignInEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Toaster } from 'react-hot-toast';
import { ArrowRight, Lock, User } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  if (isSuccess) return <Navigate to="/" replace />;

  return (
    <AuthLayout
      title="Welcome Back to Subspace Pro"
      subtitle="Sign in to continue your AI conversation journey."
    >
      <Toaster />
      <div className="text-center  mb-8">
        <h2 className="text-3xl text-black font-bold">
          Sign In
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link to="/sign-up" className="font-medium bg-gray-300/80 rounded-xl px-1 py-0.5 text-gray-600 hover:shadow-sm hover:shadow-black/30 border-2 border-gray-400/10 duration-300">
            Sign Up
          </Link>
        </p>
      </div>
      <form onSubmit={handleSignIn} className="space-y-6">
        {isError && (
          <div className="p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 text-sm">
            {error?.message || 'An unknown error occurred.'}
          </div>
        )}
        <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-gray-200 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-md focus-within:shadow-violet-200 transition-all duration-300 ease-in-out">
          <User size={22} className="text-gray-700" />
          <input
            type="email"
            placeholder="Email here.."
            className="montserrat-medium text-sm text-black w-full bg-gray-200 placeholder:text-sm placeholder-gray-500/60 outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-gray-200 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-md focus-within:shadow-violet-200 transition-all duration-300 ease-in-out'>
          <Lock size={22} className='text-gray-700' />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="montserrat-medium text-sm text-black w-full bg-gray-200 placeholder:text-sm placeholder-gray-500/60 outline-none "
          placeholder="Your Password here.."
        />
        </div>

        </div>
        <div className='flex items-center justify-center'>
          <button
            type="submit"
            disabled={isLoading}
            className="border-2 border-gray-200 text-md font-semibold text-gray-600 hover:text-white px-10 py-2 rounded-xl hover:bg-gradient-to-br from-black via-black/80 to-black bg-gray-300  cursor-pointer duration-500 transition-all transform-gpu active:scale-95 hover:scale-102"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
            {/* <ArrowRight
              className={`h-4 w-4 transition-transform duration-300 ${
                isLoading ? '' : 'group-hover:translate-x-1'
              }`}
            /> */}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
