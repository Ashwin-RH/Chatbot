import React, { useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Toaster, toast } from 'react-hot-toast';
import { MailCheck, ArrowRight, User, Lock, UserRoundPlus } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const { signUpEmailPassword, isLoading, isError, error } = useSignUpEmailPassword();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { isSuccess, needsEmailVerification, error: signUpError } =
        await signUpEmailPassword(email, password, {
          displayName: email.split('@')[0],
        });

      if (isSuccess || needsEmailVerification) {
        setIsSignedUp(true);
      } else if (signUpError) {
        toast.error(signUpError.message || 'An unknown error occurred.');
      }
    } catch (err) {
      toast.error('Something went wrong during signup.');
    }
  };

  // Success message screen
  if (isSignedUp) {
    return (
      <AuthLayout title="One Last Step...">
        <div className="text-center">
          <MailCheck className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            Please verify your email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a verification link to <strong>{email}</strong>.  
            Please check your inbox and spam folder to complete your registration.
          </p>
          <div className="mt-6">
            <Link to="/sign-in" className="font-medium text-primary hover:text-primary/80">
              Return to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Signup form screen
  return (
    <AuthLayout
      title="Create Your Subspace Pro Account"
      subtitle="Experience the future of conversation with an advanced AI assistant."
    >
      <Toaster />
      <div className="text-center mb-8">
        <h2 className="text-3xl text-black font-bold">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 text-center md:text-center">
        Already have an account?{' '}
        <Link
          to="/sign-in"
          className="inline-block font-medium bg-gray-300/80 rounded-xl px-1 py-0.5 text-gray-600 hover:shadow-sm hover:shadow-black/30 border-2 border-gray-400/10 duration-300"
        >
          Sign In
        </Link>
      </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-6">
        {isError && (
          <div className="p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 text-sm">
            {error?.message || 'An unknown error occurred.'}
          </div>
        )}
        <div className="space-y-4 text-black">
          <div className="flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-gray-200 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-md focus-within:shadow-violet-200 transition-all duration-300 ease-in-out">
          <UserRoundPlus size={22} className="text-gray-700" />
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
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="border-2 border-gray-200 bg-gray-300 text-md font-semibold text-gray-600 hover:text-white px-10 py-2 rounded-xl hover:bg-gradient-to-br from-black via-black/80 to-black cursor-pointer duration-500 transition-all transform-gpu active:scale-95 hover:scale-102 flex items-center gap-2"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {/* <ArrowRight
              className={`h-4 w-4 transition-transform duration-300 ${
                isLoading ? '' : 'hover:translate-x-1'
              }`}
            /> */}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
