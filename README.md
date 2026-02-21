# Smart Task Manager

A modern, full-stack task management application with AI-powered features, built with React, Vite, Node.js, and Express. Create, organize, and manage your tasks efficiently with intelligent AI assistance.

## Features

- 🤖 **AI-Powered Task Generation**: Get intelligent task suggestions and goal recommendations
- 📝 **Task Management**: Create, update, and organize tasks with ease
- 🎯 **Goal Planning**: Generate and manage goals with AI assistance
- 👤 **User Authentication**: Secure registration and login system
- 💬 **Real-time Updates**: Instant task updates across the application
- 🎨 **Responsive Design**: Clean, modern UI optimized for all devices
- 🌙 **Modern UI**: Built with Tailwind CSS for beautiful styling
- 📊 **Dashboard**: Comprehensive overview of all your tasks
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development

## Tech Stack

### Frontend

- **React 19.2** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **axios** - HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens

### AI Integration

- Google Generative AI (Gemini)
- Advanced LLM capabilities for task generation and goal planning

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)
- Google Generative AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd smart-task-manager
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-task-manager
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
NODE_ENV=development
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Usage

### Start Backend Server

```bash
cd backend
npm run dev
```

Server runs on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Opens the app at `http://localhost:5173`

### Build for Production

Frontend:

```bash
npm run build
```

Backend:

```bash
npm start
```

### Lint Code

Frontend:

```bash
npm run lint
```

## Project Structure

```
smart-task-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Authentication logic
│   │   │   ├── task.controller.js # Task management logic
│   │   │   └── ai.controller.js   # AI features logic
│   │   ├── models/
│   │   │   ├── user.model.js      # User schema
│   │   │   └── task.model.js      # Task schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js     # Auth endpoints
│   │   │   ├── task.routes.js     # Task endpoints
│   │   │   └── ai.routes.js       # AI endpoints
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js # JWT verification
│   │   ├── utils/
│   │   │   └── aiClient.js        # AI service integration
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskCard.jsx       # Individual task display
│   │   │   ├── TaskForm.jsx       # Task creation/editing
│   │   │   ├── TaskList.jsx       # Task list container
│   │   │   ├── GoalGenerator.jsx  # AI-powered goal generation
│   │   │   └── ProtectedRoute.jsx # Authentication wrapper
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   └── Dashboard.jsx      # Main dashboard
│   │   ├── services/
│   │   │   ├── authApi.js         # Auth API calls
│   │   │   ├── taskApi.js         # Task API calls
│   │   │   └── aiApi.js           # AI API calls
│   │   ├── hooks/
│   │   │   ├── useTaskManager.js  # Task management hook
│   │   │   └── useAI.js           # AI features hook
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   ├── App.css                # App styles
│   │   └── index.css              # Global styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### AI Features

- `POST /api/ai/generate-goals` - Generate goal suggestions
- `POST /api/ai/task-suggestions` - Get task suggestions
- `POST /api/ai/optimize-task` - Get AI task optimization

## Key Features Explained

### User Authentication

Secure JWT-based authentication system. Users must register and login to access their tasks.

### Task Management

- Create tasks with title, description, and due date
- Mark tasks as complete or incomplete
- Update task details
- Delete tasks
- Sort and filter tasks

### AI-Powered Features

- **Goal Generator**: Get intelligent suggestions for achievable goals
- **Task Suggestions**: AI recommends tasks based on your goals
- **Smart Organization**: AI helps optimize your task structure

### Dashboard

- Overview of all tasks
- Task statistics and progress
- Quick task creation
- AI feature access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vite.dev/)
- Backend powered by [Express.js](https://expressjs.com/) and [Node.js](https://nodejs.org/)
- Database by [MongoDB](https://www.mongodb.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by [Google Generative AI](https://ai.google.dev/)
- Authentication with [JWT](https://jwt.io/)

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

Made with ❤️ for efficient task management
