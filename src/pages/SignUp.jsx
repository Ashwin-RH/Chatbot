import React, { useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Toaster, toast } from 'react-hot-toast';
import { MailCheck, Lock, UserRoundPlus } from 'lucide-react';

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
        <h2 className="text-3xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold">
          Create Account
        </h2>
        <p className="mt-2 text-gray-300/80 text-sm">
  Already have an account?{' '}
  <Link
    to="/sign-in"
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

        <div className="space-y-4">
          {/* Email input */}
          <div className="flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-transparent border border-gray-400 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-sm focus-within:shadow-violet-200 transition-all duration-300 ease-in-out">
            <UserRoundPlus size={22} className="text-blue-400" />
            <input
              type="email"
              placeholder="Email here.."
              className="montserrat-medium text-sm text-white w-full bg-transparent placeholder:text-sm placeholder-gray-100/70 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="flex items-center justify-center rounded-lg mb-4 p-2 gap-2 bg-transparent border border-gray-400 outline-2 outline-gray-300 focus-within:outline-gray-400/80 focus-within:shadow-sm focus-within:shadow-violet-200 transition-all duration-300 ease-in-out">
            <Lock size={22} className="text-blue-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="montserrat-medium text-sm text-white w-full bg-transparent placeholder:text-sm placeholder-gray-100/70 outline-none"
              placeholder="Your Password here.."
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="border-2 border-blue-500 bg-gray-900 text-md font-semibold text-blue-400 hover:text-white px-10 py-2 rounded-xl hover:bg-blue-500/80 active:scale-95 cursor-pointer duration-500 transition-all transform-gpu active:scale-95 hover:scale-102"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
