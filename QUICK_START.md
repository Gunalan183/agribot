# 🚀 Quick Start Guide - AgriBot

## 🎯 Getting Started in 5 Minutes

### Prerequisites Check
Make sure you have:
- Node.js v16+ installed
- Internet connection for downloading dependencies

### Quick Setup

1. **Open Terminal/Command Prompt**
2. **Navigate to project directory:**
```bash
cd AgriBot
```

3. **Start Backend Server (Terminal 1):**
```bash
cd server
npm start
```
✅ Server runs on `http://localhost:5000`

4. **Start Frontend (Terminal 2):**
```bash
cd client
npm run dev
```
✅ Frontend runs on `http://localhost:3004`

5. **Open Browser:**
Visit `http://localhost:3004` to use AgriBot!

## 🌟 Key Features to Try

### 1. **Crop Recommendation**
- Go to "Crop Recommendation" page
- Enter your farm details:
  - Soil Type: Clay/Loamy/Sandy/etc.
  - Season: Kharif/Rabi/Year-round
  - Temperature: 20-35°C
  - Rainfall: 500-2500mm
- Click "Get Recommendations"

### 2. **Disease Prediction**
- Go to "Disease Prediction" page
- Upload any image file (JPG/PNG)
- Click "Analyze Image"
- Get simulated disease diagnosis

### 3. **Chat Assistant**
- Go to "Chatbot" page
- Try sample questions:
  - "What crops grow well in clay soil?"
  - "My plant leaves have yellow spots"
  - "Best fertilizer for rice"

### 4. **Language Toggle**
- Click the language button in navigation
- Switch between English and Tamil

## 🔧 Troubleshooting

### Common Issues:

**Backend won't start:**
```bash
# Make sure you're in the server directory
cd server
# Check if port 5000 is free
npm start
```

**Frontend CSS issues:**
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**API connection errors:**
- Ensure backend is running on port 5000
- Check browser console for error messages
- Verify no firewall blocking localhost connections

## 📱 Mobile Testing

The app is responsive! Test on mobile:
1. Find your computer's IP address
2. Access `http://YOUR_IP:3004` from mobile device
3. Both devices must be on same network

## 🎓 Learning Points

This project demonstrates:
- ✅ Full-stack web development
- ✅ RESTful API design
- ✅ React component architecture
- ✅ Rule-based AI simulation
- ✅ Multilingual support
- ✅ Responsive UI design

## 📚 Next Steps

1. **Explore the codebase** - Check `/client/src` and `/server` folders
2. **Modify JSON data** - Edit crop/disease information in `/server/data`
3. **Customize UI** - Modify styles in `/client/src/index.css`
4. **Add features** - Extend functionality based on requirements

## ❓ Need Help?

- Check `README.md` for detailed documentation
- Review `SETUP_GUIDE.md` for installation help
- Look at console logs for error details

---

**Happy Farming!** 🌱🚜
**Built with ❤️ for Final Year Engineering Students**