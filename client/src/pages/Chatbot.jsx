import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/api';
import ChatBubble from '../components/ChatBubble';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Chatbot = ({ language }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === 'en' 
        ? "Hello! I'm AgriBot, your farming assistant. How can I help you today? You can ask about crops, diseases, fertilizers, or any farming questions!" 
        : "வணக்கம்! நான் அக்ரிபாட், உங்கள் விவசாய உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? பயிர்கள், நோய்கள், உரங்கள் அல்லது எந்த விவசாய கேள்விகளையும் கேட்கலாம்!",
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const translations = {
    en: {
      title: "AgriBot Chat Assistant",
      placeholder: "Ask me anything about farming...",
      send: "Send",
      examples: "Try asking:",
      exampleQuestions: [
        "What crops grow well in clay soil?",
        "My plant leaves have yellow spots",
        "Best fertilizer for rice cultivation",
        "How to prevent crop diseases?"
      ]
    },
    ta: {
      title: "அக்ரிபாட் அரட்டை உதவியாளர்",
      placeholder: "விவசாயம் பற்றி என்னிடம் எதையும் கேளுங்கள்...",
      send: "அனுப்பு",
      examples: "இவற்றைக் கேட்க முயற்சிக்கவும்:",
      exampleQuestions: [
        "களிமண்ணில் எந்த பயிர்கள் நன்றாக வளரும்?",
        "எனது தாவர இலைகளில் மஞ்சள் புள்ளிகள் உள்ளன",
        "அரிசி பயிர்ச்சிக்கு சிறந்த உரம் எது?",
        "பயிர் நோய்களை எவ்வாறு தடுப்பது?"
      ]
    }
  };

  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await getChatResponse(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        text: response.message,
        isBot: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message || 'Failed to get response');
      const errorMessage = {
        id: messages.length + 2,
        text: language === 'en' 
          ? "Sorry, I'm having trouble responding right now. Please try again." 
          : "மன்னிக்கவும், இப்போது பதிலளிக்க எனக்கு சிரமம் ஏற்படுகிறது. மீண்டும் முயற்சிக்கவும்.",
        isBot: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-agri-dark mb-4">{t.title}</h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Get instant farming advice and answers to your agricultural questions' 
            : 'உங்கள் விவசாய கேள்விகளுக்கு உடனடி விவசாய ஆலோசனை மற்றும் பதில்களைப் பெறுங்கள்'
          }
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-6 bg-gray-50">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              text={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-3 max-w-xs">
                <LoadingSpinner message="" size="sm" />
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t.placeholder}
              className="agri-input flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="agri-button px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.send}
            </button>
          </div>
        </form>
      </div>

      {/* Quick Examples */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-agri-dark mb-4">{t.examples}</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {t.exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(question)}
              disabled={isLoading}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition duration-300 disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          {language === 'en' ? '💡 Pro Tips:' : '💡 சிறப்பு உதவிக்குறிப்புகள்:'}
        </h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• {language === 'en' ? 'Be specific about your location and conditions' : 'உங்கள் இடம் மற்றும் நிலைமைகளைப் பற்றி குறிப்பிடுங்கள்'}</li>
          <li>• {language === 'en' ? 'Include details like soil type, temperature, and rainfall' : 'மண் வகை, வெப்பநிலை மற்றும் மழைப்பொழிவு போன்ற விவரங்களைச் சேர்க்கவும்'}</li>
          <li>• {language === 'en' ? 'For disease identification, upload clear photos' : 'நோய் அடையாளம் காணும்போது, தெளிவான புகைப்படங்களைப் பதிவேற்றவும்'}</li>
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;