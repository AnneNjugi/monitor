# Deployment Checklist ✅

## Before You Start
- [ ] Code is committed to GitHub
- [ ] You have a GitHub account
- [ ] You have a Vercel account (vercel.com)
- [ ] You have a Render account (render.com)

---

## Backend Deployment (Render)

### Setup
- [ ] Go to render.com dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select "REAL-TIME MONITOR" repo

### Configuration
- [ ] Name: `kenya-forest-monitor-backend`
- [ ] Root Directory: `Backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free`

### Environment Variables (Copy from Backend/.env)
- [ ] PORT=5000
- [ ] MONGO_URI=mongodb+srv://...
- [ ] SENTINEL_HUB_CLIENT_ID=...
- [ ] SENTINEL_HUB_CLIENT_SECRET=...
- [ ] SENTINEL_HUB_INSTANCE_ID=...
- [ ] HUGGINGFACE_API_TOKEN=...

### Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Copy backend URL: `https://________.onrender.com`
- [ ] Test health endpoint: `https://your-url.onrender.com/api/images/health`

---

## Frontend Deployment (Vercel)

### Setup
- [ ] Go to vercel.com dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import GitHub repository
- [ ] Select "REAL-TIME MONITOR" repo

### Configuration
- [ ] Framework: `Vite`
- [ ] Root Directory: `Frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Environment Variable
- [ ] Add: `VITE_API_URL=https://your-backend.onrender.com`
  - ⚠️ Replace with YOUR actual Render backend URL!

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy frontend URL: `https://________.vercel.app`

---

## Testing

- [ ] Visit your Vercel URL
- [ ] Click on a region (e.g., Nairobi)
- [ ] Select a forest (e.g., Karura Forest)
- [ ] Choose before and after dates
- [ ] Click "Analyze Forest Degradation"
- [ ] Verify placeholder images appear
- [ ] Verify analysis results show

---

## Post-Deployment

- [ ] Share your live URL with others
- [ ] Monitor Render logs for errors
- [ ] Check Vercel analytics
- [ ] (Optional) Get real Sentinel Hub credentials
- [ ] (Optional) Set up custom domain

---

## URLs to Save

**Backend (Render)**: `https://________________.onrender.com`

**Frontend (Vercel)**: `https://________________.vercel.app`

**GitHub Repo**: `https://github.com/________________`

---

## Quick Commands

### Push to GitHub
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

### Test Backend Locally
```bash
cd Backend
npm start
```

### Test Frontend Locally
```bash
cd Frontend
npm run dev
```

---

## Need Help?

1. Check DEPLOYMENT_GUIDE.md for detailed instructions
2. Check Render logs: Dashboard → Service → Logs
3. Check Vercel logs: Dashboard → Project → Deployments → View Logs
4. Test backend health: `https://your-backend.onrender.com/api/images/health`

---

**Estimated Time**: 30 minutes total
- Backend: 15 minutes
- Frontend: 10 minutes  
- Testing: 5 minutes

Good luck! 🚀
