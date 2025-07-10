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
PORT=3000
JWT_SECRET=your_jwt_secret_at_least_32_characters

DB_USER=db
DB_PASS=your_db_password
DB_NAME=auth_db
DB_HOST=db
DB_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

--

### Docker Ishga Tushurish
docker-compose up --build


## Documentation uchun
http://localhost:PORT/api-docs



