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
        <h2 className="text-3xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold">
          Sign In
        </h2>
        <p className="mt-2 text-gray-300/80 text-sm ">
  Don't have an account?{' '}
  <Link
    to="/sign-up"
    className="
      whitespace-nowrap
      text-[15px] font-medium
      bg-gray-800/80 rounded-lg px-1 py-0.5
      bg-gradient-to-r from-green-300 to-blue-400
      bg-clip-text text-transparent
      hover:border-gray-300/40 border-2 border-gray-400/30
      duration-300
    "
  >
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
        <div className="flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-transparent border border-gray-400 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-sm focus-within:shadow-violet-200 transition-all duration-300 ease-in-out">
          <User size={22} className="text-blue-400" />
          <input
            type="email"
            placeholder="Email here.."
            className="montserrat-medium text-sm text-white w-full bg-transparent placeholder:text-sm placeholder-gray-100/70 outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-transparent border border-gray-400 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-sm focus-within:shadow-violet-200 transition-all duration-300 ease-in-out'>
          <Lock size={22} className='text-blue-400' />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="montserrat-medium text-sm text-white w-full bg-transparent placeholder:text-sm placeholder-gray-100/70 outline-none "
          placeholder="Your Password here.."
        />
        </div>

        </div>
        <div className='flex items-center justify-center'>
          <button
            type="submit"
            disabled={isLoading}
            className="border-2 border-green-400 bg-gray-900 text-md font-semibold text-green-400 hover:text-white px-10 py-2 rounded-xl hover:bg-green-400/80 active:scale-95 cursor-pointer duration-500 transition-all transform-gpu active:scale-95 hover:scale-102"
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
