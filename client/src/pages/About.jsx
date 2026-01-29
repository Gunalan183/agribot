import React from 'react';

const About = ({ language }) => {
  const translations = {
    en: {
      title: "About AgriBot",
      subtitle: "Your Intelligent Agricultural Companion",
      missionTitle: "Our Mission",
      mission: "To empower farmers with accessible, AI-driven agricultural solutions that improve crop yields and sustainable farming practices.",
      features: [
        {
          title: "Smart Crop Recommendations",
          description: "Get personalized crop suggestions based on your specific soil, climate, and seasonal conditions using rule-based algorithms.",
          icon: "🌱"
        },
        {
          title: "Disease Identification",
          description: "Quickly identify plant diseases through image analysis and receive immediate treatment recommendations.",
          icon: "🩺"
        },
        {
          title: "24/7 Chat Assistance",
          description: "Access farming knowledge anytime with our intelligent chatbot powered by keyword-based NLP systems.",
          icon: "💬"
        },
        {
          title: "Multi-language Support",
          description: "Available in both English and Tamil to serve diverse farming communities across different regions.",
          icon: "🌐"
        }
      ],
      techStack: {
        title: "Technology Stack",
        frontend: "Frontend: React, Vite, Tailwind CSS",
        backend: "Backend: Node.js, Express.js",
        data: "Data Storage: JSON files (No Database)",
        ai: "AI Simulation: Rule-based logic systems"
      },
      team: {
        title: "About the Project",
        description: "AgriBot is a final-year engineering project designed to demonstrate practical application of web development and artificial intelligence concepts in the agricultural domain.",
        goals: [
          "Demonstrate full-stack web development skills",
          "Implement rule-based AI systems for agricultural decision making",
          "Create user-friendly interfaces for farmers",
          "Showcase integration of frontend and backend technologies",
          "Provide educational value for agricultural technology"
        ]
      }
    },
    ta: {
      title: "அக்ரிபாட் பற்றி",
      subtitle: "உங்கள் அறிவுறுத்தல் விவசாய துணை",
      missionTitle: "எங்கள் பணி",
      mission: "பயிர் வருவாயை மேம்படுத்தும் மற்றும் நிலையான விவசாய நடைமுறைகளை மேம்படுத்தும் அணுகல், AI-இயக்கும் விவசாய தீர்வுகளுடன் விவசாயிகளை மேம்படுத்துவது.",
      features: [
        {
          title: "அறிவுறுத்தல் பயிர் பரிந்துரைகள்",
          description: "விதி-அடிப்படையிலான வழிமுறைகளைப் பயன்படுத்தி உங்கள் குறிப்பிட்ட மண், காலநிலை மற்றும் பருவ நிலைமைகளின் அடிப்படையில் தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
          icon: "🌱"
        },
        {
          title: "நோய் அடையாளம்",
          description: "பட பகுப்பாய்வு மூலம் தாவர நோய்களை விரைவாக அடையாளம் காணுங்கள் மற்றும் உடனடி சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்.",
          icon: "🩺"
        },
        {
          title: "24/7 அரட்டை உதவி",
          description: "முக்கியச்சொல்-அடிப்படையிலான NLP கணினிகளால் இயக்கப்படும் எங்கள் அறிவுறுத்தல் அரட்டையைப் பயன்படுத்தி எந்நேரமும் விவசாய அறிவை அணுகவும்.",
          icon: "💬"
        },
        {
          title: "பல மொழி ஆதரவு",
          description: "வெவ்வேறு பகுதிகளில் உள்ள வேறுபட்ட விவசாய சமூகங்களுக்கு சேவை செய்ய ஆங்கிலம் மற்றும் தமிழில் கிடைக்கிறது.",
          icon: "🌐"
        }
      ],
      techStack: {
        title: "தொழில்நுட்ப ஸ்டாக்",
        frontend: "முன்பக்கம்: React, Vite, Tailwind CSS",
        backend: "பின்பக்கம்: Node.js, Express.js",
        data: "தரவு சேமிப்பு: JSON கோப்புகள் (தரவுத்தளம் இல்லை)",
        ai: "AI சிமுலேஷன்: விதி-அடிப்படையிலான தர்க்க கணினிகள்"
      },
      team: {
        title: "திட்டம் பற்றி",
        description: "அக்ரிபாட் என்பது விவசாய டொமைனில் வலை மேம்பாடு மற்றும் செயற்கை அறிவு கருத்துக்களின் நடைமுறை பயன்பாட்டை வெளிப்படுத்தும் இறுதியாண்டு பொறியியல் திட்டமாகும்.",
        goals: [
          "முழு-ஸ்டாக் வலை மேம்பாட்டு திறன்களை வெளிப்படுத்துதல்",
          "விவசாய முடிவு எடுப்பதற்கான விதி-அடிப்படையிலான AI கணினிகளை செயல்படுத்துதல்",
          "விவசாயிகளுக்கான பயனர்-நட்பு இடைமுகங்களை உருவாக்குதல்",
          "முன்பக்கம் மற்றும் பின்பக்க தொழில்நுட்பங்களின் ஒருங்கிணைப்பை வெளிப்படுத்துதல்",
          "விவசாய தொழில்நுட்பத்திற்கு கல்வி மதிப்பை வழங்குதல்"
        ]
      }
    }
  };

  const t = translations[language];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-agri-dark mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600">{t.subtitle}</p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold text-agri-green mb-4">{t.missionTitle}</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">{t.mission}</p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-agri-dark mb-8">
          {language === 'en' ? 'Key Features' : 'முக்கிய அம்சங்கள்'}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {t.features.map((feature, index) => (
            <div key={index} className="agri-card hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-agri-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-agri-dark mb-8">{t.techStack.title}</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-agri-dark mb-2">Frontend</h3>
            <p className="text-gray-700">{t.techStack.frontend}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-agri-dark mb-2">Backend</h3>
            <p className="text-gray-700">{t.techStack.backend}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-agri-dark mb-2">Data</h3>
            <p className="text-gray-700">{t.techStack.data}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-agri-dark mb-2">AI</h3>
            <p className="text-gray-700">{t.techStack.ai}</p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-gradient-to-r from-agri-green to-agri-dark rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">{t.team.title}</h2>
        <p className="text-lg mb-8 text-center max-w-3xl mx-auto opacity-90">
          {t.team.description}
        </p>
        
        <h3 className="text-xl font-bold mb-4 text-center">
          {language === 'en' ? 'Learning Objectives:' : 'கற்றல் நோக்கங்கள்:'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {t.team.goals.map((goal, index) => (
            <div key={index} className="flex items-start">
              <div className="text-xl mr-3">✓</div>
              <p className="opacity-90">{goal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact/Disclaimer */}
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">
          {language === 'en' ? 'Important Disclaimer:' : 'முக்கியமான வெளிப்பாடு:'}
        </h3>
        <p className="text-yellow-700">
          {language === 'en' 
            ? 'AgriBot is designed as an educational project and demonstration tool. While it provides helpful agricultural guidance, it should not replace professional agricultural advice. Always consult with local agricultural experts and extension services for critical farming decisions.' 
            : 'அக்ரிபாட் ஒரு கல்வி திட்டம் மற்றும் வெளிப்பாட்டு கருவி என வடிவமைக்கப்பட்டுள்ளது. இது உதவிக்கூறும் விவசாய வழிகாட்டுதலை வழங்குகிறது, ஆனால் தொழில்முறை விவசாய ஆலோசனையை மாற்ற கூடாது. முக்கியமான விவசாய முடிவுகளுக்கு எப்போதும் உள்ளூர் விவசாய நிபுணர்கள் மற்றும் நீட்டிப்பு சேவைகளை நாடனும்.'
          }
        </p>
      </div>
    </div>
  );
};

export default About;