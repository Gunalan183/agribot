import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import CropRecommendation from './pages/CropRecommendation';
import DiseasePrediction from './pages/DiseasePrediction';
import About from './pages/About';

const Navigation = ({ language, toggleLanguage, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: t.home, icon: '🏠' },
    { path: '/chatbot', label: t.chatbot, icon: '💬' },
    { path: '/crop-recommendation', label: t.cropRec, icon: '🌾' },
    { path: '/disease-prediction', label: t.diseasePred, icon: '🩺' },
    { path: '/about', label: t.about, icon: 'ℹ️' }
  ];

  return (
    <header className="farmer-header text-white shadow-farmer-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo and Brand - Compact */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <div className="bg-white rounded-full p-2 mr-3 shadow-farmer">
              <img 
                src="/agribot-logo.svg" 
                alt="AgriBot Logo" 
                className="w-6 h-6"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">🌱 AgriBot</h1>
              <p className="text-xs text-agri-light font-medium hidden sm:block">{t.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation - Compact */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-compact ${isActive(item.path) ? 'bg-white bg-opacity-20' : ''}`}
              >
                <span className="mr-1">{item.icon}</span>
                <span className="hidden xl:inline text-sm">{item.label}</span>
              </Link>
            ))}
            
            <button 
              onClick={toggleLanguage}
              className="lang-toggle-compact font-bold ml-3"
            >
              🌐 <span className="hidden xl:inline">{t.language}</span>
            </button>
          </nav>

          {/* Mobile Menu Button - Compact */}
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={toggleLanguage}
              className="bg-white text-agri-green px-2 py-1 rounded-lg font-bold text-xs"
            >
              🌐
            </button>
            
            <button
              onClick={toggleMenu}
              className="bg-white bg-opacity-20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Compact */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-3 border-t border-white border-opacity-20">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 text-white font-semibold ${
                    isActive(item.path) 
                      ? 'bg-white bg-opacity-20' 
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <span className="ml-auto text-agri-light">●</span>
                  )}
                </Link>
              ))}
              
              <button 
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                className="flex items-center px-3 py-3 rounded-lg transition-all duration-200 text-white font-semibold hover:bg-white hover:bg-opacity-10 mt-2 border-t border-white border-opacity-20"
              >
                <span className="mr-3 text-lg">🌐</span>
                <span>{language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const translations = {
    en: {
      home: 'Home',
      chatbot: 'Ask AgriBot',
      cropRec: 'Crop Guide',
      diseasePred: 'Plant Doctor',
      about: 'About Us',
      language: 'தமிழ்',
      tagline: 'Your Smart Farming Partner'
    },
    ta: {
      home: 'முகப்பு',
      chatbot: 'அக்ரிபாட்-ஐ கேளுங்கள்',
      cropRec: 'பயிர் வழிகாட்டி',
      diseasePred: 'தாவர மருத்துவர்',
      about: 'எங்களைப் பற்றி',
      language: 'English',
      tagline: 'உங்கள் அறிவுறுத்தல் விவசாய பங்காளி'
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <Router>
        <div className={`min-h-screen farmer-gradient transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          <Navigation 
            language={language} 
            toggleLanguage={toggleLanguage} 
            translations={translations} 
          />

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6 lg:py-8">
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/chatbot" element={<Chatbot language={language} />} />
              <Route path="/crop-recommendation" element={<CropRecommendation language={language} />} />
              <Route path="/disease-prediction" element={<DiseasePrediction language={language} />} />
              <Route path="/about" element={<About language={language} />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-agri-dark text-white py-12 mt-16">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src="/agribot-logo.svg" 
                      alt="AgriBot Logo" 
                      className="w-12 h-12 mr-3"
                    />
                    <h3 className="text-2xl font-bold">AgriBot</h3>
                  </div>
                  <p className="text-agri-light text-farmer-lg max-w-2xl mx-auto">
                    {language === 'en' 
                      ? 'Empowering farmers with AI-powered agricultural assistance for better yields and sustainable farming practices.'
                      : 'சிறந்த விளைச்சல் மற்றும் நிலையான விவசாய நடைமுறைகளுக்காக AI-இயக்கும் விவசாய உதவியுடன் விவசாயிகளை மேம்படுத்துதல்.'
                    }
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌾</div>
                    <h4 className="font-bold text-farmer-lg mb-2">
                      {language === 'en' ? 'Crop Guidance' : 'பயிர் வழிகாட்டுதல்'}
                    </h4>
                    <p className="text-agri-light">
                      {language === 'en' ? 'Smart recommendations' : 'அறிவுறுத்தல் பரிந்துரைகள்'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3">🩺</div>
                    <h4 className="font-bold text-farmer-lg mb-2">
                      {language === 'en' ? 'Plant Health' : 'தாவர சுகாதாரம்'}
                    </h4>
                    <p className="text-agri-light">
                      {language === 'en' ? 'Disease detection' : 'நோய் கண்டறிதல்'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3">💬</div>
                    <h4 className="font-bold text-farmer-lg mb-2">
                      {language === 'en' ? '24/7 Support' : '24/7 ஆதரவு'}
                    </h4>
                    <p className="text-agri-light">
                      {language === 'en' ? 'Always available' : 'எப்போதும் கிடைக்கும்'}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-agri-green pt-8">
                  <p className="text-agri-light">
                    © 2024 AgriBot - {language === 'en' ? 'Final Year Engineering Project' : 'இறுதி ஆண்டு பொறியியல் திட்டம்'}
                  </p>
                  <p className="text-sm text-agri-light mt-2">
                    {language === 'en' 
                      ? 'Made with ❤️ for farmers everywhere' 
                      : 'எல்லா இடங்களிலும் உள்ள விவசாயிகளுக்காக ❤️ உடன் செய்யப்பட்டது'
                    }
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </>
  );
};

export default App;