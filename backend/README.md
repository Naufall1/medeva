# Medeva Backend

Backend API untuk aplikasi Medeva, dibangun dengan Express, Sequelize, PostgreSQL, JWT, bcrypt, dan Yup.

## Ringkasan

Project ini menyediakan:

- Autentikasi login berbasis klinik dan user
- Middleware autentikasi JWT untuk endpoint protected
- Manajemen kategori ruangan
- Listing kelas ruangan
- Validasi request dan error handling terpusat
- Migration dan seed data untuk klinik, user, kelas ruangan, dan kategori ruangan

## Tech Stack

- Node.js
- Express 5
- Sequelize 6
- PostgreSQL
- JWT
- bcrypt
- Yup

## Setup

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan environment

### 2a. Buat database dan user (PostgreSQL)

Sebelum menyiapkan environment, buat database dan user PostgreSQL yang akan dipakai aplikasi. Contoh perintah (jalankan sebagai superuser PostgreSQL, mis. `postgres`):

```bash
# Jika memakai `psql` interaktif:
psql -U postgres
CREATE USER medeva_user WITH PASSWORD 'medeva_password';
CREATE DATABASE medeva OWNER medeva_user;
\q

# Alternatif satu baris (non-interaktif):
psql -U postgres -c "CREATE USER medeva_user WITH PASSWORD 'medeva_password';"
psql -U postgres -c "CREATE DATABASE medeva OWNER medeva_user;"
```

Catatan:

- Ganti `medeva_user`, `medeva_password`, dan `medeva` sesuai kebijakan keamanan dan konvensi lingkungan kamu.
- Jika database host terpisah (managed service), gunakan konsol penyedia untuk membuat user/database atau ikuti dokumentasi layanan tersebut.

Buat file `.env` di root backend jika belum ada, lalu isi minimal:

```env
PORT=3000
JWT_SECRET=your_secret_key
DB_NAME=medeva
DB_USER=medeva_user
DB_PASSWORD=medeva_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```

### 3. Jalankan migration dan seed

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Rollback tersedia dari catatan project:

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:seed:undo:all
```

### 4. Jalankan server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:<PORT>`.

## Script

Hanya ada script development:

```bash
npm run dev
```

## Arsitektur Folder

- `config/` - konfigurasi aplikasi dan database
- `controllers/` - controller HTTP layer
- `middlewares/` - autentikasi, otorisasi, validasi, dan error handling
- `migrations/` - struktur tabel database
- `models/` - definisi model Sequelize dan relasi
- `routes/` - definisi endpoint API
- `seeders/` - data awal database
- `services/` - logika bisnis
- `utils/` - helper umum
- `validators/` - schema validasi request

## Arsitektur Aplikasi

Arsitektur backend mengikuti pola lapisan (layered architecture) sederhana yang memisahkan tanggung jawab:

- Presentation / HTTP layer: `routes/` dan `controllers/` menerima request, melakukan parsing query/path/body, dan mengembalikan response HTTP.
- Middleware: `middlewares/` menangani concerns transversal seperti CORS, logging, autentikasi JWT, otorisasi (role), validasi request, serta error handling terpusat.
- Business logic layer: `services/` berisi logika domain (mis. operasi CRUD, transformasi data, otorisasi bisnis) — controller memanggil service untuk melakukan tindakan.
- Data access / Persistence: `models/`, `migrations/`, dan `seeders/` digunakan oleh Sequelize untuk definisi skema, relasi, dan akses data ke PostgreSQL.

Komponen utama dan alur data singkat:

1. Client -> Route: client (atau frontend) memanggil endpoint REST.
2. Middleware Authentication: jika endpoint protected, JWT diverifikasi di `middlewares/auth.js` dan `req.user` diisi.
3. Controller -> Service: controller men-validate input (middleware `validate`) lalu memanggil service yang relevan.
4. Service -> Model/DB: service melakukan query melalui model Sequelize dan mengembalikan hasil.
5. Controller -> Response: controller membentuk response JSON dan mengembalikannya ke client.
6. Error Handling: semua error diteruskan ke middleware `errorHandling.js` yang mengubah error menjadi response terstruktur.

Auth flow singkat:

