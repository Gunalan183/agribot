# 🚀 AgriBot Setup Guide

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux
- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB free space

### Recommended Specifications
- **RAM**: 8GB or more
- **Processor**: Dual-core 2.0GHz or faster
- **Internet**: Stable connection for development tools

## ⬇️ Installation Steps

### Step 1: Install Node.js

1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. Verify installation by opening terminal/command prompt:

```bash
node --version
npm --version
```

Both commands should return version numbers.

### Step 2: Project Setup

#### Option A: Clone Repository (if using Git)
```bash
git clone <repository-url>
cd AgriBot
```

#### Option B: Manual Setup
1. Create project folder: `AgriBot`
2. Create the following directory structure:
   ```
   AgriBot/
   ├── client/
   └── server/
   ```

### Step 3: Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Verify installation (should install ~110 packages):
```bash
ls node_modules/  # On Windows: dir node_modules\
```

### Step 4: Frontend Setup

1. Navigate to client directory:
```bash
cd ../client
```

2. Install dependencies:
```bash
npm install
```

3. Verify installation (should install ~100 packages)

### Step 5: Directory Structure Verification

Your project should look like this:
```
AgriBot/
├── client/
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   └── ...
├── server/
│   ├── node_modules/
│   ├── data/
│   ├── controllers/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── README.md
└── SETUP_GUIDE.md
```

## ▶️ Running the Application

### Method 1: Terminal Commands

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```
Expected output:
```
🌿 AgriBot Server is running on port 5000
📡 API Documentation: http://localhost:5000
🏥 Health Check: http://localhost:5000/api/health
```

**Terminal 2 - Start Frontend Server:**
```bash
cd client
npm run dev
```
Expected output:
```
VITE v6.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

### Method 2: Using Scripts (Windows)

Create `start.bat` in project root:
```batch
@echo off
start cmd /k "cd server && npm start"
timeout /t 3
start cmd /k "cd client && npm run dev"
```

### Method 3: Using Scripts (Linux/macOS)

Create `start.sh` in project root:
```bash
#!/bin/bash
cd server && npm start &
sleep 3
cd ../client && npm run dev
```

Make executable:
```bash
chmod +x start.sh
```

## 🔍 Troubleshooting Common Issues

### Issue 1: Port Already in Use
**Problem**: Port 3000 or 5000 is occupied
**Solution**: 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <process-id> /F

# macOS/Linux
lsof -i :3000
kill -9 <process-id>
```

### Issue 2: npm install fails
**Problem**: Permission errors or network issues
**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Use different registry
npm config set registry https://registry.npmjs.org/

# Install with verbose logging
npm install --verbose
```

### Issue 3: Missing dependencies
**Problem**: Modules not found errors
**Solution**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: 
- Ensure backend is running on port 5000
- Check Vite proxy configuration in `vite.config.js`
- Verify no firewall blocking connections

### Issue 5: Images not uploading
**Problem**: Disease prediction image upload fails
**Solution**:
- Check `server/uploads/` directory exists
- Verify file size < 5MB
- Ensure image format is JPG/PNG/WEBP

## 🧪 Testing the Installation

### Test 1: Backend API
```bash
curl http://localhost:5000/api/health
```
Should return:
```json
{
  "success": true,
  "message": "AgriBot API is running!",
  "timestamp": "...",
  "version": "1.0.0"
}
```

### Test 2: Frontend Access
Open browser and navigate to:
```
http://localhost:3000
```
Should display the AgriBot homepage.

### Test 3: Feature Testing
1. **Crop Recommendation**: Fill form and submit
2. **Chatbot**: Send a test message
3. **Disease Prediction**: Upload any image file

## 🔧 Development Environment Setup

### Recommended IDE/Editors
1. **Visual Studio Code** (Recommended)
   - Install extensions:
     - ES7+ React/Redux/React-Native snippets
     - Prettier - Code formatter
     - Auto Rename Tag
     - Bracket Pair Colorizer

2. **WebStorm** (Alternative)
3. **Atom** (Lightweight option)

### VS Code Configuration
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "prettier.requireConfig": true,
  "javascript.preferences.importModuleSpecifier": "relative",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 📊 Performance Optimization

### For Better Development Experience:
1. **Increase Node.js Memory Limit**:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"  # Linux/macOS
set NODE_OPTIONS=--max-old-space-size=4096        # Windows
```

2. **Enable Vite Cache**:
```bash
# Clear Vite cache if needed
rm -rf client/node_modules/.vite
```

3. **Monitor Resource Usage**:
- Keep Task Manager/System Monitor open
- Watch for memory consumption above 2GB

## 🔐 Security Considerations

### Development Security:
- Don't commit sensitive data to version control
- Use environment variables for configuration
- Regularly update dependencies:
```bash
npm audit
npm audit fix
```

## 🆘 Getting Help

### If you encounter issues:
1. Check the console logs in both terminals
2. Verify all installation steps were completed
3. Ensure correct directory structure
4. Confirm Node.js and npm versions meet requirements
5. Try clearing cache and reinstalling dependencies

### Support Resources:
- Node.js Documentation: https://nodejs.org/docs
- React Documentation: https://react.dev
- Express.js Documentation: https://expressjs.com
- Vite Documentation: https://vitejs.dev

---

**Happy Coding!** 🌱
**Questions? Check the main README.md for more details.**