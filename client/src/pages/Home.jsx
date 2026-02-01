import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ language }) => {
  const translations = {
    en: {
      title: "Welcome to AgriBot",
      subtitle: "Your Smart Farming Assistant",
      description: "Get expert farming advice, crop recommendations, and plant disease diagnosis - all powered by AI technology designed specifically for farmers.",
      features: [
        {
          title: "🌾 Crop Recommendations",
          description: "Find the perfect crops for your soil, climate, and season. Get personalized suggestions based on your farm conditions.",
          icon: "🌾",
          color: "bg-green-50 border-green-200",
          link: "/crop-recommendation"
        },
        {
          title: "🩺 Plant Disease Detection",
          description: "Take a photo of sick plants and get instant diagnosis with treatment recommendations from our AI doctor.",
          icon: "🩺",
          color: "bg-red-50 border-red-200",
          link: "/disease-prediction"
        },
        {
          title: "💬 24/7 Farming Assistant",
          description: "Ask any farming question anytime. Get expert advice on crops, fertilizers, weather, and farming techniques.",
          icon: "💬",
          color: "bg-blue-50 border-blue-200",
          link: "/chatbot"
        }
      ],
      ctaButton: "Start Farming Smarter",
      benefitsTitle: "Why Farmers Choose AgriBot",
      benefits: [
        "🆓 Completely free for all farmers",
        "📱 Works on any phone or computer",
        "🌐 Available in English and Tamil",
        "🔬 Science-backed recommendations",
        "⚡ Instant answers, 24/7 availability",
        "📈 Helps increase crop yields"
      ],
      statsTitle: "Trusted by Farmers",
      stats: [
        { number: "1000+", label: "Farmers Helped" },
        { number: "50+", label: "Crop Types" },
        { number: "100+", label: "Disease Identified" },
        { number: "24/7", label: "Always Available" }
      ]
    },
    ta: {
      title: "அக்ரிபாட்-க்கு வரவேற்கிறோம்",
      subtitle: "உங்கள் அறிவுறுத்தல் விவசாய உதவியாளர்",
      description: "நிபுணர் விவசாய ஆலோசனை, பயிர் பரிந்துரைகள் மற்றும் தாவர நோய் கண்டறிதல் பெறுங்கள் - அனைத்தும் விவசாயிகளுக்காக வடிவமைக்கப்பட்ட AI தொழில்நுட்பத்தால் இயக்கப்படுகிறது.",
      features: [
        {
          title: "🌾 பயிர் பரிந்துரைகள்",
          description: "உங்கள் மண், காலநிலை மற்றும் பருவத்திற்கு சரியான பயிர்களைக் கண்டுபிடியுங்கள். உங்கள் பண்ணை நிலைமைகளின் அடிப்படையில் தனிப்பட்ட பரிந்துரைகளைப் பெறுங்கள்.",
          icon: "🌾",
          color: "bg-green-50 border-green-200",
          link: "/crop-recommendation"
        },
        {
          title: "🩺 தாவர நோய் கண்டறிதல்",
          description: "நோயுற்ற தாவரங்களின் புகைப்படம் எடுத்து, எங்கள் AI மருத்துவரிடமிருந்து சிகிச்சை பரிந்துரைகளுடன் உடனடி கண்டறிதலைப் பெறுங்கள்.",
          icon: "🩺",
          color: "bg-red-50 border-red-200",
          link: "/disease-prediction"
        },
        {
          title: "💬 24/7 விவசாய உதவியாளர்",
          description: "எந்த நேரத்திலும் எந்த விவசாய கேள்வியையும் கேளுங்கள். பயிர்கள், உரங்கள், வானிலை மற்றும் விவசாய நுட்பங்கள் பற்றிய நிபுணர் ஆலோசனையைப் பெறுங்கள்.",
          icon: "💬",
          color: "bg-blue-50 border-blue-200",
          link: "/chatbot"
        }
      ],
      ctaButton: "அறிவுறுத்தல் விவசாயம் தொடங்குங்கள்",
      benefitsTitle: "விவசாயிகள் ஏன் அக்ரிபாட்-ஐ தேர்வு செய்கிறார்கள்",
      benefits: [
        "🆓 அனைத்து விவசாயிகளுக்கும் முற்றிலும் இலவசம்",
        "📱 எந்த தொலைபேசி அல்லது கணினியிலும் வேலை செய்கிறது",
        "🌐 ஆங்கிலம் மற்றும் தமிழில் கிடைக்கிறது",
        "🔬 அறிவியல் ஆதரவு பரிந்துரைகள்",
        "⚡ உடனடி பதில்கள், 24/7 கிடைக்கும்",
        "📈 பயிர் விளைச்சலை அதிகரிக்க உதவுகிறது"
      ],
      statsTitle: "விவசாயிகளால் நம்பப்படுகிறது",
      stats: [
        { number: "1000+", label: "விவசாயிகளுக்கு உதவியது" },
        { number: "50+", label: "பயிர் வகைகள்" },
        { number: "100+", label: "நோய்கள் கண்டறியப்பட்டன" },
        { number: "24/7", label: "எப்போதும் கிடைக்கும்" }
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 mb-16">
        <div className="farmer-section max-w-5xl mx-auto">
          <div className="hero-icon mb-8">🌱</div>
          <h1 className="text-4xl md:text-6xl font-bold text-agri-dark mb-6 leading-tight">
            {t.title}
          </h1>
          <h2 className="text-2xl md:text-4xl text-agri-green mb-8 font-bold">
            {t.subtitle}
          </h2>
          <p className="text-farmer-lg md:text-farmer-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            {t.description}
          </p>
          <Link 
            to="/chatbot" 
            className="agri-button text-farmer-xl px-12 py-6 inline-block font-bold shadow-farmer-xl"
          >
            🚀 {t.ctaButton}
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {t.features.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.link}
            className={`farmer-section farmer-card-hover text-center ${feature.color} transition-all duration-300 transform hover:scale-105 cursor-pointer`}
          >
            <div className="feature-icon mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-agri-dark mb-4">{feature.title}</h3>
            <p className="text-gray-700 text-farmer leading-relaxed mb-6">{feature.description}</p>
            <div className="inline-flex items-center text-agri-green hover:text-agri-dark font-bold text-farmer-lg">
              {language === 'en' ? 'Try Now' : 'இப்போது முயற்சிக்கவும்'} 
              <span className="ml-2">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="farmer-section mb-20">
        <h2 className="text-3xl font-bold text-center text-agri-dark mb-12">
          {t.statsTitle}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-agri-green mb-2">
                {stat.number}
              </div>
              <p className="text-gray-700 font-semibold text-farmer">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="farmer-section mb-20">
        <h2 className="text-3xl font-bold text-center text-agri-dark mb-12">
          {t.benefitsTitle}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start p-4 bg-agri-cream rounded-2xl border-2 border-agri-light">
              <div className="text-2xl mr-4 flex-shrink-0">✓</div>
              <p className="text-gray-800 font-semibold text-farmer">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-agri-green to-agri-accent rounded-4xl p-12 text-white shadow-farmer-xl">
        <h3 className="text-3xl lg:text-4xl font-bold mb-6">
          {language === 'en' 
            ? '🚀 Ready to Transform Your Farming?' 
            : '🚀 உங்கள் விவசாயத்தை மாற்ற தயாரா?' 
          }
        </h3>
        <p className="mb-10 max-w-3xl mx-auto text-farmer-lg leading-relaxed">
          {language === 'en'
            ? 'Join thousands of farmers who are already using AgriBot to improve their yields, reduce costs, and make smarter farming decisions every day.'
            : 'தங்களின் விளைச்சலை மேம்படுத்தவும், செலவுகளைக் குறைக்கவும், ஒவ்வொரு நாளும் அறிவுறுத்தல் விவசாய முடிவுகளை எடுக்கவும் ஏற்கனவே அக்ரிபாட்-ஐப் பயன்படுத்தும் ஆயிரக்கணக்கான விவசாயிகளுடன் இணையுங்கள்.'
          }
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/crop-recommendation" className="agri-button-secondary text-farmer-lg px-8 py-5">
            🌾 {language === 'en' ? 'Find Best Crops' : 'சிறந்த பயிர்களைக் கண்டுபிடியுங்கள்'}
          </Link>
          <Link to="/disease-prediction" className="bg-white text-agri-green px-8 py-5 rounded-2xl font-bold hover:bg-gray-100 transition duration-300 text-farmer-lg shadow-farmer min-h-[64px] flex items-center">
            🩺 {language === 'en' ? 'Check Plant Health' : 'தாவர சுகாதாரத்தைச் சரிபார்க்கவும்'}
          </Link>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="mt-20 bg-agri-cream rounded-4xl p-10 border-2 border-agri-light">
        <h3 className="text-2xl font-bold text-agri-dark mb-8 text-center">
          {language === 'en' ? '💡 Quick Farming Tips' : '💡 விரைவு விவசாய உதவிக்குறிப்புகள்'}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-farmer">
            <h4 className="font-bold text-agri-green mb-3 text-farmer-lg">
              {language === 'en' ? '🌱 Best Planting Time' : '🌱 சிறந்த நடவு நேரம்'}
            </h4>
            <p className="text-gray-700 text-farmer">
              {language === 'en' 
                ? 'Plant crops according to your local season and weather patterns for maximum yield.'
                : 'அதிகபட்ச விளைச்சலுக்காக உங்கள் உள்ளூர் பருவம் மற்றும் வானிலை முறைகளின் படி பயிர்களை நடவு செய்யுங்கள்.'
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-farmer">
            <h4 className="font-bold text-agri-green mb-3 text-farmer-lg">
              {language === 'en' ? '💧 Water Management' : '💧 நீர் மேலாண்மை'}
            </h4>
            <p className="text-gray-700 text-farmer">
              {language === 'en' 
                ? 'Monitor soil moisture and water your crops at the right time to prevent diseases.'
                : 'மண்ணின் ஈரப்பதத்தைக் கண்காணித்து, நோய்களைத் தடுக்க சரியான நேரத்தில் உங்கள் பயிர்களுக்கு நீர் பாய்ச்சுங்கள்.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;