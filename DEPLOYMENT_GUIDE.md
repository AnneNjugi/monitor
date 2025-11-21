# Kenya Forest Monitor - Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)

---

## Part 1: Deploy Backend to Render (15 minutes)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Create Render Web Service
1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository: `REAL-TIME MONITOR`

### Step 3: Configure Render Settings
- **Name**: `kenya-forest-monitor-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `Backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Step 4: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
SENTINEL_HUB_CLIENT_ID=your_sentinel_hub_client_id
SENTINEL_HUB_CLIENT_SECRET=your_sentinel_hub_client_secret
SENTINEL_HUB_INSTANCE_ID=your_sentinel_hub_instance_id
HUGGINGFACE_API_TOKEN=your_huggingface_token
```

**Note**: Copy these values from your `Backend/.env` file!

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://kenya-forest-monitor-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel (10 minutes)

### Step 1: Create Vercel Project
1. Go to https://vercel.com/
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Select your repository: `REAL-TIME MONITOR`

### Step 2: Configure Vercel Settings
- **Framework Preset**: `Vite`
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 3: Add Environment Variable
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

**IMPORTANT**: Replace `your-backend-url` with your actual Render backend URL from Part 1, Step 5!

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app will be live at `https://your-project.vercel.app`

---

## Part 3: Update Backend CORS (5 minutes)

After frontend is deployed, update your backend to allow requests from your Vercel domain:

1. Go to Render Dashboard → Your Backend Service
2. Go to **"Environment"** tab
3. Add new environment variable:
   ```
   FRONTEND_URL=https://your-project.vercel.app
   ```
4. Click **"Save Changes"**
5. Backend will automatically redeploy

---

## Testing Your Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Select a region (e.g., Nairobi)
3. Click on a forest (e.g., Karura Forest)
4. Select before and after dates
5. Click **"Analyze Forest Degradation"**
6. You should see placeholder images and analysis results

---

## Troubleshooting

### Backend Issues
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend Issues
- Check Vercel deployment logs
- Verify `VITE_API_URL` points to your Render backend
- Check browser console for errors (F12)

### CORS Errors
- Make sure backend `FRONTEND_URL` matches your Vercel domain exactly
- Include `https://` in the URL
- Redeploy backend after changing environment variables

---

## Next Steps (After Deployment)

1. **Get Real Satellite Images**:
   - Sign up at https://www.sentinel-hub.com/
   - Create OAuth credentials
   - Update `SENTINEL_HUB_CLIENT_ID` and `SENTINEL_HUB_CLIENT_SECRET` in Render

2. **Custom Domain** (Optional):
   - In Vercel: Settings → Domains → Add your domain
   - In Render: Settings → Custom Domain → Add your domain

3. **Monitor Performance**:
   - Render: Check logs and metrics
   - Vercel: Check Analytics tab

---

## Important Notes

- ✅ Free tier limits: Render (750 hours/month), Vercel (unlimited)
- ✅ Render services sleep after 15 minutes of inactivity (first request may be slow)
- ✅ MongoDB Atlas free tier: 512MB storage
- ✅ Keep your `.env` files secure - never commit them to GitHub!

---

## Support

If you encounter issues:
1. Check the logs in Render/Vercel dashboards
2. Verify all environment variables are correct
3. Test backend health: `https://your-backend.onrender.com/api/images/health`
4. Check browser console for frontend errors

Good luck with your deployment! 🚀
