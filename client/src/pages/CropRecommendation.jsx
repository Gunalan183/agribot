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
      title: "🌾 Crop Recommendation",
      subtitle: "Find the perfect crops for your farm conditions",
      soilType: "What type of soil do you have?",
      season: "Which season are you planning for?",
      temperature: "Average temperature in your area (°C)",
      rainfall: "Annual rainfall in your area (mm)",
      submit: "🔍 Find Best Crops",
      reset: "🔄 Start Over",
      soilTypes: {
        clay: "🟤 Clay Soil (Heavy, holds water well)",
        loamy: "🟫 Loamy Soil (Best for most crops)",
        sandy: "🟨 Sandy Soil (Drains quickly)",
        red: "🔴 Red Soil (Good for cotton, sugarcane)",
        black: "⚫ Black Cotton Soil (Rich in nutrients)",
        alluvial: "🟩 Alluvial Soil (River deposited, fertile)"
      },
      seasons: {
        kharif: "🌧️ Kharif (Monsoon Season - June to October)",
        rabi: "❄️ Rabi (Winter Season - November to April)",
        "year-round": "🌞 Year Round (Any time)"
      },
      helpText: {
        soil: "Not sure about your soil type? Look at the color and feel the texture when wet.",
        season: "Choose based on when you want to plant your crops.",
        temperature: "Enter the average temperature during growing season.",
        rainfall: "Enter the total rainfall your area receives in a year."
      }
    },
    ta: {
      title: "🌾 பயிர் பரிந்துரை",
      subtitle: "உங்கள் பண்ணை நிலைமைகளுக்கு சரியான பயிர்களைக் கண்டுபிடியுங்கள்",
      soilType: "உங்களிடம் எந்த வகையான மண் உள்ளது?",
      season: "எந்த பருவத்திற்கு நீங்கள் திட்டமிடுகிறீர்கள்?",
      temperature: "உங்கள் பகுதியில் சராசரி வெப்பநிலை (°C)",
      rainfall: "உங்கள் பகுதியில் ஆண்டு மழைப்பொழிவு (மிமீ)",
      submit: "🔍 சிறந்த பயிர்களைக் கண்டுபிடியுங்கள்",
      reset: "🔄 மீண்டும் தொடங்குங்கள்",
      soilTypes: {
        clay: "🟤 களிமண் (கனமான, நீரை நன்றாக வைத்திருக்கும்)",
        loamy: "🟫 லோமி மண் (பெரும்பாலான பயிர்களுக்கு சிறந்தது)",
        sandy: "🟨 மணல் மண் (விரைவாக வடிகட்டும்)",
        red: "🔴 சிவப்பு மண் (பருத்தி, கரும்புக்கு நல்லது)",
        black: "⚫ கருப்பு பருத்தி மண் (ஊட்டச்சத்து நிறைந்தது)",
        alluvial: "🟩 அல்லுவியல் மண் (ஆற்று படிவு, வளமான)"
      },
      seasons: {
        kharif: "🌧️ கார் (மழைக்காலம் - ஜூன் முதல் அக்டோபர்)",
        rabi: "❄️ ரபி (குளிர்காலம் - நவம்பர் முதல் ஏப்ரல்)",
        "year-round": "🌞 ஆண்டு முழுவதும் (எந்த நேரத்திலும்)"
      },
      helpText: {
        soil: "உங்கள் மண் வகையைப் பற்றி உறுதியாக தெரியவில்லையா? நிறத்தைப் பார்த்து ஈரமாக இருக்கும்போது அமைப்பை உணருங்கள்.",
        season: "நீங்கள் எப்போது பயிர்களை நடவு செய்ய விரும்புகிறீர்கள் என்பதன் அடிப்படையில் தேர்வு செய்யுங்கள்.",
        temperature: "வளர்ச்சி பருவத்தில் சராசரி வெப்பநிலையை உள்ளிடவும்.",
        rainfall: "உங்கள் பகுதி ஒரு வருடத்தில் பெறும் மொத்த மழைப்பொழிவை உள்ளிடவும்."
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
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-agri-dark mb-6">{t.title}</h1>
        <p className="text-farmer-lg text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Form */}
        <div className="farmer-section">
          <div className="flex items-center mb-8">
            <div className="text-4xl mr-4">📝</div>
            <h2 className="text-2xl font-bold text-agri-dark">
              {language === 'en' ? 'Tell Us About Your Farm' : 'உங்கள் பண்ணையைப் பற்றி சொல்லுங்கள்'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="form-group">
              <label className="form-label flex items-center">
                <span className="mr-3">🌱</span>
                {t.soilType}
              </label>
              <p className="text-sm text-gray-600 mb-4">{t.helpText.soil}</p>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="agri-select"
                required
              >
                <option value="">
                  {language === 'en' ? 'Choose your soil type...' : 'உங்கள் மண் வகையைத் தேர்ந்தெடுக்கவும்...'}
                </option>
                {soilTypes.map(soil => (
                  <option key={soil.value} value={soil.value}>{soil.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label flex items-center">
                <span className="mr-3">📅</span>
                {t.season}
              </label>
              <p className="text-sm text-gray-600 mb-4">{t.helpText.season}</p>
              <select
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="agri-select"
                required
              >
                <option value="">
                  {language === 'en' ? 'Choose planting season...' : 'நடவு பருவத்தைத் தேர்ந்தெடுக்கவும்...'}
                </option>
                {seasons.map(season => (
                  <option key={season.value} value={season.value}>{season.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label flex items-center">
                <span className="mr-3">🌡️</span>
                {t.temperature}
              </label>
              <p className="text-sm text-gray-600 mb-4">{t.helpText.temperature}</p>
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
              <label className="form-label flex items-center">
                <span className="mr-3">🌧️</span>
                {t.rainfall}
              </label>
              <p className="text-sm text-gray-600 mb-4">{t.helpText.rainfall}</p>
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

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="agri-button flex-1 disabled:opacity-50 text-farmer-lg py-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-spinner mr-3"></div>
                    {language === 'en' ? 'Finding Best Crops...' : 'சிறந்த பயிர்களைக் கண்டுபிடிக்கிறது...'}
                  </span>
                ) : t.submit}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="agri-button-outline text-farmer-lg py-6 px-8"
              >
                {t.reset}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div>
          {loading && (
            <div className="farmer-section">
              <LoadingSpinner message={language === 'en' ? "Analyzing your farm conditions and finding the perfect crops..." : "உங்கள் பண்ணை நிலைமைகளை பகுப்பாய்வு செய்து சரியான பயிர்களைக் கண்டுபிடிக்கிறது..."} />
            </div>
          )}

          {error && (
            <div className="farmer-section">
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
            <div className="farmer-section text-center">
              <div className="text-6xl mb-6">🌾</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                {language === 'en' ? 'Ready to Find Your Perfect Crops?' : 'உங்கள் சரியான பயிர்களைக் கண்டுபிடிக்க தயாரா?'}
              </h3>
              <p className="text-farmer text-gray-600 mb-8">
                {language === 'en' 
                  ? 'Fill in your farm details on the left to get personalized crop recommendations based on scientific data and local conditions.' 
                  : 'அறிவியல் தரவு மற்றும் உள்ளூர் நிலைமைகளின் அடிப்படையில் தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெற இடதுபுறத்தில் உங்கள் பண்ணை விவரங்களை நிரப்பவும்.'
                }
              </p>
              <div className="bg-agri-cream p-6 rounded-2xl border-2 border-agri-light">
                <h4 className="font-bold text-agri-green mb-3 text-farmer-lg">
                  {language === 'en' ? '💡 Pro Tip:' : '💡 சிறப்பு உதவிக்குறிப்பு:'}
                </h4>
                <p className="text-gray-700 text-farmer">
                  {language === 'en' 
                    ? 'The more accurate your information, the better recommendations you\'ll get!'
                    : 'உங்கள் தகவல் எவ்வளவு துல்லியமாக இருக்கிறதோ, அவ்வளவு சிறந்த பரிந்துரைகளைப் பெறுவீர்கள்!'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-16 farmer-section bg-gradient-to-r from-blue-50 to-green-50">
        <h3 className="text-2xl font-bold text-agri-dark mb-8 text-center">
          {language === 'en' ? '🔬 How Our Recommendations Work' : '🔬 எங்கள் பரிந்துரைகள் எவ்வாறு செயல்படுகின்றன'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-farmer">
            <div className="text-3xl mb-4">🌱</div>
            <h4 className="font-bold text-agri-green mb-2">
              {language === 'en' ? 'Soil Analysis' : 'மண் பகுப்பாய்வு'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Match crops to your soil type' : 'உங்கள் மண் வகைக்கு பயிர்களைப் பொருத்துங்கள்'}
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-farmer">
            <div className="text-3xl mb-4">🌡️</div>
            <h4 className="font-bold text-agri-green mb-2">
              {language === 'en' ? 'Climate Check' : 'காலநிலை சரிபார்ப்பு'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Consider temperature & rainfall' : 'வெப்பநிலை மற்றும் மழைப்பொழிவைக் கருத்தில் கொள்ளுங்கள்'}
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-farmer">
            <div className="text-3xl mb-4">📊</div>
            <h4 className="font-bold text-agri-green mb-2">
              {language === 'en' ? 'Data Science' : 'தரவு அறிவியல்'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'AI-powered recommendations' : 'AI-இயக்கும் பரிந்துரைகள்'}
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-farmer">
            <div className="text-3xl mb-4">🎯</div>
            <h4 className="font-bold text-agri-green mb-2">
              {language === 'en' ? 'Best Results' : 'சிறந்த முடிவுகள்'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Maximize your yield potential' : 'உங்கள் விளைச்சல் திறனை அதிகரிக்கவும்'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;