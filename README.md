# Merxman AI Video Automation

## 🎯 Overview

Merxman AI Video Automation is a React-based web application that provides AI-powered video generation services for businesses. The platform enables customers to create professional marketing videos through an intuitive interface.

## ✨ Features

- **AI Video Generation**: Create videos using advanced AI technology
- **Multiple Video Styles**: Choose from different video styles (Corporate, Minimalist, Dynamic, etc.)
- **Flexible Duration Options**: Support for videos ranging from 5 seconds to 60 seconds
- **Pricing Tiers**: Multiple subscription plans from Starter to Enterprise
- **English UI**: Customer-facing content in English
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Modern, responsive design
- **API Integration**: RESTful API client

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/merxman-site/merxman-ai-video.git
cd merxman-ai-video
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── VideoForm.tsx      # Video creation form
│   ├── PricingDisplay.tsx # Pricing tiers display
│   └── VideoResult.tsx    # Video generation result
├── lib/
│   ├── api-client.ts      # API integration
│   └── supabase.ts        # Supabase configuration
├── styles/
│   └── index.css          # Global styles
├── types/
│   └── index.ts           # TypeScript definitions
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## 🔧 Environment Variables

The application requires the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_API_URL`: Backend API URL
- `RUNWAY_API_KEY`: Runway ML API key

## 📦 Deployment

This project is optimized for deployment on Vercel. Simply push to your GitHub repository and Vercel will automatically build and deploy.

## 🎨 Customization

- Video styles can be customized in `src/components/VideoForm.tsx`
- Pricing tiers can be modified in `src/components/PricingDisplay.tsx`
- Global styles are in `src/styles/index.css`

## 📝 License

This project is proprietary software owned by Merxman.

---

Built with ❤️ by Merxman Team