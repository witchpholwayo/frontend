# Submission Package - Web Application Full-Stack

This package contains frontend (Next.js + Tailwind) and backend (Express + MySQL) ready for local run and deploy.

## Contents
- backend-express-ready/  -> Express API (see .env.example)
- frontend-next-tailwind/ -> Next.js + Tailwind (see .env.example)

## Quick local run
1. Backend
   - cd backend-express-ready
   - copy .env.example -> .env and set DB credentials
   - import sql/schema.sql into MySQL
   - npm install
   - npm run dev

2. Frontend
   - cd frontend-next-tailwind
   - copy .env.example -> .env.local and set NEXT_PUBLIC_API_BASE=http://localhost:4000/api
   - npm install
   - npm run dev
   - open http://localhost:3000

## Deploy summary
- Backend: Render (create MySQL instance, set env vars, connect repo)
- Frontend: Vercel (set NEXT_PUBLIC_API_BASE to backend URL)

