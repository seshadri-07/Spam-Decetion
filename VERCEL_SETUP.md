# SpamShield - Vercel Deployment Guide

## 🚀 Complete Setup for Vercel

This guide will help you deploy your spam detection app on Vercel in **5 minutes**.

## 📋 Prerequisites

1. **Vercel Account** - Sign up free at https://vercel.com
2. **GitHub Account** - For connecting your repository
3. **Git Installed** - For version control

## 📁 Project Structure

```
spamshield/
├── pages/
│   ├── index.js                 # Main page
│   ├── api/
│   │   ├── predict.js           # Prediction API
│   │   └── model-stats.js       # Stats API
│   └── _document.js             # (optional)
├── styles/
│   └── Home.module.css          # Styling
├── public/
│   └── model.json               # (optional) Pre-trained model
├── next.config.js               # Next.js config
├── vercel.json                  # Vercel config
├── package.json                 # Dependencies
└── README.md                    # Documentation
```

## ⚙️ Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

## 🏗️ Step 2: Test Locally

Before deploying, test your app locally:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser. The app should work with the built-in sample model.

## 🔑 Step 3: Push to GitHub

1. Create a GitHub repository
2. Initialize git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/spamshield.git
   git push -u origin main
   ```

## 🌐 Step 4: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? (No)
# - Project name: spamshield
# - Framework: Next.js
# - Output directory: .next
```

### Option B: Using Vercel Web Interface

1. Go to https://vercel.com/import
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Click **Import**
5. Vercel will auto-detect Next.js and deploy!

### Option C: GitHub Integration (Recommended)

1. Go to https://vercel.com
2. Click **New Project**
3. Import your GitHub repository
4. Configure project settings (usually auto-detected)
5. Click **Deploy**

## ✅ Verification

After deployment:

1. Open your Vercel project URL
2. Test with a sample message like: "Congratulations you won!"
3. You should see: "Spam" with a 🚫 emoji

## 🎯 Features Available

- ✅ Real-time spam detection
- ✅ Confidence scores
- ✅ Model accuracy display
- ✅ Responsive design
- ✅ Mobile friendly
- ✅ Beautiful UI with animations

## 📊 API Endpoints

### POST `/api/predict`
Predict if a message is spam

**Request:**
```json
{
  "message": "Congratulations you won a prize!"
}
```

**Response:**
```json
{
  "message": "Congratulations you won a prize!",
  "is_spam": true,
  "confidence": 0.95,
  "label": "Spam",
  "emoji": "🚫"
}
```

### GET `/api/model-stats`
Get model statistics

**Response:**
```json
{
  "is_trained": true,
  "accuracy": 0.98
}
```

## 🔧 Environment Variables (Optional)

If you need environment variables:

1. Go to your Vercel project settings
2. Click **Environment Variables**
3. Add your variables
4. Redeploy

Example variables you might add:
```
API_KEY=your_api_key
MODEL_ACCURACY=0.98
```

## 🎨 Customization

### Change Colors

Edit `styles/Home.module.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change to your preferred colors */
```

### Change API Behavior

Edit `pages/api/predict.js` to customize prediction logic.

### Add Pre-trained Model

1. Convert your Python model to JSON format
2. Place `model.json` in `public/` folder
3. Update `pages/api/predict.js` to load it

## 📈 Performance Optimization

### Vercel Functions Optimization

- **Memory**: 3008 MB (default)
- **Timeout**: 60 seconds (default)
- **Cold starts**: ~100-500ms

To optimize:
1. Keep model size small (< 5MB)
2. Cache model in memory
3. Use fast algorithms (JavaScript instead of Python)

## 🚀 Advanced: Using Your Python Model

If you want to use your scikit-learn model on Vercel, you have two options:

### Option 1: Use Vercel Python Runtime (Recommended for ML)

1. Create `api/predict.py`:
   ```python
   from http.server import BaseHTTPRequestHandler
   from json import loads, dumps
   import pickle
   import nltk
   
   class handler(BaseHTTPRequestHandler):
       def do_POST(self):
           # Your prediction logic
           self.send_response(200)
           self.send_header('Content-type', 'application/json')
           self.end_headers()
           self.wfile.write(dumps({...}).encode())
   ```

2. Update `vercel.json`:
   ```json
   {
     "functions": {
       "api/**/*.py": {
         "runtime": "python3.9"
       }
     }
   }
   ```

### Option 2: Export Model to JavaScript (JavaScript Runtime)

See "Converting Your Model to JavaScript" section below.

## 🔄 Continuous Deployment

Once connected to GitHub, every push triggers automatic deployment:

```bash
# Make changes
git add .
git commit -m "Update features"
git push origin main

# Vercel automatically deploys!
```

## 📝 Monitoring & Logs

View your Vercel project logs:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Deployments** tab
4. View logs for each deployment

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Model not available" | Ensure model.json is in public/ folder or update predict.js |
| "Module not found" | Run `npm install` and redeploy |
| API returns 500 error | Check Vercel logs for error details |
| Slow response time | Model might be too large; optimize or use smaller model |
| CORS errors | Already handled in api/predict.js |

## 📊 Deployment Checklist

- [ ] All files in correct structure
- [ ] `package.json` has all dependencies
- [ ] Tested locally with `npm run dev`
- [ ] Pushed to GitHub
- [ ] Connected Vercel to GitHub
- [ ] Deployment successful
- [ ] API endpoints respond correctly
- [ ] UI loads and displays correctly
- [ ] Spam detection works

## 🎓 Learning Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel API Routes: https://vercel.com/docs/serverless-functions/introduction

## 💡 Next Steps

1. **Add More Features**:
   - User authentication
   - Save prediction history
   - Rate limiting
   - Analytics

2. **Improve Model**:
   - Use your full dataset
   - Deploy Python model using Vercel Python runtime
   - Implement model versioning

3. **Scale**:
   - Add database for storing predictions
   - Implement caching
   - Use CDN for static assets

## 🎉 You're All Set!

Your spam detection app is now live on Vercel! Share the URL with others to start detecting spam.

---

**Need Help?**
- Check Vercel docs: https://vercel.com/docs
- View deployment logs in Vercel dashboard
- Check GitHub issues or create new one

**Happy Deploying! 🛡️**
