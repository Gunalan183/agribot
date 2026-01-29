# 🌱 AgriBot - Intelligent Chatbot for Farmers

A full-stack web application that provides AI-powered agricultural assistance to farmers through crop recommendations, disease identification, and intelligent chat support.

## 🎯 Project Overview

AgriBot is a final-year engineering project designed to demonstrate practical application of web development and artificial intelligence concepts in the agricultural domain. The application helps farmers make informed decisions about crop selection, disease management, and farming practices.

## 🚀 Features

### Core Features
- **Crop Recommendation Engine** - Get personalized crop suggestions based on soil type, season, temperature, and rainfall
- **Plant Disease Prediction** - Upload images of affected plants for disease diagnosis and treatment recommendations
- **Intelligent Chatbot** - 24/7 farming assistance with keyword-based NLP responses
- **Multi-language Support** - Available in English and Tamil
- **Responsive Design** - Mobile-friendly interface suitable for farmers

### Technical Features
- Rule-based AI simulation (no external ML models required)
- In-memory data storage using JSON files
- RESTful API architecture
- Clean, modular code structure
- Farmer-friendly UI/UX design

## 🛠️ Technology Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Axios** - Promise-based HTTP client

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Multer** - Middleware for handling multipart/form-data
- **JSON Files** - Data storage (no database required)

## 📁 Project Structure

```
AgriBot/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── pages/            # Application pages
│   │   │   ├── About.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── CropRecommendation.jsx
│   │   │   ├── DiseasePrediction.jsx
│   │   │   └── Home.jsx
│   │   ├── services/         # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                    # Node.js Backend
│   ├── controllers/          # Business logic
│   │   └── agriController.js
│   ├── data/                 # JSON data files
│   │   ├── chatbotResponses.json
│   │   ├── crops.json
│   │   └── diseases.json
│   ├── routes/               # API routes
│   │   └── agriRoutes.js
│   ├── uploads/              # Uploaded images (auto-created)
│   ├── package.json
│   └── server.js             # Main server file
│
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AgriBot
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Setup Frontend**
```bash
cd ../client
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:3000`

3. **Access the Application**
Open your browser and navigate to `http://localhost:3000`

## 📖 API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### 1. Health Check
```
GET /health
```
Returns API status and version information.

#### 2. Crop Recommendation
```
POST /crop-recommendation
```
**Request Body:**
```json
{
  "soilType": "clay|loamy|sandy|red|black|alluvial",
  "season": "kharif|rabi|year-round",
  "temperature": 25,
  "rainfall": 800
}
```

**Response:**
```json
{
  "success": true,
  "message": "Based on your farm conditions...",
  "recommendations": [
    {
      "name": "Rice",
      "fertilizer": "Nitrogen rich fertilizer...",
      "description": "Requires flooded fields...",
      "reason": "Matches your clay soil conditions..."
    }
  ],
  "additionalTips": [...]
}
```

#### 3. Disease Prediction
```
POST /disease-prediction
```
**Form Data:**
- `image` - Image file of affected plant part

**Response:**
```json
{
  "success": true,
  "message": "I've analyzed your image...",
  "prediction": {
    "diseaseName": "Leaf Blight",
    "confidence": "85%",
    "symptoms": "Yellow spots on leaves...",
    "treatment": "Apply copper oxychloride...",
    "prevention": "Crop rotation..."
  },
  "disclaimer": "⚠️ This is a simulated diagnosis...",
  "nextSteps": [...]
}
```

#### 4. Chatbot
```
POST /chat
```
**Request Body:**
```json
{
  "message": "What crops grow well in clay soil?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "I can help you choose the right crop...",
  "intent": "crop_advice",
  "timestamp": "2024-..."
}
```

## 🌾 Sample Usage Scenarios

### Scenario 1: Crop Recommendation
1. Navigate to "Crop Recommendation" page
2. Enter farm details:
   - Soil Type: Clay
   - Season: Kharif
   - Temperature: 28°C
   - Rainfall: 1200mm
3. Click "Get Recommendations"
4. Receive personalized crop suggestions

### Scenario 2: Disease Diagnosis
1. Navigate to "Disease Prediction" page
2. Upload a clear photo of affected plant leaves
3. Click "Analyze Image"
4. Get disease identification and treatment advice

### Scenario 3: Chat Assistance
1. Navigate to "Chatbot" page
2. Ask questions like:
   - "What fertilizer should I use for wheat?"
   - "How to prevent root rot?"
   - "Best crops for summer season?"

## 🎨 UI/UX Features

### Design Principles
- **Farmer-Centric Design** - Large buttons, clear typography
- **Green Theme** - Agriculture-inspired color palette
- **Responsive Layout** - Works on mobile and desktop
- **Multilingual** - English and Tamil support
- **Accessible** - Clear navigation and feedback

### Key Components
- **Navigation Bar** - Easy access to all features
- **Language Toggle** - Switch between English/Tamil
- **Loading States** - Visual feedback during operations
- **Error Handling** - Graceful error messages
- **Result Cards** - Structured information display

## 🔧 Development Guidelines

### Code Structure
- **Modular Components** - Reusable React components
- **Service Layer** - Centralized API calls
- **Controller Pattern** - Separated business logic
- **Consistent Naming** - Clear, descriptive names
- **Comments** - Well-documented code

### Best Practices Implemented
- Proper error handling
- Input validation
- Responsive design
- Performance optimization
- Security considerations

## 📝 Learning Outcomes

This project demonstrates:

1. **Full-Stack Development** - Integration of frontend and backend
2. **RESTful API Design** - Proper HTTP methods and status codes
3. **Rule-Based AI Systems** - Logic-based decision making
4. **User Experience Design** - Farmer-friendly interfaces
5. **Project Documentation** - Comprehensive technical documentation

## ⚠️ Important Disclaimer

AgriBot is designed as an educational project and demonstration tool. While it provides helpful agricultural guidance, it should not replace professional agricultural advice. Always consult with local agricultural experts and extension services for critical farming decisions.

## 🤝 Contributing

This is a student project for educational purposes. Feel free to fork and modify for learning purposes.

## 📄 License

This project is created for educational purposes as part of a final-year engineering curriculum.

---

**Developed as Final Year Engineering Project** 🎓
**Empowering Farmers Through Technology** 🌱