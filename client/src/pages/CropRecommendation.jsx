import React, { useState } from 'react';
import { getCropRecommendation } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ResultCard from '../components/ResultCard';

const CropRecommendation = ({ language }) => {
  const [formData, setFormData] = useState({
    soilType: '',
    season: '',
    temperature: '',
    rainfall: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translations = {
    en: {
      title: "Crop Recommendation",
      subtitle: "Find the perfect crops for your farm conditions",
      soilType: "Soil Type",
      season: "Growing Season",
      temperature: "Temperature (°C)",
      rainfall: "Annual Rainfall (mm)",
      submit: "Get Recommendations",
      reset: "Reset Form",
      soilTypes: {
        clay: "Clay Soil",
        loamy: "Loamy Soil",
        sandy: "Sandy Soil",
        red: "Red Soil",
        black: "Black Cotton Soil",
        alluvial: "Alluvial Soil"
      },
      seasons: {
        kharif: "Kharif (Monsoon)",
        rabi: "Rabi (Winter)",
        "year-round": "Year Round"
      }
    },
    ta: {
      title: "பயிர் பரிந்துரை",
      subtitle: "உங்கள் பண்ணை நிலைமைகளுக்கு சரியான பயிர்களைக் கண்டுபிடியுங்கள்",
      soilType: "மண் வகை",
      season: "வளர்ச்சி பருவம்",
      temperature: "வெப்பநிலை (°C)",
      rainfall: "ஆண்டு மழைப்பொழிவு (மிமீ)",
      submit: "பரிந்துரைகளைப் பெறுங்கள்",
      reset: "படிவத்தை மீட்டமை",
      soilTypes: {
        clay: "களிமண்",
        loamy: "லோமி மண்",
        sandy: "மணல் மண்",
        red: "சிவப்பு மண்",
        black: "கருப்பு பருத்தி மண்",
        alluvial: "அல்லுவியல் மண்"
      },
      seasons: {
        kharif: "கார் (மழை)",
        rabi: "ரபி (குளிர்காலம்)",
        "year-round": "ஆண்டு முழுவதும்"
      }
    }
  };

  const t = translations[language];

  const soilTypes = [
    { value: 'clay', label: t.soilTypes.clay },
    { value: 'loamy', label: t.soilTypes.loamy },
    { value: 'sandy', label: t.soilTypes.sandy },
    { value: 'red', label: t.soilTypes.red },
    { value: 'black', label: t.soilTypes.black },
    { value: 'alluvial', label: t.soilTypes.alluvial }
  ];

  const seasons = [
    { value: 'kharif', label: t.seasons.kharif },
    { value: 'rabi', label: t.seasons.rabi },
    { value: 'year-round', label: t.seasons['year-round'] }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.soilType || !formData.season || !formData.temperature || !formData.rainfall) {
      setError(language === 'en' ? 'Please fill in all fields' : 'அனைத்து புலங்களையும் நிரப்பவும்');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getCropRecommendation(formData);
      setResult(response);
    } catch (err) {
      setError(err.message || (language === 'en' ? 'Failed to get recommendations' : 'பரிந்துரைகளைப் பெற முடியவில்லை'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      soilType: '',
      season: '',
      temperature: '',
      rainfall: ''
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-agri-dark mb-4">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-agri-dark mb-6">
            {language === 'en' ? 'Enter Your Farm Details' : 'உங்கள் பண்ணை விவரங்களை உள்ளிடவும்'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="form-group">
              <label className="form-label">
                {t.soilType} *
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="agri-select"
                required
              >
                <option value="">
                  {language === 'en' ? 'Select soil type' : 'மண் வகையைத் தேர்ந்தெடுக்கவும்'}
                </option>
                {soilTypes.map(soil => (
                  <option key={soil.value} value={soil.value}>{soil.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.season} *
              </label>
              <select
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="agri-select"
                required
              >
                <option value="">
                  {language === 'en' ? 'Select growing season' : 'வளர்ச்சி பருவத்தைத் தேர்ந்தெடுக்கவும்'}
                </option>
                {seasons.map(season => (
                  <option key={season.value} value={season.value}>{season.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.temperature} *
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder={language === 'en' ? 'e.g., 25' : 'எ.கா., 25'}
                className="agri-input"
                min="-10"
                max="50"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.rainfall} *
              </label>
              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder={language === 'en' ? 'e.g., 800' : 'எ.கா., 800'}
                className="agri-input"
                min="0"
                max="5000"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="agri-button flex-1 disabled:opacity-50 text-lg py-4"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-spinner mr-3"></div>
                    {language === 'en' ? 'Analyzing...' : 'பகுப்பாய்வு செய்கிறது...'}
                  </span>
                ) : t.submit}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 border-3 border-agri-green text-agri-green rounded-xl font-semibold hover:bg-agri-green hover:text-white transition-all duration-300 text-lg"
              >
                {t.reset}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div>
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <LoadingSpinner message={language === 'en' ? "Finding the best crops for your farm..." : "உங்கள் பண்ணைக்கு சிறந்த பயிர்களைக் கண்டுபிடிக்கிறது..."} />
            </div>
          )}

          {error && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <ErrorMessage 
                message={error} 
                onRetry={handleSubmit}
              />
            </div>
          )}

          {result && (
            <ResultCard
              title={result.message}
              subtitle=""
              items={result.recommendations}
              type="crop"
            />
          )}

          {!loading && !error && !result && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-agri-green mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Ready to Get Started?' : 'தொடங்க தயாரா?'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Fill in your farm details to get personalized crop recommendations.' 
                  : 'தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெற உங்கள் பண்ணை விவரங்களை நிரப்பவும்.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          {language === 'en' ? '💡 How It Works:' : '💡 எவ்வாறு இது வேலை செய்கிறது:'}
        </h3>
        <ul className="text-blue-700 space-y-2">
          <li>• {language === 'en' ? 'Our system analyzes your soil type, climate, and seasonal conditions' : 'எங்கள் கணினி உங்கள் மண் வகை, காலநிலை மற்றும் பருவ நிலைமைகளை பகுப்பாய்வு செய்கிறது'}</li>
          <li>• {language === 'en' ? 'Matches your conditions with optimal crop requirements' : 'உங்கள் நிலைமைகளை சிறந்த பயிர் தேவைகளுடன் பொருத்துகிறது'}</li>
          <li>• {language === 'en' ? 'Provides scientifically-backed recommendations' : 'அறிவியல் ரீதியாக ஆதரிக்கப்பட்ட பரிந்துரைகளை வழங்குகிறது'}</li>
          <li>• {language === 'en' ? 'Includes fertilizer advice and growing tips' : 'உர ஆலோசனை மற்றும் வளர்ச்சி உதவிக்குறிப்புகள் சேர்க்கப்பட்டுள்ளன'}</li>
        </ul>
      </div>
    </div>
  );
};

export default CropRecommendation;