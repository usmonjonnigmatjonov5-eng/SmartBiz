# SmartBiz — Do‘kon boshqaruv tizimi

SmartBiz — do‘kon mahsulotlari, buyurtmalari va savdo statistikasini boshqarish uchun yaratilgan Fullstack CRM tizimi.

## Texnologiyalar

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Winston va Morgan
- Swagger
- Docker va Docker Compose

### Frontend
- HTML
- CSS
- JavaScript

## Loyiha tuzilishi

```text
SMARTBIZ/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── server.js
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── dashboard.js
│   ├── products.js
│   ├── orders.js
│   └── statistics.js
├── index.html
└── README.md
```

## Asosiy imkoniyatlar

- Mahsulotlarni qo‘shish va ko‘rish
- Mahsulotlarni qidirish va filtrlash
- Sahifalash va saralash
- Buyurtmalar yaratish
- Buyurtma holatini boshqarish
- Ombordagi mahsulot miqdorini nazorat qilish
- Savdo statistikasini ko‘rish

## API endpointlar

| Method | Endpoint | Vazifasi |
|---|---|---|
| GET | `/products` | Mahsulotlar ro‘yxati |
| POST | `/products` | Mahsulot qo‘shish |
| GET | `/orders` | Buyurtmalar ro‘yxati |
| POST | `/orders` | Buyurtma yaratish |
| PATCH | `/orders/:id/status` | Buyurtma holatini o‘zgartirish |
| GET | `/statistics` | Statistika olish |

## Loyihani ishga tushirish

1. Repozitoriyani yuklab oling.
2. `backend` papkasiga kiring.
3. Kerakli paketlarni o‘rnating:

```bash
npm install
```

4. `backend/.env` faylini yarating va MongoDB ulanish manzilini kiriting:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Backendni ishga tushiring:

```bash
npm start
```

## Docker orqali ishga tushirish

`backend` papkasida quyidagi buyruqni bajaring:

```bash
docker compose up --build -d
```

To‘xtatish:

```bash
docker compose down
```

## Swagger API hujjatlari

Backend ishga tushgach, quyidagi manzil orqali API hujjatlarini ko‘rish mumkin:

http://localhost:5000/api-docs/

## Muallif

SmartBiz loyihasi o‘quv loyihasi sifatida ishlab chiqilgan.