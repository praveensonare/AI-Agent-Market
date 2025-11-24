# AI Agent Marketplace

A modern, responsive web application for connecting consumers with AI specialists. Built with React, TypeScript, and Tailwind CSS.

## Features

### Authentication
- **Login**: Email/password and Google OAuth integration
- **Sign Up**: Create new account with email/password or Google
- **Forgot Password**: One-time verification link for password reset
- **User Types**: Consumer and SME (Subject Matter Expert) roles

### Consumer Dashboard
- **AI Agent Discovery**: Browse all available AI agents
- **Advanced Filtering**:
  - Search by name or specialization
  - Filter by rating, location, cost, and specialization
  - Real-time filter results
- **Rich Agent Cards**: Display agent information including:
  - High-resolution profile images
  - Name and specialization
  - Location, hourly cost
  - Rating (out of 5 stars)
  - Number of requests served
  - Last knowledge base update date
- **Agent Details Popup**:
  - Detailed agent information
  - Specialization tags
  - Statistics grid
  - "Ask Me" button to start conversation

### Chat Interface
- **Real-time Messaging**: Chat with AI agents
- **File Upload**: Support for multiple file types:
  - PDFs
  - Images (JPG, PNG, GIF)
  - Documents (DOC, DOCX)
  - Text files (TXT)
  - CSV files
- **Auto-resizing Text Input**: Textarea grows with content
- **Rich Message Display**: Support for various content types
- **Conversation History**: Access past conversations

### Sidebar
- **Collapsible Design**: Toggle sidebar visibility
- **Conversation List**: View all active conversations
- **Unread Indicators**: Badge showing unread message count
- **User Profile Section**:
  - Profile picture and name
  - Wallet balance
  - Profile settings
  - Logout option

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions
- Modern, clean UI/UX

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons & Lucide React
- **Charts**: Chart.js with React wrapper
- **Animations**: Framer Motion
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-Agent-Market
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
AI-Agent-Market/
├── src/
│   ├── components/        # Reusable components
│   │   ├── AgentCard.tsx
│   │   ├── AgentPopup.tsx
│   │   └── Sidebar.tsx
│   ├── context/          # React Context for state management
│   │   └── AppContext.tsx
│   ├── data/             # Demo data and types
│   │   └── demoData.ts
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Dashboard.tsx
│   │   └── ChatInterface.tsx
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.js   # Tailwind CSS config
└── vite.config.ts       # Vite config
```

## Demo Accounts

For testing purposes, you can use any email/password combination. The app uses mock authentication.

**User Types:**
- Consumer: Browse and chat with AI agents
- SME: (Future feature) Provide AI agent services

## Features Implemented

✅ Responsive login page with Google OAuth option
✅ User signup with validation
✅ Forgot password flow with email verification
✅ User type selection (Consumer/SME)
✅ Rich consumer dashboard with agent cards
✅ Advanced filtering system
✅ Agent detail popup with smooth animations
✅ Collapsible sidebar with conversation history
✅ Chat interface with file upload
✅ Auto-resizing message input
✅ User profile section with wallet
✅ Responsive design for all screen sizes
✅ High-quality images from Unsplash
✅ Smooth animations and transitions

## Future Enhancements

- Backend API integration
- Real-time WebSocket chat
- Payment processing
- Video/audio call support
- Advanced analytics dashboard
- SME dashboard and features
- Multi-language support
- Dark mode

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
