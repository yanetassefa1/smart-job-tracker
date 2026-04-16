# Smart Job Application Tracker

A full-stack web app to track every job application — status, deadlines, notes, contacts, and follow-ups — all in one place. Built with React, TypeScript, Django REST Framework, and PostgreSQL/Supabase.

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite  
**Backend:** Python, Django, Django REST Framework  
**Database:** PostgreSQL (Supabase)  
**Auth:** JWT (SimpleJWT)

---

## Project Structure

```
smart-job-tracker/
├── frontend/        # React + TypeScript app
├── backend/         # Django REST API
└── docs/            # API docs
```

---

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Fill in your DB credentials

python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Features

- 📋 Track applications with status: Applied, Screening, Interview, Offer, Rejected
- 🏢 Store company, role, salary range, job URL, and location
- 📝 Add notes and follow-up reminders per application
- 📊 Dashboard with stats — total apps, interviews, offers, rejection rate
- 🔍 Search and filter by status, company, or date
- 🔐 Secure per-user data with JWT auth

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register |
| POST | `/api/auth/login/` | Login |
| GET | `/api/jobs/` | List all applications |
| POST | `/api/jobs/` | Add new application |
| GET | `/api/jobs/:id/` | Get single application |
| PATCH | `/api/jobs/:id/` | Update application |
| DELETE | `/api/jobs/:id/` | Delete application |
| GET | `/api/jobs/stats/` | Dashboard stats |

---

## License

MIT
