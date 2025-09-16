# OCR App Monorepo

This project contains both the FastAPI backend and React frontend for an OCR web application.

## Structure
- `backend/` — FastAPI app (sign up, sign in, OCR, MySQL)
- `frontend/` — React app (UI for authentication and OCR)

## Prerequisites
- Docker
- Docker Compose

## Quick Start

1. **Clone the repository**

2. **Start all services (backend, frontend, db):**
   ```bash
   docker-compose up --build
   ```
   - FastAPI backend: http://localhost:8000
   - React frontend: http://localhost:3000
   - MySQL: localhost:3306

3. **API Endpoints:**
   - `POST /signup` — Register a new user
   - `POST /token` — Obtain JWT token
   - `POST /signout` — Sign out
   - `POST /ocr` — Upload image for OCR

4. **Frontend Usage:**
   - Open http://localhost:3000 in your browser
   - Sign up, sign in, and upload images for OCR

5. **Stopping the app:**
   Press `Ctrl+C` or run:
   ```bash
   docker-compose down
   ```

## Notes
- Uploaded images are saved in the backend container's `uploads/` directory.
- Change `SECRET_KEY` in `backend/main.py` for production use.
- MySQL data is persisted in the `db_data` Docker volume.

## License
MIT