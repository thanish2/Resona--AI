# Resona--AI

Resona--AI is a sophisticated full-stack AI-powered platform designed to provide intelligent automation and content processing. Built with a modern **MERN** stack (MongoDB, Express, React, Node.js) and integrated with **Google Generative AI**, it offers a seamless experience for users looking to leverage AI for data extraction, document analysis, and automated workflows.

## 🚀 Features

- **Generative AI Integration**: Powered by Google's Gemini API for advanced natural language processing and content generation.
- **Automated Web Scraping**: Utilizes Puppeteer for high-fidelity data extraction from web sources.
- **Document Processing**: Intelligent PDF parsing capabilities to extract and analyze text from uploaded documents.
- **Secure Authentication**: Robust user management system using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Modern UI/UX**: A responsive and interactive frontend built with React 19, Tailwind CSS, and Framer Motion for smooth animations.
- **Type Safety**: Backend validation using Zod to ensure data integrity across the application.
- **Deployment Ready**: Pre-configured for seamless deployment on Vercel.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [SASS](https://sass-lang.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **AI Engine**: [Google Generative AI SDK](https://ai.google.dev/)
- **Automation**: [Puppeteer](https://pptr.dev/)
- **Validation**: [Zod](https://zod.dev/)

---

## 📋 Project Structure

```text
Resona--AI/
├── Backend/            # Node.js Express Server
│   ├── src/
│   │   ├── controllers/# Request handlers
│   │   ├── db/         # Database connection
│   │   ├── middlewares/# Auth and validation middlewares
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   ├── services/   # Business logic & AI services
│   │   └── app.js      # Express app configuration
│   ├── server.js       # Entry point
│   └── package.json
└── Frontend/           # React Vite Application
    ├── src/            # Components, pages, and logic
    ├── public/         # Static assets
    ├── index.html      # Entry HTML
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (local or Atlas)
- Google AI (Gemini) API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thanish2/Resona--AI.git
   cd Resona--AI
   ```

2. **Setup Backend**:
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **Setup Frontend**:
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

---

## 🏃 Running the Application

### Development Mode

**Start Backend**:
```bash
cd Backend
npm run dev
```

**Start Frontend**:
```bash
cd Frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🚢 Deployment

### Backend
The backend can be deployed to platforms like Render, Railway, or Heroku. Ensure all environment variables are configured in the platform's settings.

### Frontend
The frontend is optimized for **Vercel**.
- Connect your GitHub repository to Vercel.
- Set the `Root Directory` to `Frontend`.
- Add the necessary environment variables.
- Vercel will automatically handle the build and deployment.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**thanish2**
- GitHub: [@thanish2](https://github.com/thanish2)
- Project Link: [Resona--AI](https://github.com/thanish2/Resona--AI)
