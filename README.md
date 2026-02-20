# Hardware Tracker

A full-stack web app for tracking hardware components through development stages — built with React, Node.js, Express, and MongoDB.

## Why I Built This

Most hardware teams are still tracking component status in spreadsheets or sticky notes. This tool brings the same visibility that software teams get from tools like Jira or Linear to hardware development workflows — giving engineers a single source of truth for where every component is in the process, who touched it last, and what changed.

The activity log pattern means nothing gets lost. Every status change is recorded automatically, which matters when you're debugging a hardware failure and need to know exactly when a component moved from prototype to testing and who signed off on it.

## Flexible By Design

While built for hardware tracking, the architecture is intentionally generic. Swapping the status values from `prototype/testing/shipped` to `backlog/in-progress/done` turns this into a lightweight Scrum board. Change them to `procurement/deployed/decommissioned` and it becomes an IT asset tracker. The core pattern — items moving through stages with a full audit trail — applies to almost any workflow.

## Tech Stack
- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Auth:** JWT + bcrypt + Google OAuth (Passport.js)

## Features
- Add and manage hardware components
- Track status: Prototype → Testing → Shipped
- Automatic activity log on every status change
- Full authentication — register, login, or sign in with Google
- Protected routes — only authenticated users can create, update, or delete
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
Visit `http://localhost:5000/api/auth/google` in your browser to sign in with Google. You'll be redirected back to the app with a token automatically.

## API Routes

| Method | Route | Auth Required | Description |
|--------|-------|---------------|-------------|
| GET | /api/components | No | Get all components |
| POST | /api/components | Yes | Create a component |
| PATCH | /api/components/:id | Yes | Update a component |
| DELETE | /api/components/:id | Yes | Delete a component |
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Login and get token |
| GET | /api/auth/google | No | Login with Google |

## Getting Started

### Prerequisites
- Node.js
- MongoDB running locally

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

## How It Works (Non-Technical)

Hardware Tracker lets engineering teams log and track hardware components through their development lifecycle — from prototype to testing to shipped.

Every time a component's status changes, the app automatically logs who changed it and when, creating a full audit trail. Team members sign in securely with their Google account or register directly, and every action is tied to a real user.

## What's Next
- Filter and search components by status
- Recharts dashboard showing component pipeline at a glance
- Export activity logs for compliance reporting
- Role-based access — admins vs read-only viewers
- Deploy to production with Vercel and Render