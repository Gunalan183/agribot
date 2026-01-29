import React from 'react';

/**
 * Loading spinner component for async operations
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message to display
 * @param {string} props.size - Size of spinner (sm, md, lg)
 */
const LoadingSpinner = ({ message = "Processing...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} border-4 border-agri-green border-t-transparent rounded-full animate-spin mb-4`}></div>
      <p className="text-agri-dark font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;