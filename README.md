# 🌲 Kenya Forest Monitor

**Real-time satellite-based forest monitoring system for Kenya's forests - Free and accessible to everyone.**

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://forestmonitor.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org)

---

## 🌍 Live Demo

- **Frontend**: [https://forestmonitor.vercel.app](https://forestmonitor.vercel.app)
- **Backend API**: [https://monitor-ykgf.onrender.com](https://monitor-ykgf.onrender.com)
- **API Health**: [https://monitor-ykgf.onrender.com/api/images/health](https://monitor-ykgf.onrender.com/api/images/health)

---

## 📖 Project Overview

### The Problem

Kenya loses over **5,000 hectares of forest annually** due to deforestation, illegal logging, and land degradation. This threatens:
- 🌍 Climate stability (forests store 1.5 billion tons of carbon)
- 💧 Water security (20 million Kenyans depend on forest watersheds)
- 🦁 Biodiversity (habitat for endangered species)
- 👥 Community livelihoods (agriculture, tourism, resources)

Current monitoring methods are:
- ❌ Manual and time-consuming
- ❌ Expensive (requiring field visits)
- ❌ Infrequent (quarterly or annual checks)
- ❌ Reactive rather than proactive

### The Solution

**Kenya Forest Monitor** is a free, web-based platform that uses satellite imagery and AI to provide:
- ✅ Real-time forest monitoring
- ✅ Automated degradation detection
- ✅ Accessible to anyone with internet
- ✅ No technical expertise required
- ✅ Actionable insights and recommendations

---

## ✨ Features

### Core Functionality
- 🛰️ **Satellite Imagery Analysis** - Compare forest conditions across different time periods
- 🤖 **AI-Powered Detection** - Automated NDVI analysis for vegetation health
- 🗺️ **18 Kenyan Forests** - Pre-configured coverage of major forest reserves
- 📊 **Degradation Metrics** - Percentage loss, change detection maps, severity levels
- 🌍 **Regional Filtering** - Browse forests by region (Nairobi, Central, Rift Valley, etc.)
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 💬 **Contact System** - Users can report issues and provide feedback

### Technical Features
- ⚡ Real-time data processing
- 🔒 Rate limiting for API protection
- 📈 MongoDB database for data persistence
- 🎨 Modern UI with Tailwind CSS
- 🔄 Automatic deployment via Vercel & Render

---

## 🎯 UN Sustainable Development Goals Alignment

This project directly supports **7 UN SDGs**:

| SDG | Impact |
|-----|--------|
| **SDG 13: Climate Action** | Forests store carbon; monitoring prevents emissions |
| **SDG 15: Life on Land** | Protect ecosystems and halt biodiversity loss |
| **SDG 6: Clean Water** | Forests are water towers for millions |
| **SDG 2: Zero Hunger** | Forests support agriculture and food security |
| **SDG 11: Sustainable Cities** | Urban forests improve air quality |
| **SDG 17: Partnerships** | Free platform enables collaboration |
| **SDG 9: Innovation** | Technology for environmental monitoring |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **Lucide Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **Sentinel Hub API** - Satellite imagery
- **Hugging Face** - AI models

### DevOps
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control
- **Git** - Source control

---

## 📁 Project Structure

```
kenya-forest-monitor/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── Contact.js            # Contact form schema
│   ├── routes/
│   │   ├── images.js             # Satellite image endpoints
│   │   ├── analysis.js           # Forest analysis endpoints
│   │   └── contact.js            # Contact form endpoints
│   ├── services/
│   │   ├── sentinelHubService.js # Satellite data fetching
│   │   └── aiService.js          # AI analysis
│   ├── utils/
│   │   └── validation.js         # Input validation
│   ├── server.js                 # Express server
│   ├── package.json              # Dependencies
│   └── .env                      # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js            # API client
│   │   ├── App.jsx               # Main application
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # Entry point
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── vercel.json               # Vercel config
│   └── postcss.config.js         # PostCSS config
│
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account
- Sentinel Hub account (optional - uses placeholders by default)
- Hugging Face API token (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AnneNjugi/monitor.git
cd monitor
```

2. **Setup Backend**
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

Backend runs on `http://localhost:5000`

3. **Setup Frontend**
```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SENTINEL_HUB_CLIENT_ID=your_client_id
SENTINEL_HUB_CLIENT_SECRET=your_client_secret
SENTINEL_HUB_INSTANCE_ID=your_instance_id
HUGGINGFACE_API_TOKEN=your_hf_token
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Documentation

### Images Endpoints

**Get Forest List**
```http
GET /api/images/forests
```

**Get Satellite Image**
```http
GET /api/images/gibs?forest=Karura%20Forest&date=2020-06-04
```

**Health Check**
```http
GET /api/images/health
```

### Analysis Endpoints

**Compare Time Periods**
```http
POST /api/analysis/compare
Content-Type: application/json

{
  "forest": "Karura Forest",
  "beforeDate": "2019-10-29",
  "afterDate": "2020-11-01"
}
```

### Contact Endpoints

**Submit Contact Form**
```http
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Get All Messages** (Admin)
```http
GET /api/contact/messages
```

---

## 🌳 Supported Forests

The platform currently monitors **18 major Kenyan forests**:

1. Mau Forest Complex (400,000 ha)
2. Aberdare Forest (76,619 ha)
3. Kakamega Forest (23,000 ha)
4. Mount Kenya Forest (71,759 ha)
5. Arabuko-Sokoke Forest (41,600 ha)
6. Karura Forest (1,063 ha)
7. Ngong Hills (2,324 ha)
8. Chyulu Hills (47,100 ha)
9. Mount Elgon Forest (16,916 ha)
10. Shimba Hills (25,300 ha)
11. Ngare Ndare Forest (5,400 ha)
12. Loita Forest (33,000 ha)
13. Cherangani Hills Forest (112,000 ha)
14. Nandi Forests (20,000 ha)
15. Kereita Forest (3,500 ha)
16. Eburu Forest (3,600 ha)
17. Ololua Forest (140 ha)
18. Kaya Kinondo (30 ha)

**Total Coverage**: Over 2 million hectares

---

## 🚢 Deployment

### Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Configure:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy

### Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable: `VITE_API_URL=your_render_backend_url`
5. Deploy

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### For Developers
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 📖 Improve documentation
- 🧪 Write tests

### For Conservationists
- 📊 Provide feedback on analysis accuracy
- 🗺️ Suggest additional forests to monitor
- 📝 Share use cases and success stories
- 🎓 Help with educational content

### For Everyone
- ⭐ Star the repository
- 📢 Share with conservation networks
- 💬 Report issues
- 🌱 Use the platform and provide feedback

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ 18 Kenyan forests monitored
- ✅ Basic NDVI analysis
- ✅ Web platform deployed
- ✅ Contact form functionality

### Phase 2 (Next 3 months)
- [ ] Real-time alerts via email/SMS
- [ ] Historical trend analysis
- [ ] Export reports as PDF
- [ ] Multi-language support (Swahili, English)
- [ ] Mobile app (React Native)

### Phase 3 (Next 6 months)
- [ ] Expand to all 100+ Kenyan forests
- [ ] Predictive analytics (ML models)
- [ ] Community reporting features
- [ ] Integration with Kenya Forest Service
- [ ] API for third-party developers

### Phase 4 (Next 12 months)
- [ ] Regional expansion (Tanzania, Uganda, Rwanda)
- [ ] Drone imagery integration
- [ ] Carbon offset verification
- [ ] Blockchain for transparency
- [ ] Open-source the entire platform

---

## 📊 Impact Metrics

*As the platform grows, we'll track:*

- 🌲 Hectares monitored
- 👥 Active users
- 🚨 Alerts generated
- 🌍 Forests saved
- 💾 Data points collected
- 🤝 Partnerships formed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Why MIT?**
- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ Open source for maximum impact
- ✅ Encourages collaboration

---

## 👤 Author

**Anne Njugi**
- GitHub: [@AnneNjugi](https://github.com/AnneNjugi)
- Email: [wangarinjugi254@gmail.com]

---

## 📞 Contact & Support

### For General Inquiries
- Use the contact form on the website
- Email: [wangarinjugi254@gmail.com]

### For Technical Issues
- Open an issue on GitHub
- Check existing issues first

### For Partnerships
- Email: [wangarinjugi254@gmail.com]
- Include "Partnership" in subject line

---

## 🙏 Acknowledgments

### Technology Partners
- **Sentinel Hub** - Satellite imagery API
- **Hugging Face** - AI models
- **MongoDB Atlas** - Database hosting
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

### Data Sources
- **European Space Agency (ESA)** - Sentinel-2 satellite data
- **Kenya Forest Service** - Forest boundary data
- **UN Environment Programme** - Conservation guidelines

### Inspiration
- Kenya's commitment to 10% forest cover by 2030
- UN Sustainable Development Goals
- Global forest conservation movement
- Local communities protecting their forests

### Special Thanks
- Kenya Forest Service
- Conservation NGOs in Kenya
- Open source community
- Everyone who uses and supports this platform

---

## 📚 Resources

### Learn More About Kenya's Forests
- [Kenya Forest Service](https://www.kenyaforestservice.org/)
- [UN Environment Programme](https://www.unep.org/)
- [World Resources Institute](https://www.wri.org/)

### Technical Documentation
- [Sentinel Hub API](https://www.sentinel-hub.com/develop/api/)
- [NDVI Explained](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

### UN SDGs
- [SDG 13: Climate Action](https://sdgs.un.org/goals/goal13)
- [SDG 15: Life on Land](https://sdgs.un.org/goals/goal15)
- [All 17 SDGs](https://sdgs.un.org/goals)

---

## 🌟 Star History

If this project helps you or inspires you, please consider giving it a ⭐!

---

## 💚 Support the Project

This is a free, open-source project. You can support it by:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📢 Sharing with others
- 🤝 Contributing code
- 📝 Improving documentation
- 💬 Providing feedback

---

**Made with ❤️ for Kenya's forests and the planet**

*"The best time to plant a tree was 20 years ago. The second best time is now."*

---

## 📈 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/AnneNjugi/monitor)
![GitHub issues](https://img.shields.io/github/issues/AnneNjugi/monitor)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AnneNjugi/monitor)
![GitHub stars](https://img.shields.io/github/stars/AnneNjugi/monitor?style=social)

**Status**: 🟢 Active Development

Last Updated: November 2025
