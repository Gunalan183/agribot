import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('enter');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('pulse');
    }, 500);

    const timer2 = setTimeout(() => {
      setAnimationPhase('exit');
    }, 2500);

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center farmer-gradient transition-opacity duration-500 ${
      animationPhase === 'exit' ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        {/* Animated Logo */}
        <div className={`mb-8 transition-all duration-1000 ${
          animationPhase === 'enter' ? 'scale-0 rotate-180 opacity-0' :
          animationPhase === 'pulse' ? 'scale-100 rotate-0 opacity-100' :
          'scale-110 rotate-0 opacity-100'
        }`}>
          <div className={`relative ${
            animationPhase === 'pulse' ? 'animate-pulse-slow' : ''
          }`}>
            <img 
              src="/agribot-logo.svg" 
              alt="AgriBot Logo" 
              className="w-32 h-32 mx-auto drop-shadow-2xl"
            />
            
            {/* Rotating Ring Animation */}
            <div className="absolute inset-0 border-4 border-transparent border-t-agri-accent rounded-full animate-spin-slow"></div>
            
            {/* Pulsing Glow Effect */}
            <div className="absolute inset-0 bg-agri-green rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Animated Text */}
        <div className={`transition-all duration-1000 delay-300 ${
          animationPhase === 'enter' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}>
          <h1 className="text-4xl lg:text-5xl font-bold text-agri-dark mb-4">
            🌱 AgriBot
          </h1>
          <p className="text-xl text-agri-green font-semibold mb-6">
            Your Smart Farming Partner
          </p>
          
          {/* Loading Animation */}
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-agri-green rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-agri-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-agri-light rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-gray-600 mt-4 animate-fade-in">
            Loading your farming assistant...
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 text-2xl animate-float">🌾</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float-delayed">🌱</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl animate-float-slow">🌿</div>
        <div className="absolute bottom-1/4 right-1/3 text-2xl animate-float-delayed-slow">🍃</div>
      </div>
    </div>
  );
};

export default LoadingScreen;