- `POST /auth/login` menerima `klinik_id`, `username`, dan `password`.
- Service memverifikasi klinik dan user, mencocokkan password (bcrypt), lalu membuat JWT (`services/authService.js`).
- Token disertakan di header `Authorization: Bearer <token>` pada request berikutnya; middleware `auth.js` memverifikasi token dan melengkapi `req.user`.

Keamanan & operasional singkat:

- Secret JWT disimpan di environment (`JWT_SECRET`), gunakan secret yang kuat di produksi.
- Password disimpan sebagai hash dengan `bcrypt`.
- Database connection dikelola oleh Sequelize; gunakan connection pooling dan konfigurasi produksi sesuai kebutuhan.
- Tidak ada rate-limiting atau logging terpusat di implementasi saat ini — tambahkan reverse-proxy atau middleware rate limiter untuk produksi.


## Alur Request

1. Request masuk ke `main.js`
2. CORS dan logging dijalankan
3. Endpoint `/auth` diproses tanpa JWT middleware
4. Setelah itu semua route lain melewati middleware autentikasi JWT
5. Route protected dapat mengakses `req.user`
6. Error ditangani oleh middleware error handler terpusat

## API Endpoints

### Auth

#### `POST /auth/login`

Login menggunakan `klinik_id`, `username`, dan `password`.

Request body:

```json
{
  "klinik_id": "SEHAT123",
  "username": "admin-sehat",
  "password": "admin"
}
```

Response sukses:

```json
{
  "token": "<jwt-token>",
  "user": {
    "username": "admin-sehat",
    "nama_lengkap": "Admin Klinik Sehat Selalu",
    "email": "admin@example.com",
    "is_admin": true,
    "klinik": "Klinik Sehat Selalu"
  }
}
```

Catatan:

- Validasi request dilakukan sebelum login diproses
- Route `GET /auth/me` masih TODO dan belum tersedia

### Kategori Ruangan

Seluruh endpoint di bawah ini membutuhkan header:

```http
Authorization: Bearer <jwt-token>
```

#### `GET /kategori-ruangan`

Mengambil daftar kategori ruangan milik klinik user login.

Query yang didukung:

- `page`
- `perPage`
- `search`
- `is_active`

Contoh:

```http
GET /kategori-ruangan?page=1&perPage=10&search=vip&is_active=true
```

#### `GET /kategori-ruangan/:id`

Mengambil detail kategori ruangan berdasarkan ID.

#### `POST /kategori-ruangan`

Hanya untuk admin.

Request body:

```json
{
  "nama_ruangan": "Ruangan VIP 1",
  "id_kelas": "be3f3315-0c2c-40d9-907d-fccbd8318ebf",
  "harga": 500000,
  "kapasitas": 1,
  "fasilitas": {
    "ac": true,
    "tv": true,
    "meja": true,
    "sofa": true,
    "kursi": true,
    "kulkas": true,
    "lemari": true,
    "kabinet": true,
    "bed_bayi": false,
    "amenities": true,
    "dispenser": true,
    "kamar_mandi": true,
    "kipas_angin": false,
    "bed_penunggu": true,
    "overbed_table": true
  },
  "jenis_kelamin": "Semua",
  "usia": "Dewasa",
  "penyakit": "Non-Infeksius",
  "is_active": true
}
```

#### `PUT /kategori-ruangan/:id`

Hanya untuk admin.

Body mengikuti format `POST /kategori-ruangan`.

### Kelas Ruangan

#### `GET /kelas-ruangan`

Mengambil daftar kelas ruangan milik klinik user login.

## Validasi

Request divalidasi dengan Yup melalui middleware `validate`.

Schema yang aktif saat ini:

- Login schema di `validators/auth.js`
- Kategori ruangan schema di `validators/kategori-ruangan.js`

## Database

Model dan relasi yang tersedia:

- `klinik`
- `users`
- `kelas_ruangan`
- `kategori_ruangan`

Relasi utama:

- Klinik memiliki banyak user
- Klinik memiliki banyak kelas ruangan
- Klinik memiliki banyak kategori ruangan
- Kategori ruangan terhubung ke kelas ruangan

## Seed Data

Seed data tersedia untuk:

- Klinik
- User
- Kelas ruangan
- Kategori ruangan

Data seed ini dipakai untuk percobaan login dan pengujian endpoint.

## Contoh Header Request

```http
Content-Type: application/json
Authorization: Bearer <jwt-token>
```
