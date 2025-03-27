# 🌐 Homepage Portfolio & Weather App

Welcome to my personal developer homepage! This project combines a portfolio display with a fully functional weather application — all served from a single backend via a DigitalOcean droplet.

## 📦 Project Overview

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Django + Gunicorn + Nginx
- **APIs Used**:
  - OpenWeatherMap (weather data)
  - Mapbox (map imagery)
  - Wikipedia (location summary)

## 🎯 Features

### 🧠 Homepage / Portfolio
- Displays personal projects (more coming soon!)
- Simple navigation with internal and external links
- Fully responsive and styled with TailwindCSS

### 🌦️ Weather App
- Fetches weather data from OpenWeatherMap
- Displays real-time map imagery via Mapbox
- Returns Wikipedia summary of the location
- Includes location autocomplete suggestions
- Clean UI with dropdown for location choices

---

## 🖥️ Running the Project

This repo documents the **frontend** part of the project. Both frontend and backend are deployed and served from a remote Linux server.

### ▶️ Start Frontend Locally

```bash
npm install
npm run dev
Make sure your .env file includes:

env
Copy code
VITE_API_URL=https://agomez.me/api/weather
🌍 API Endpoints (Handled by Django Backend)
Endpoint	Description
/api/weather/fetch/?location=...	Fetches weather + map + summary
/api/weather/location-suggestions/?query=...	Suggests location options
📁 Project Structure
bash
Copy code
homepage-frontend/
├── apps/
│   └── weather/
│       ├── WeatherApp.jsx
│       └── components/
├── components/
│   └── Header.jsx, Input.jsx, Button.jsx, etc.
├── assets/
├── App.jsx
├── main.jsx
├── .env
├── README.md
└── ...
🚀 Deployment
Both frontend and backend are deployed to a DigitalOcean droplet.

Nginx is configured to serve:

Frontend static files (/)

Backend API endpoints (/api/)

Gunicorn runs Django

Let's Encrypt provides SSL

🧠 Lessons & Notes
“It is working. It is online. It is mine.”

I started this as a small portfolio but it grew into a full-stack deployment.

The code is still evolving and will be improved with better structure and testing.

I’m keeping things monolithic for now to avoid overengineering.

Documentation will continue through Obsidian, GitHub, and maybe PDF.

📸 Screenshots
Add screenshots of the UI, weather card, dropdown suggestions, etc.

📜 License
MIT — feel free to fork or build upon it.