# Hardware Tracker

🚀 [https://hardware-tracker-rho.vercel.app](https://hardware-tracker-rho.vercel.app)

A full-stack web app for tracking hardware components through development stages — built with React, Node.js, Express, and MongoDB.

## Why I Built This

Most hardware teams are still tracking component status in spreadsheets or sticky notes. This tool brings the same visibility that software teams get from tools like Jira or Linear to hardware development workflows — giving engineers a single source of truth for where every component is in the process, who touched it last, and what changed.

The activity log pattern means nothing gets lost. Every status change is recorded automatically, which matters when you're debugging a hardware failure and need to know exactly when a component moved from prototype to testing and who signed off on it.

## Flexible By Design

While built for hardware tracking, the architecture is intentionally generic. Swapping the status values from `prototype/testing/shipped` to `backlog/in-progress/done` turns this into a lightweight Scrum board. Change them to `procurement/deployed/decommissioned` and it becomes an IT asset tracker. The core pattern — items moving through stages with a full audit trail — applies to almost any workflow.

## Tech Stack
- **Frontend:** React, Vite, Axios, Tailwind CSS, shadcn/ui, Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Auth:** JWT + bcrypt + Google OAuth + GitHub OAuth (Passport.js)
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Features
- Add, update and delete hardware components
- Track status: Prototype → Testing → Shipped
- Automatic activity log on every status change
- CRM-style dashboard with donut chart and activity feed
- Sidebar navigation with live component count
- Full authentication — register, login, Google OAuth, GitHub OAuth
- Role-based access control — admins can create/update/delete, viewers can read
- Password hashing with bcrypt — credentials never stored in plain text
- Built with async-first architecture — easy to extend

## Authentication

### Register
`POST /api/auth/register`
```json
{
  "username": "yourname",
  "email": "you@email.com",
  "password": "yourpassword"
}
```

### Login
`POST /api/auth/login`
```json
{
  "email": "you@email.com",
  "password": "yourpassword"
}
```
Returns a JWT token. Add it as a **Bearer token** in the Authorization header for all protected routes.

### Google OAuth
Visit `https://hardware-tracker-api.onrender.com/api/auth/google` in your browser to sign in with Google. You'll be redirected back to the app with a token automatically.

### GitHub OAuth
Visit `https://hardware-tracker-api.onrender.com/api/auth/github` in your browser to sign in with GitHub. You'll be redirected back to the app with a token automatically.

## Role-Based Access

| Role | GET | POST | PATCH | DELETE |
|------|-----|------|-------|--------|
| Public | ✅ | ❌ | ❌ | ❌ |
| Viewer | ✅ | ❌ | ❌ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ |

New users default to `viewer`. Admin role must be assigned manually via the database.

## API Routes

| Method | Route | Auth Required | Role | Description |
|--------|-------|---------------|------|-------------|
| GET | /api/components | No | Any | Get all components |
| POST | /api/components | Yes | Admin | Create a component |
| PATCH | /api/components/:id | Yes | Admin | Update a component |
| DELETE | /api/components/:id | Yes | Admin | Delete a component |
| POST | /api/auth/register | No | - | Register a new user |
| POST | /api/auth/login | No | - | Login and get token |
| GET | /api/auth/google | No | - | Login with Google |
| GET | /api/auth/github | No | - | Login with GitHub |

## Getting Started
>For local development, follow the steps below. For production deployment, see the [Deployment](#deployment) section.

### Prerequisites
- Node.js
- MongoDB running locally OR MongoDB Atlas account

### Installation

1. Clone the repo
```
git clone https://github.com/nc313/hardware-tracker
```

2. Install server dependencies
```
cd server && npm install
```

3. Install client dependencies
```
cd ../client && npm install
```

4. Create a `.env` file in `/server` based on `.env.example`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
```

5. Run the server
```
cd server && npm run dev
```

6. Run the client
```
cd client && npm run dev
```

## Deployment

### Backend (Render)
1. Create a new Web Service on [render.com](https://render.com)
2. Connect your GitHub repo
3. Set Root Directory to `server`
4. Set Build Command to `npm install`
5. Set Start Command to `node index.js`
6. Add all environment variables from `.env.example`

### Frontend (Vercel)
1. Create a new project on [vercel.com](https://vercel.com)
2. Connect your GitHub repo
3. Set Root Directory to `client`
4. Set Framework Preset to `Vite`
5. Add environment variable `VITE_API_URL` pointing to your Render URL
6. Deploy

### Database (MongoDB Atlas)
1. Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Whitelist your Render server's IP (or use `0.0.0.0/0` for open access)
3. Copy the connection string into your `MONGO_URI` env variable

## How It Works (Non-Technical)

Hardware Tracker lets engineering teams log and track hardware components through their development lifecycle — from prototype to testing to shipped.

Every time a component's status changes, the app automatically logs who changed it and when, creating a full audit trail. Team members sign in securely with Google, GitHub, or by registering directly. Admins can make changes while viewers have read-only access.

## Demo Walkthrough

### Testing Role-Based Auth
1. Register a new user via `POST /api/auth/register` — defaults to viewer
2. Try to POST a component with that token — returns `403 Access denied`
3. Update user role to `admin` in the database
4. Login again to get a fresh token with admin role
5. POST a component with the new token — returns `201 success`

## What's Next
- Auth0 integration for enterprise-grade authentication
- Filter and search components by status
- Export activity logs for compliance reporting
- Role management UI — promote users to admin from the dashboard
- Email notifications on status changes