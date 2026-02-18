# ShareCare - Phase 0 & Phase 1 Foundation

This repository contains the Phase 1 backend foundation for ShareCare, a hyperlocal redistribution platform.

## Structure

- `client/` - Reserved for future React + TypeScript + Tailwind frontend.
- `server/` - Node.js + Express + MongoDB backend.

## Server Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Required Environment Variables

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

## Implemented Collections

- `User`
- `Listing`
- `Request`

## Implemented Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/listings` (protected)
- `POST /api/requests` (protected)

## Notes

- Categories are hard-coded and validated.
- Passwords are hashed using bcrypt.
- JWT authentication is enforced on protected endpoints.
- Creating a request updates listing status to `requested`.
