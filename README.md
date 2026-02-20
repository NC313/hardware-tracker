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

## Features
- Add and manage hardware components
- Track status: Prototype → Testing → Shipped
- Automatic activity log on every status change
- Built with async-first architecture — easy to extend

## Getting Started

### Prerequisites
- Node.js
- MongoDB running locally

### Installation

1. Clone the repo
   git clone https://github.com/nc313/hardware-tracker

2. Install server dependencies
   cd server && npm install

3. Install client dependencies
   cd ../client && npm install

4. Create a .env file in /server based on .env.example

5. Run the server
   cd server && npm run dev

6. Run the client
   cd client && npm run dev

## What's Next
- Authentication — track which team member made each change
- Filter and search components by status
- Export activity logs for compliance reporting
- Recharts dashboard showing component pipeline at a glance