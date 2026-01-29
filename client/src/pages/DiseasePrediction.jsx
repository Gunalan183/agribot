import React, { useState, useRef } from 'react';
import { predictDisease } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ResultCard from '../components/ResultCard';

const DiseasePrediction = ({ language }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const translations = {
    en: {
      title: "Plant Disease Prediction",
      subtitle: "Upload a photo of affected plant parts for disease diagnosis",
      uploadText: "Drag & drop an image here, or click to browse",
      uploadButton: "Choose Image",
      analyzeButton: "Analyze Image",
      resetButton: "Reset",
      supportedFormats: "Supports JPG, PNG, WEBP (Max 5MB)",
      tips: [
        "Take a clear, well-lit photo",
        "Focus on the affected area",
        "Include a scale reference if possible",
        "Capture multiple angles if needed"
      ]
    },
    ta: {
      title: "தாவர நோய் கண்டறிதல்",
      subtitle: "நோயாளியான தாவர பாகங்களின் புகைப்படத்தைப் பதிவேற்றி நோய் கண்டறிதல்",
      uploadText: "இங்கே ஒரு படத்தை இழுத்து விடவும், அல்லது உலாவ கிளிக் செய்யவும்",
      uploadButton: "படத்தைத் தேர்ந்தெடு",
      analyzeButton: "படத்தை பகுப்பாய்வு செய்",
      resetButton: "மீட்டமை",
      supportedFormats: "JPG, PNG, WEBP ஆதரிக்கப்படுகிறது (அதிகபட்சம் 5MB)",
      tips: [
        "தெளிவான, நல்ல ஒளியில் புகைப்படம் எடுக்கவும்",
        "பாதிக்கப்பட்ட பகுதியில் கவனம் செலுத்தவும்",
        "முடிந்தால் அளவு குறிப்பைச் சேர்க்கவும்",
        "தேவைப்பட்டால் பல கோணங்களில் பிடிக்கவும்"
      ]
    }
  };

  const t = translations[language];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(language === 'en' ? 'Please select an image file' : 'ஒரு படக்கோப்பைத் தேர்ந்தெடுக்கவும்');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(language === 'en' ? 'File size exceeds 5MB limit' : 'கோப்பு அளவு 5MB வரம்பை மீறுகிறது');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setResult(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      document.getElementById('fileInput').files = e.dataTransfer.files;
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError(language === 'en' ? 'Please select an image first' : 'முதலில் ஒரு படத்தைத் தேர்ந்தெடுக்கவும்');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictDisease(selectedFile);
      setResult(response);
    } catch (err) {
      setError(err.message || (language === 'en' ? 'Failed to analyze image' : 'படத்தை பகுப்பாய்வு செய்ய முடியவில்லை'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-agri-dark mb-4">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-agri-dark mb-6">
            {language === 'en' ? 'Upload Plant Image' : 'தாவர படத்தைப் பதிவேற்றவும்'}
          </h2>
          
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-agri-green transition-colors duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-agri-green mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{t.uploadText}</p>
              <button
                type="button"
                className="agri-button"
              >
                {t.uploadButton}
              </button>
              <p className="text-sm text-gray-500 mt-4">{t.supportedFormats}</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
              </div>
              <p className="text-gray-600 mb-4">
                {language === 'en' ? 'Selected file:' : 'தேர்ந்தெடுக்கப்பட்ட கோப்பு:'} {selectedFile.name}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-agri-green hover:text-agri-dark font-medium"
              >
                {language === 'en' ? 'Choose Different Image' : 'வேறு படத்தைத் தேர்ந்தெடு'}
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFile && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="agri-button flex-1 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {language === 'en' ? 'Analyzing...' : 'பகுப்பாய்வு செய்கிறது...'}
                  </span>
                ) : t.analyzeButton}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-agri-green text-agri-green rounded-lg font-medium hover:bg-agri-green hover:text-white transition duration-300"
              >
                {t.resetButton}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <LoadingSpinner message={language === 'en' ? "Analyzing plant health..." : "தாவர சுகாதாரத்தை பகுப்பாய்வு செய்கிறது..."} />
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
            <div className="space-y-6">
              <ResultCard
                title={result.message}
                subtitle=""
                items={[result.prediction]}
                type="disease"
              />
              
              {result.nextSteps && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-3">
                    {language === 'en' ? 'Next Steps:' : 'அடுத்த படிகள்:'}
                  </h3>
                  <ul className="text-yellow-700 space-y-2">
                    {result.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  <strong>{result.disclaimer}</strong>
                </p>
              </div>
            </div>
          )}

          {!loading && !error && !result && !selectedFile && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-agri-green mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Ready to Diagnose?' : 'கண்டறிய தயாரா?'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Upload a clear photo of the affected plant part to get disease diagnosis.' 
                  : 'நோயாளியான தாவர பகுதியின் தெளிவான புகைப்படத்தைப் பதிவேற்றி நோய் கண்டறிதலைப் பெறுங்கள்.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          {language === 'en' ? '📸 Best Practices for Photo Submission:' : '📸 புகைப்பட சமர்ப்பிப்பிற்கான சிறந்த நடைமுறைகள்:'}
        </h3>
        <ul className="text-blue-700 space-y-2">
          {t.tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiseasePrediction;