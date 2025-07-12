import React from 'react';

const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-zinc-400">{message}</p>
    </div>
  </div>
);

export default LoadingScreen; 