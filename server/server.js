const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import routes
const agriRoutes = require('./routes/agriRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api', agriRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: "🌱 Welcome to AgriBot API!",
        description: "Intelligent Chatbot for Farmers",
        version: "1.0.0",
        endpoints: {
            "Crop Recommendation": "POST /api/crop-recommendation",
            "Disease Prediction": "POST /api/disease-prediction",
            "Chatbot": "POST /api/chat",
            "Health Check": "GET /api/health"
        },
        documentation: "See API documentation for detailed usage"
    });
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
    // Don't serve React app for API routes
    if (req.path.startsWith('/api')) {
        return res.status(404).json({
            success: false,
            message: 'API route not found!'
        });
    }
    
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).json({
            success: false,
            message: 'React app not built. Please run npm run build first.'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    // Handle multer errors
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large! Maximum size is 5MB.'
            });
        }
    }
    
    // Handle other errors
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌿 AgriBot Server is running on port ${PORT}`);
    console.log(`📡 API Documentation: http://localhost:${PORT}`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;