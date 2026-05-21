# 🚗 Car Rental Application

A full-stack car rental web application built with **React**, **Node.js/Express**, and **MongoDB**.

---

## 📋 Prerequisites

Before running this project, make sure you have the following installed on your system:

### 1. Node.js & npm
- **Download:** https://nodejs.org/
- **Recommended version:** Node.js v18 or higher
- **Verify installation:**
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB
- **Option A – Local installation:** https://www.mongodb.com/try/download/community
- **Option B – MongoDB Atlas (cloud, free tier):** https://www.mongodb.com/atlas
- **Verify local installation:**
  ```bash
  mongod --version
  ```

### 3. Git
- **Download:** https://git-scm.com/
- **Verify installation:**
  ```bash
  git --version
  ```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/car-rental-app.git
cd car-rental-app
```

---

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

#### Dependencies installed:
| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `mongoose` | MongoDB object modeling |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |
| `nodemon` | Auto-restart server on changes (dev) |

#### Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/car_rental
```

> 💡 If you're using **MongoDB Atlas**, replace `MONGO_URI` with your Atlas connection string.

#### Start the backend server:

```bash
npm run dev
```

The backend will run at: `http://localhost:5000`

---

### 3. Frontend Setup

Open a **new terminal**, navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

#### Dependencies installed:
| Package | Purpose |
|---|---|
| `react` | UI library |
| `react-dom` | React rendering |
| `axios` | HTTP requests to the backend |
| `react-toastify` | Toast notifications |
| `tailwindcss` | Utility-first CSS framework |

#### Start the frontend development server:

```bash
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## 🌐 Running the Full Application

You need **two terminals** running at the same time:

| Terminal | Command | URL |
|---|---|---|
| Terminal 1 (Backend) | `cd backend && npm run dev` | http://localhost:5000 |
| Terminal 2 (Frontend) | `cd frontend && npm run dev` | http://localhost:5173 |

Open your browser and go to **http://localhost:5173** to use the app.

---

## 📁 Project Structure

```
car-rental-app/
├── backend/
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── controllers/     # Route controllers
│   ├── .env             # Environment variables (create this manually)
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── pages/       # Page components
    │   └── main.jsx     # Entry point
    └── index.html
```

---

## ⚠️ Common Issues

**MongoDB connection error**
- Make sure MongoDB is running locally: `mongod`
- Or double-check your Atlas connection string in `.env`

**Port already in use**
- Change `PORT` in `.env` (backend) or update `vite.config.js` (frontend)

**CORS errors**
- Ensure the backend has `cors` configured and the frontend is pointing to the correct backend URL

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Toastify
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
