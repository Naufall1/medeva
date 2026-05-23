# Medeva Fullstack Project

Medeva adalah aplikasi fullstack untuk manajemen ruangan klinik. Repository ini terdiri dari 2 project yang dijalankan terpisah:

- `backend/` sebagai REST API dengan Express, Sequelize, PostgreSQL, JWT, bcrypt, dan Yup
- `frontend/` sebagai aplikasi React + Vite untuk login dan pengelolaan ruangan

Dokumentasi ini ditulis sebagai panduan utama supaya project bisa dijalankan dari nol sampai bisa diakses lewat browser.

## Ringkasan Fitur

- Login berbasis klinik, username, dan password
- Autentikasi JWT untuk endpoint protected
- Manajemen kategori ruangan dan kelas ruangan
- Tampilan frontend untuk login dan daftar ruangan
- Data awal tersedia melalui migration dan seeder

## Tech Stack

Backend:
- Node.js
- Express 5
- Sequelize 6
- PostgreSQL
- JWT
- bcrypt
- Yup

Frontend:
- React 19
- Vite
- React Router
- Tailwind CSS

## Prasyarat

Sebelum menjalankan project, pastikan tools berikut sudah terpasang:

- Node.js 18+ atau versi yang kompatibel
- npm
- PostgreSQL
- Terminal 1 dan Terminal 2 untuk menjalankan backend dan frontend secara terpisah

## Struktur Project

- `backend/` berisi API, controller, service, model, migration, seeder, dan validator
- `frontend/` berisi UI React, hook, service API, dan halaman login / daftar ruangan

## Cara Menjalankan Project

Karena project ini fullstack, backend dan frontend dijalankan di folder yang berbeda.

### 1. Siapkan database PostgreSQL

Buat database dan user PostgreSQL terlebih dahulu. Contoh:

```sql
CREATE USER medeva_user WITH PASSWORD 'medeva_password';
CREATE DATABASE medeva OWNER medeva_user;
```

Kalau kamu memakai user atau database yang berbeda, sesuaikan nilai environment variable di backend.

### 2. Konfigurasi backend

Masuk ke folder backend lalu install dependency:

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend/` jika belum ada. Contoh konfigurasi:

```env
DB_NAME=medeva
DB_USER=medeva_user
DB_PASSWORD=medeva_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
JWT_SECRET=supersecretkey
PORT=3000
```

Catatan:
- `PORT=3000` berarti backend bisa diakses di `http://localhost:3000`
- `JWT_SECRET` sebaiknya diisi dengan secret yang kuat untuk environment produksi
- Jika database kamu berjalan di port lain, ubah `DB_PORT` sesuai kondisi lokal

### 3. Jalankan migration dan seed backend

Setelah database siap, jalankan migration dan seed data:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Langkah ini akan membuat tabel dan mengisi data awal seperti klinik, user, kelas ruangan, dan kategori ruangan.

Jika sewaktu-waktu ingin reset data development, kamu bisa gunakan:

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:seed:undo:all
```

### 4. Jalankan backend

Masih di folder `backend`, jalankan server development:

```bash
npm run dev
```

Backend akan berjalan di:

```bash
http://localhost:3000
```

### 5. Konfigurasi frontend

Buka terminal baru, lalu masuk ke folder frontend dan install dependency:

```bash
cd frontend
npm install
```

Frontend membaca alamat backend dari environment variable `VITE_API_URL`. Buat file `.env` di folder `frontend/` jika belum ada, lalu isi:

```env
VITE_API_URL=http://localhost:3000
```

Kalau backend dijalankan di port lain, ubah nilai ini agar frontend tetap bisa mengambil data dari API yang benar.

### 6. Jalankan frontend

Masih di folder `frontend`, jalankan Vite development server:

```bash
npm run dev
```

Biasanya Vite akan menampilkan URL seperti:

```bash
http://localhost:5173
```

Buka URL tersebut di browser untuk mengakses aplikasi.

## Urutan Akses

Urutan yang benar supaya aplikasi bisa diakses tanpa error:

1. Jalankan PostgreSQL
2. Jalankan migration dan seed di backend
3. Jalankan backend dengan `npm run dev`
4. Jalankan frontend dengan `npm run dev`
5. Buka URL frontend di browser

## Login Awal

Data seed menyediakan akun awal untuk testing. Contoh yang bisa langsung dipakai:

- `klinik_id`: `SEHAT123`
- `username`: `admin-sehat`
- `password`: `admin`

Akun lain yang tersedia dari seed:

- `SEHAT123` / `user-sehat` / `user`
- `MEDIKA456` / `admin-medika` / `admin`
- `MEDIKA456` / `user-medika` / `user`

## Endpoint Penting

Backend menyediakan endpoint berikut yang dipakai aplikasi:

- `POST /auth/login`
- `GET /kategori-ruangan`
- `GET /kategori-ruangan/:id`
- `GET /kelas-ruangan`

## Akses Aplikasi

Setelah semua service berjalan, aksesnya adalah:

- Backend API: `http://localhost:3000`
- Frontend web app: `http://localhost:5173`

Jika frontend gagal memuat data, pastikan nilai `VITE_API_URL` sudah mengarah ke backend yang benar.

## Verifikasi Cepat

Kalau setup sudah benar, alur berikut harus berhasil:

1. Backend menampilkan log bahwa server berjalan di port 3000
2. Frontend menampilkan URL Vite di terminal
3. Halaman login muncul di browser
4. Login dengan akun seed berhasil
5. Setelah login, halaman daftar ruangan bisa dibuka

## Troubleshooting

### Backend tidak bisa jalan

- Pastikan PostgreSQL aktif
- Pastikan database dan user di `.env` benar
- Pastikan port backend belum dipakai aplikasi lain
- Jika muncul error koneksi database, cek `DB_HOST`, `DB_PORT`, `DB_USER`, dan `DB_PASSWORD`

### Frontend gagal login atau data kosong

- Pastikan backend sudah running di `http://localhost:3000`
- Pastikan `VITE_API_URL` benar
- Restart frontend setelah mengubah file `.env`
- Cek apakah request ke `/auth/login` berhasil di tab Network browser

### Migration atau seed gagal

- Pastikan database `medeva` sudah dibuat
- Pastikan user PostgreSQL punya izin membuat tabel dan insert data
- Coba hapus lalu buat ulang database development jika perlu

### Port bentrok

- Backend default memakai port `3000`
- Frontend default memakai port `5173`
- Kalau port sedang dipakai, ubah salah satu service lalu sesuaikan `VITE_API_URL`

## Catatan Penting

- Frontend tidak mengambil API dari path `/api` secara langsung; aplikasi membaca base URL dari `VITE_API_URL`
- Auth login memakai kontrak `klinik_id`, `username`, dan `password`
- Token login disimpan oleh frontend dan dipakai untuk request berikutnya
- Route frontend utama setelah login adalah halaman daftar ruangan

## Referensi Folder

- `backend/main.js` adalah entry point server Express
- `backend/config/app-config.js` menyimpan konfigurasi port dan database
- `frontend/src/App.jsx` mengatur routing aplikasi
- `frontend/src/services/apiClient.js` mengatur request ke backend

## Build dan Preview Frontend

Kalau ingin memastikan build production ikut berjalan, jalankan:

```bash
cd frontend
npm run build
npm run preview
```

## Lint Frontend

Untuk pengecekan kode frontend:

```bash
cd frontend
npm run lint
```

## Kesimpulan

Kalau mengikuti langkah di atas, project bisa dijalankan end-to-end: database aktif, backend API hidup, frontend terbuka di browser, dan user bisa login memakai data seed yang tersedia.
