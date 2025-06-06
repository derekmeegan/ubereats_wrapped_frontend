# UberEats Wrapped

An AI-powered web application that analyzes your UberEats order history to provide personalized insights about your food delivery habits.

## Features

- **Secure Login Flow**: Users log in through a secure, encrypted browser session powered by Stagehand and Browserbase
- **Real-time Status Updates**: Automatic polling to track analysis progress
- **AI-Powered Analysis**: Deep insights into ordering patterns, spending habits, and food preferences
- **Email Delivery**: Results are delivered directly to your inbox
- **Modern UI**: Beautiful, responsive design with dark mode support

## How It Works

1. **Enter Email**: Users provide their email address to receive the analysis report
2. **Secure Authentication**: Login to UberEats through our secure iframe interface
3. **AI Analysis**: Our agent analyzes order history using advanced AI algorithms
4. **Email Results**: Detailed insights are emailed once analysis is complete

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend Integration**: RESTful API with real-time polling
- **Security**: Stagehand + Browserbase for secure browser automation
- **Styling**: Tailwind CSS with responsive design
- **Build Tool**: Vite

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ubereats_wrapped_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```
   VITE_API_ENDPOINT=your_api_endpoint_here
   VITE_API_KEY=your_api_key_here
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_ENDPOINT` | Backend API endpoint URL | Yes |
| `VITE_API_KEY` | API authentication key | Yes |

## API Integration

The frontend expects the following API endpoints:

### POST `/start-job`
Starts a new analysis job
```json
{
  "email": "user@example.com"
}
```

Returns:
```json
{
  "jobId": "uuid",
  "status": "pending"
}
```

### GET `/job-status/:jobId`
Polls job status

Returns:
```json
{
  "status": "starting" | "awaiting_login" | "extracting" | "completed" | "error",
  "liveViewUrl": "https://...", // Only when status is "needs_login"
  "message": "Optional status message"
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── EmailForm.tsx   # Email input form
│   ├── HowItWorks.tsx  # Landing page information
│   ├── LiveView.tsx    # Login iframe component
│   ├── LoadingSpinner.tsx
│   ├── ProcessingMessage.tsx
│   └── index.ts        # Component exports
├── hooks/
│   └── useJobPolling.ts # Status polling hook
├── services/
│   └── api.ts          # API service layer
├── types/
│   └── api.ts          # TypeScript interfaces
└── App.tsx             # Main application component
```

## Security & Privacy

- All authentication happens through secure, isolated browser sessions
- No credentials are stored or logged
- Data is processed temporarily and securely deleted after analysis
- Industry-standard encryption for all data transmission

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
