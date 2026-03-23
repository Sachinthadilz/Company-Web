# Digital Agency Web Platform

A comprehensive, full-stack web application designed for a digital agency. The platform includes a dynamic, high-performance public-facing website and a secure, feature-rich admin dashboard for complete content management.

## 🏗️ Architecture & Tech Stack

This repository is structured as a monorepo containing two main standalone applications: the React frontend and the Node.js backend API.

### 🎨 Frontend (`/frontend`)
The user interface and admin dashboard are built for speed, accessibility, and modern aesthetics.

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Vanilla CSS (for core design system)
- **Animations:** Framer Motion for premium micro-interactions and scroll reveals
- **Routing:** React Router DOM (v6)
- **State & Data Fetching:** React Hooks, native Fetch API
- **Rich Text Editing:** TipTap v2 (WYSIWYG editor for the blog)
- **Notifications:** React Hot Toast
- **SEO Elements:** React Helmet Async

### ⚙️ Backend (`/backend`)
A robust, secure, and highly scalable RESTful API powering the platform's data layer.

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs for password hashing
- **Media Storage:** Cloudinary integration for secure image uploads
- **Security:** Helmet.js, Express Rate Limit, strict CORS configurations
- **Emails:** Nodemailer setup for contact form deliveries

---

## 🚀 Getting Started

Follow these steps to get the platform running on your local machine.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Atlas or local)
- Cloudinary account (for image uploads)

### 1. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` root directory (use `.env.example` as a template if available) and configure your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

# Admin Authentication
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_SESSION_SECRET=a_very_long_random_secure_string
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security Settings
ALLOWED_ORIGINS=http://localhost:5173
SITE_URL=http://localhost:5173
```

Start the backend development server:
```bash
npm run dev
```
The API will run at `http://localhost:5000/api`.

### 2. Frontend Setup

In a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory with your API base URL:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```
The web app will run at `http://localhost:5173`.

---

## 🔐 Admin Dashboard

The platform includes a protected administrative area available at `/admin/login`. Once authenticated, administrators can manage:

- **Hero Images:** Upload and manage main homepage slider visuals
- **Services & Projects:** Full CRUD management
- **Careers/Jobs:** Post and edit open roles
- **Contacts/Messages:** Read inquiries submitted from the public contact form
- **Employee of the Month:** Highlight standout team members
- **Blog Manager:** Write and publish posts using the TipTap Rich Text editor
- **Testimonials:** Manage and publish client UI reviews featured on the homepage

*Note: The admin dashboard features an automatic inactivity timeout (2 hours) for enhanced security.*

---

## 🛡️ Security Features

- **Rate Limiting:** Protects sensitive endpoints (login, contact forms) against brute-force attacks.
- **Helmet Middleware:** Enforces secure HTTP headers (XSS filtering, HSTS, frame options).
- **CORS Lockdown:** Configured strictly via environment variables.
- **Password Hashes:** No plaintext backdoors; all auth keys are stored securely using bcrypt cost factor 10.

---

## 🧱 Key Scripts

**Backend:**
- `npm run dev`: Starts the TypeScript compiler and execution in watch mode.
- `npm run generate-password`: Utility script to quickly convert a plaintext string into a bcrypt hash for `.env` seating.
- `npm run build`: Compiles TypeScript to the `/dist` directory.
- `npm run start`: Runs the compiled Node output.

**Frontend:**
- `npm run dev`: Starts Vite hot-module-reloading server.
- `npm run build`: Compiles the React SPA for production.
- `npm run preview`: Locally serves the production build.

---

## 📝 License & Authorship

All rights reserved. Codebase and designs are proprietary.
