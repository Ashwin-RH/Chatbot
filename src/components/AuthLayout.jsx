import React from 'react';
import { motion } from 'framer-motion';
// import AnimatedSphere from './AnimatedSphere';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-gradient-to-r from-violet-300 via-pink-200 to-indigo-300 p-4 relative">

      {/* Branding Title */}
      <div className="absolute top-32 md:top-48 text-black text-3xl md:text-4xl font-semibold z-10 text-center w-full">
        C
        <span className="text-2xl md:text-3xl font-semibold">ONVO</span>
      </div>

      {/* Auth Card */}
      <div className="flex items-center justify-center w-[30rem] max-w-md sm:max-w-lg md:max-w-5xl h-auto md:h-[40vh] min-h-[320px] overflow-hidden bg-white rounded-2xl shadow-2xl shadow-black/40 relative z-20 p-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full max-w-sm p-4 md:p-6"
        >
          {children}
        </motion.div>

        {/* Optional 3D background / branding */}
        {/* 
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <AnimatedSphere />
        </div>
        */}
      </div>
    </div>
  );
};

export default AuthLayout;




{/* Left Side: 3D Animation and Branding */}
        {/* <div className="hidden md:flex flex-col justify-between p-12 bg-secondary/30">
          <div className="z-10">
            <img src="/logo.png" alt="Subspace Logo" className="w-32" />
            <h1 className="mt-8 text-4xl font-bold text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <div className="w-full h-full absolute top-0 left-0">
            <AnimatedSphere />
          </div>
        </div> */}