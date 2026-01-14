# LineSync - Virtual Queuing Platform

A modern virtual queuing platform for local businesses to replace traditional paper lists and improve customer satisfaction.

## Features

### Customer Features
- 🔍 Browse nearby businesses with real-time queue information
- 📱 Zero-install - join queues via mobile browser (QR code scan)
- ⏱️ Live wait time tracking with AI-powered predictions
- 🔔 Smart SMS and browser notifications
- 📍 Location-based business discovery

### Merchant Features
- 📊 Real-time queue management dashboard
- 📈 Analytics (peak hours, average wait times, daily customers)
- 🎯 One-tap customer calling system
- 📱 QR code generation for customer entry
- 🔄 Queue position management

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Planned Backend**: Firebase/Firestore, Cloud Functions, Cloud Run
- **AI Integration**: Google Gemini AI (Flash) for wait time predictions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd LineSync
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Project Structure

```
LineSync/
├── App.jsx              # Main application component with all views
├── main.jsx             # React entry point
├── index.html           # HTML template
├── index.css            # Global styles with Tailwind
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Usage

### Three Main Views:

1. **Landing Page**: Introduction to LineSync with statistics and navigation
2. **Customer View**: Browse businesses, join queues, track position
3. **Merchant View**: Manage queues, view analytics, call customers

## Future Roadmap

- 🎁 Loyalty integration with off-peak rewards
- 🗓️ Multi-stop queue synchronization
- 🛒 In-line ordering capabilities
- 🎤 Voice integration with Google Assistant
- 📊 Advanced analytics and reporting
- 🌐 Multi-location support
- 🔐 Enhanced authentication system

## Case Studies (from original hackathon project)

- **The Weekend Bakery**: 30% revenue increase
- **Modern Barber Shop**: 50% reduction in perceived wait time
- **Community Pharmacy**: Increased retail attachment

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

University Hackathon Project 2024

## Contributing

This is a hackathon project. Feel free to fork and modify for your own use!
