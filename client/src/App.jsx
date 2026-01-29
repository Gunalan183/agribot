import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import CropRecommendation from './pages/CropRecommendation';
import DiseasePrediction from './pages/DiseasePrediction';
import About from './pages/About';

const App = () => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const translations = {
    en: {
      home: 'Home',
      chatbot: 'Chatbot',
      cropRec: 'Crop Recommendation',
      diseasePred: 'Disease Prediction',
      about: 'About',
      language: 'தமிழ்'
    },
    ta: {
      home: 'முகப்பு',
      chatbot: 'அரட்டை உதவி',
      cropRec: 'பயிர் பரிந்துரை',
      diseasePred: 'நோய் கண்டறிதல்',
      about: 'எங்களைப் பற்றி',
      language: 'English'
    }
  };

  const t = translations[language];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Header */}
        <header className="bg-agri-green text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-agri-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold">AgriBot</h1>
              </div>
              
              <nav className="flex flex-wrap items-center gap-2 md:gap-3">
                <Link to="/" className="nav-link">{t.home}</Link>
                <Link to="/chatbot" className="nav-link">{t.chatbot}</Link>
                <Link to="/crop-recommendation" className="nav-link">{t.cropRec}</Link>
                <Link to="/disease-prediction" className="nav-link">{t.diseasePred}</Link>
                <Link to="/about" className="nav-link">{t.about}</Link>
                
                <button 
                  onClick={toggleLanguage}
                  className="lang-toggle font-medium ml-2"
                >
                  {t.language}
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/chatbot" element={<Chatbot language={language} />} />
            <Route path="/crop-recommendation" element={<CropRecommendation language={language} />} />
            <Route path="/disease-prediction" element={<DiseasePrediction language={language} />} />
            <Route path="/about" element={<About language={language} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-agri-dark text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2">🌱 AgriBot - Intelligent Chatbot for Farmers</p>
            <p className="text-agri-light text-sm">Empowering farmers with AI-powered agricultural assistance</p>
            <div className="mt-4 flex justify-center space-x-6">
              <span>© 2024 Final Year Engineering Project</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;