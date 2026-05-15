# Quote Dashboard

Junior fullstack demo project built with Laravel + React.

## Features

* Dashboard with user cards
* External quote API integration
* DTO implementation using Spatie Laravel Data
* Mock API mode
* Error simulation (200 / 404 / 500)
* React frontend with fetch API
* Laravel backend API
* Environment based configuration

---

# Tech Stack

## Backend

* Laravel
* PHP
* Spatie Laravel Data
* Laravel HTTP Client
* SQLite

## Frontend

* React
* Inertia.js
* TypeScript

---

# Installation

## Clone repository

```bash
git clone <repo-url>
cd quote-dashboard
```

## Install dependencies

```bash
composer install
npm install
```

## Environment setup

Copy environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

---

# Database

Run migrations:

```bash
php artisan migrate
```

Seed demo users:

```bash
php artisan db:seed --class=UserSeeder
```

---

# Running the project

Start Laravel server:

```bash
php artisan serve
```

Start frontend:

```bash
npm run dev
```

---

# Mock API mode

The project supports mocked API responses.

Configure in `.env`:

```env
QUOTE_API_MOCK=true
```

or

```env
QUOTE_API_MOCK=false
```

---

# Mock features

Mock mode simulates:

* 200 OK
* 404 Not Found
* 500 Internal Server Error

The application handles API failures gracefully and does not crash.

---

# API Endpoint

```text
/api/dashboard-users
```

Returns users with:

* user information
* quote data
* fetch timestamp
* error information

---

# DTO

Project uses `QuoteData` DTO for:

* external API responses
* mocked responses
* structured data handling

---

# Author

Eliana Lipková
