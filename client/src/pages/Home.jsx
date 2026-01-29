import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ language }) => {
  const translations = {
    en: {
      title: "Welcome to AgriBot",
      subtitle: "Your Intelligent Agricultural Assistant",
      description: "Empowering farmers with AI-powered solutions for crop recommendations, disease identification, and farming guidance.",
      features: [
        {
          title: "Crop Recommendation",
          description: "Get personalized crop suggestions based on your soil type, season, and climate conditions.",
          icon: "🌱"
        },
        {
          title: "Disease Prediction",
          description: "Identify plant diseases by uploading photos and receive immediate treatment recommendations.",
          icon: "🩺"
        },
        {
          title: "Smart Chatbot",
          description: "Ask farming questions and get instant, knowledgeable responses 24/7.",
          icon: "💬"
        }
      ],
      ctaButton: "Get Started",
      benefitsTitle: "Why Choose AgriBot?",
      benefits: [
        "Free to use for all farmers",
        "Works offline with static data",
        "Available in English and Tamil",
        "Scientifically backed recommendations",
        "Continuous learning and improvement"
      ]
    },
    ta: {
      title: "அக்ரிபாட்-க்கு வரவேற்கிறோம்",
      subtitle: "உங்கள் அறிவுறுத்தல் விவசாய உதவியாளர்",
      description: "பயிர் பரிந்துரைகள், நோய் அடையாளம் மற்றும் விவசாய வழிகாட்டுதலுக்கான AI-இயக்கும் தீர்வுகளுடன் விவசாயிகளை மேம்படுத்துதல்.",
      features: [
        {
          title: "பயிர் பரிந்துரை",
          description: "உங்கள் மண் வகை, பருவம் மற்றும் காலநிலை நிலைமைகளின் அடிப்படையில் தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
          icon: "🌱"
        },
        {
          title: "நோய் கண்டறிதல்",
          description: "புகைப்படங்களைப் பதிவேற்றி தாவர நோய்களை அடையாளம் காணுங்கள் மற்றும் உடனடி சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்.",
          icon: "🩺"
        },
        {
          title: "அறிவுறுத்தல் அரட்டை",
          description: "விவசாய கேள்விகளைக் கேட்டு 24/7 உடனடி, அறிவுடைய பதில்களைப் பெறுங்கள்.",
          icon: "💬"
        }
      ],
      ctaButton: "தொடங்குங்கள்",
      benefitsTitle: "ஏன் அக்ரிபாட்-ஐத் தேர்வு செய்ய வேண்டும்?",
      benefits: [
        "அனைத்து விவசாயிகளுக்கும் இலவசமாகப் பயன்படுத்தலாம்",
        "ஸ்டேடிக் தரவுடன் ஆஃப்லைனில் வேலை செய்கிறது",
        "ஆங்கிலம் மற்றும் தமிழில் கிடைக்கிறது",
        "அறிவியல் ரீதியாக ஆதரிக்கப்பட்ட பரிந்துரைகள்",
        "தொடர்ந்து கற்றல் மற்றும் மேம்பாடு"
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-agri-dark mb-4 leading-tight">
            {t.title}
          </h1>
          <h2 className="text-xl md:text-3xl text-agri-green mb-6 font-semibold">
            {t.subtitle}
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t.description}
          </p>
          <Link 
            to="/chatbot" 
            className="agri-button text-lg px-8 py-4 inline-block font-bold"
          >
            {t.ctaButton}
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {t.features.map((feature, index) => (
          <div key={index} className="agri-card text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="feature-icon mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-agri-dark mb-3">{feature.title}</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-4">{feature.description}</p>
            <Link 
              to={
                index === 0 ? '/crop-recommendation' : 
                index === 1 ? '/disease-prediction' : '/chatbot'
              }
              className="inline-block text-agri-green hover:text-agri-dark font-medium"
            >
              {language === 'en' ? 'Learn More →' : 'மேலும் அறிக →'}
            </Link>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-agri-dark mb-8">
          {t.benefitsTitle}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="text-agri-green text-xl mr-3">✓</div>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-agri-green rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">
          {language === 'en' 
            ? 'Ready to Transform Your Farming?' 
            : 'உங்கள் விவசாயத்தை மாற்ற தயாரா?' 
          }
        </h3>
        <p className="mb-6 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Join thousands of farmers who are already using AgriBot to improve their yields and make informed decisions.'
            : 'தங்களின் வருவாயை மேம்படுத்தவும், தகவலறிந்த முடிவுகளை எடுக்கவும் ஏற்கனவே அக்ரிபாட்-ஐப் பயன்படுத்தும் ஆயிரக்கணக்கான விவசாயிகளுடன் இணைங்கள்.'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/crop-recommendation" className="bg-white text-agri-green px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300">
            {language === 'en' ? 'Try Crop Recommendation' : 'பயிர் பரிந்துரையை முயற்சிக்கவும்'}
          </Link>
          <Link to="/disease-prediction" className="bg-agri-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition duration-300">
            {language === 'en' ? 'Diagnose Plant Issues' : 'தாவர சிக்கல்களை கண்டறியவும்'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;