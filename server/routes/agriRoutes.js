const express = require('express');
const router = express.Router();
const { getCropRecommendation, predictDisease, getChatResponse } = require('../controllers/agriController');
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Crop Recommendation Route
/**
 * POST /api/crop-recommendation
 * Get crop recommendations based on farm conditions
 * 
 * Request Body:
 * {
 *   "soilType": "clay|loamy|sandy|red|black|alluvial",
 *   "season": "kharif|rabi|year-round",
 *   "temperature": "25", // in Celsius
 *   "rainfall": "800"    // in mm
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Based on your farm conditions...",
 *   "recommendations": [...],
 *   "additionalTips": [...]
 * }
 */
router.post('/crop-recommendation', getCropRecommendation);

// Disease Prediction Route
/**
 * POST /api/disease-prediction
 * Predict plant disease from uploaded image
 * 
 * Form Data:
 * image: File (image file)
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "I've analyzed your image...",
 *   "prediction": {
 *     "diseaseName": "Leaf Blight",
 *     "confidence": "85%",
 *     "symptoms": "...",
 *     "treatment": "...",
 *     "prevention": "..."
 *   }
 * }
 */
router.post('/disease-prediction', upload.single('image'), predictDisease);

// Chatbot Route
/**
 * POST /api/chat
 * Get chatbot response for user message
 * 
 * Request Body:
 * {
 *   "message": "What crops grow well in clay soil?"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "I can help you choose the right crop...",
 *   "intent": "crop_advice",
 *   "timestamp": "2024-..."
 * }
 */
router.post('/chat', getChatResponse);

// Health check route
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "AgriBot API is running!",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

module.exports = router;