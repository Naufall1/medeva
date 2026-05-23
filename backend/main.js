const express = require('express');
const authendicate = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandling');

const config = require('./config/app-config');

const authRoutes = require('./routes/auth');
const kategoriRuanganRoutes = require('./routes/kategoriRuangan');
const kelasRuanganRoutes = require('./routes/kelasRuangan');

const app = express();
const port = config.PORT;

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/auth', authRoutes);

app.use(authendicate);

app.use('/kategori-ruangan', kategoriRuanganRoutes);
app.use('/kelas-ruangan', kelasRuanganRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});