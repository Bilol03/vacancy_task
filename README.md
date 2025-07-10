# 🚀 Auth API — Express.js + Docker + Email Verification

Bu loyiha foydalanuvchilarni ro'yxatdan o'tkazish, tizimga kirish va email orqali tasdiqlash imkoniyatlarini taqdim etadi. Loyihada Docker Compose orqali PostgreSQL, Redis va Express API konteynerlari ishlatiladi.

---

## 🛠 Texnologiyalar

- Node.js (Express)
- PostgreSQL
- Redis
- Docker & Docker Compose
- JWT (Authentication)
- Nodemailer (Email verification)
- dotenv

---

## ⚙️ O'rnatish

### 1. `.env` fayli yaratish

Loyiha papkasida `.env` faylini yarating va quyidagilarni kiriting:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# API Configuration
API_PREFIX=/api
API_VERSION=v1

# Redis Configuration 
REDIS_URL=redis://redis:6379

# Database Configuration
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=2003
DB_NAME=vacancy_task


# Authentication
SECRET_KEY=your_secret_key_for_jwt_at_least_32_chars_long
TOKEN_EXPIRY=1h

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Security
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes in milliseconds
RATE_LIMIT_MAX=100  # Maximum 100 requests per window


# Optional: Swagger Documentation
SWAGGER_TITLE=swagger_title
SWAGGER_DESCRIPTION=swagger_title
SWAGGER_VERSION=1.0.0
SWAGGER_SERVER_URL=http://localhost:8080


# Google gmail info
MY_EMAIL=email@example.com
MY_EMAIL_PASSWORD=your_email_password


```


## ⚙️ Docker Ishga Tushurish
```bash

docker-compose up --build
```

## Documentation uchun

```bash
http://localhost:PORT/api-docs
```



