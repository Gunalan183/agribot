const fs = require('fs');
const path = require('path');

// Load data from JSON files
const cropsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/crops.json'), 'utf8'));
const diseasesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/diseases.json'), 'utf8'));
const chatbotData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/chatbotResponses.json'), 'utf8'));

/**
 * Get crop recommendation based on farmer inputs
 * @param {Object} req - Request object containing soilType, season, temperature, rainfall
 * @param {Object} res - Response object
 */
exports.getCropRecommendation = (req, res) => {
    try {
        const { soilType, season, temperature, rainfall } = req.body;
        
        // Validate inputs
        if (!soilType || !season || !temperature || !rainfall) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required information: soil type, season, temperature, and rainfall"
            });
        }
        
        // Convert to numbers for comparison
        const temp = parseFloat(temperature);
        const rain = parseFloat(rainfall);
        
        // Filter crops based on conditions
        const recommendedCrops = cropsData.filter(crop => {
            return crop.soilType.toLowerCase() === soilType.toLowerCase() &&
                   crop.season.toLowerCase() === season.toLowerCase() &&
                   temp >= crop.temperatureMin && 
                   temp <= crop.temperatureMax &&
                   rain >= crop.rainfallMin && 
                   rain <= crop.rainfallMax;
        });
        
        if (recommendedCrops.length > 0) {
            // Return top 3 recommendations
            const topRecommendations = recommendedCrops.slice(0, 3).map(crop => ({
                name: crop.name,
                fertilizer: crop.fertilizer,
                description: crop.description,
                reason: `Matches your ${soilType} soil, ${season} season conditions (${temp}°C and ${rain}mm rainfall)`
            }));
            
            res.json({
                success: true,
                message: "Based on your farm conditions, here are the recommended crops:",
                recommendations: topRecommendations,
                additionalTips: [
                    "Consider soil testing for precise nutrient requirements",
                    "Consult local agricultural extension office for variety selection",
                    "Plan your planting schedule according to local weather forecasts"
                ]
            });
        } else {
            // No exact match found, provide alternatives
            res.json({
                success: true,
                message: "Exact match not found. Here are some alternative suggestions:",
                recommendations: [
                    {
                        name: "General vegetables (Tomato, Onion, Chili)",
                        fertilizer: "Balanced NPK fertilizer (15:15:15)",
                        description: "Adaptable to various soil conditions",
                        reason: "These crops are relatively tolerant to different conditions"
                    }
                ],
                additionalTips: [
                    "Consider improving soil conditions through organic matter addition",
                    "Try greenhouse cultivation for better climate control",
                    "Consult with local agricultural experts for region-specific advice"
                ]
            });
        }
    } catch (error) {
        console.error('Error in crop recommendation:', error);
        res.status(500).json({
            success: false,
            message: "Sorry, I encountered an error processing your request. Please try again."
        });
    }
};

/**
 * Mock disease prediction based on image analysis
 * @param {Object} req - Request object containing uploaded image
 * @param {Object} res - Response object
 */
exports.predictDisease = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a clear image of the affected plant part"
            });
        }
        
        // Mock image analysis - in real scenario, this would use ML model
        const fileName = req.file.originalname.toLowerCase();
        const fileSize = req.file.size;
        
        // Simple rule-based prediction logic
        let predictedDisease = null;
        let confidence = 0;
        
        // Mock analysis based on filename keywords and file size
        if (fileName.includes('leaf') || fileName.includes('spot')) {
            if (fileSize > 100000) { // Large file likely has clear symptoms
                predictedDisease = diseasesData.find(d => d.name === "Leaf Blight");
                confidence = 85;
            } else {
                predictedDisease = diseasesData.find(d => d.name === "Powdery Mildew");
                confidence = 70;
            }
        } else if (fileName.includes('rust') || fileName.includes('orange')) {
            predictedDisease = diseasesData.find(d => d.name === "Rust Disease");
            confidence = 80;
        } else if (fileName.includes('root') || fileName.includes('wilt')) {
            predictedDisease = diseasesData.find(d => d.name === "Root Rot");
            confidence = 75;
        } else {
            // Random selection for demonstration
            const randomIndex = Math.floor(Math.random() * diseasesData.length);
            predictedDisease = diseasesData[randomIndex];
            confidence = 60 + Math.floor(Math.random() * 20); // 60-80% confidence
        }
        
        if (predictedDisease) {
            res.json({
                success: true,
                message: `I've analyzed your image and identified a potential issue.`,
                prediction: {
                    diseaseName: predictedDisease.name,
                    confidence: `${confidence}%`,
                    symptoms: predictedDisease.symptoms,
                    treatment: predictedDisease.treatment,
                    prevention: predictedDisease.prevention
                },
                disclaimer: "⚠️ This is a simulated diagnosis. Please consult a local agricultural expert for confirmed diagnosis and treatment.",
                nextSteps: [
                    "Show this analysis to your local agricultural extension officer",
                    "Consider getting a professional soil and plant tissue test",
                    "Follow the treatment recommendations carefully"
                ]
            });
        } else {
            res.json({
                success: true,
                message: "I couldn't identify a specific disease from the image.",
                prediction: {
                    diseaseName: "Unknown Condition",
                    confidence: "Low",
                    symptoms: "Please provide a clearer image showing specific symptoms",
                    treatment: "Consult local agricultural expert for proper diagnosis",
                    prevention: "Maintain good farm hygiene and crop rotation practices"
                },
                disclaimer: "⚠️ Image quality may affect diagnosis accuracy. Please upload a clearer photo.",
                nextSteps: [
                    "Take a closer photo showing clear symptoms",
                    "Include a scale reference in the image",
                    "Capture images from multiple angles"
                ]
            });
        }
    } catch (error) {
        console.error('Error in disease prediction:', error);
        res.status(500).json({
            success: false,
            message: "Sorry, I encountered an error analyzing your image. Please try again."
        });
    }
};

/**
 * Chatbot response generation using keyword matching
 * @param {Object} req - Request object containing user message
 * @param {Object} res - Response object
 */
exports.getChatResponse = (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a message to get a response"
            });
        }
        
        const userMessage = message.toLowerCase().trim();
        
        // Intent detection based on keywords
        let intent = 'fallback';
        
        // Check for greetings
        if (chatbotData.greetings.keywords.some(keyword => userMessage.includes(keyword))) {
            intent = 'greetings';
        }
        // Check for crop-related queries
        else if (chatbotData.crop_advice.keywords.some(keyword => userMessage.includes(keyword))) {
            intent = 'crop_advice';
        }
        // Check for disease-related queries
        else if (chatbotData.disease_help.keywords.some(keyword => userMessage.includes(keyword))) {
            intent = 'disease_help';
        }
        // Check for weather/climate queries
        else if (chatbotData.weather.keywords.some(keyword => userMessage.includes(keyword))) {
            intent = 'weather';
        }
        // Check for fertilizer/nutrient queries
        else if (chatbotData.fertilizer.keywords.some(keyword => userMessage.includes(keyword))) {
            intent = 'fertilizer';
        }
        // Check for general agriculture terms
        else if (chatbotData.general_agriculture.keywords.some(keyword => userMessage.includes(keyword))) {
            intent = 'general_agriculture';
        }
        
        // Select random response from the matched intent
        const responses = chatbotData[intent].responses;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        res.json({
            success: true,
            message: randomResponse,
            intent: intent,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in chatbot response:', error);
        res.status(500).json({
            success: false,
            message: "Sorry, I'm having trouble responding right now. Please try again."
        });
    }
};