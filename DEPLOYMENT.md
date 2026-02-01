# AgriBot Deployment Guide

## Deploy to Render

### Option 1: Using Render Dashboard (Recommended)

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or login with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/Gunalan183/agribot.git`
   - Choose the repository from the list

3. **Configure Deployment Settings**
   - **Name**: `agribot` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `master`
   - **Build Command**: `npm install && npm run install-server && npm run install-client && npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables**
   - `NODE_ENV`: `production`
   - `PORT`: (automatically set by Render)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the build and deployment to complete (5-10 minutes)

### Option 2: Using render.yaml (Infrastructure as Code)

1. The `render.yaml` file is already configured in the repository
2. In Render dashboard, go to "Blueprint" → "New Blueprint Instance"
3. Connect your GitHub repository
4. Render will automatically use the `render.yaml` configuration

### Post-Deployment

1. **Access Your App**
   - Your app will be available at: `https://your-app-name.onrender.com`
   - API endpoints will be at: `https://your-app-name.onrender.com/api/`

2. **Test the Deployment**
   - Visit the main URL to see the React app
   - Test API health: `https://your-app-name.onrender.com/api/health`

### Important Notes

- **Free Tier Limitations**: Render free tier spins down after 15 minutes of inactivity
- **Cold Starts**: First request after inactivity may take 30-60 seconds
- **File Uploads**: Uploaded images are stored temporarily and will be lost on service restart
- **Build Time**: Initial deployment takes 5-10 minutes

### Troubleshooting

1. **Build Fails**: Check the build logs in Render dashboard
2. **App Won't Start**: Verify the start command and port configuration
3. **API Not Working**: Check that all API routes start with `/api/`
4. **React Routes 404**: The catch-all route should handle client-side routing

### Monitoring

- Use Render dashboard to monitor:
  - Service health
  - Build logs
  - Runtime logs
  - Performance metrics

## Local Development

```bash
# Install dependencies
npm install
npm run install-server
npm run install-client

# Run development servers
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

For production deployment, you may want to add:

- `NODE_ENV=production`
- `PORT` (automatically set by Render)
- Any API keys for external services (if added later)