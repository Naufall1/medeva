'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Users = require('./users');
const Klinik = require('./klinik');
const KelasRuangan = require('./kelas-ruangan');
const KategoriRuangan = require('./kategori-ruangan');

const db = {
  Users,
  Klinik,
  KelasRuangan,
  KategoriRuangan,
  sequelize,
  Sequelize,
};

Klinik.hasMany(Users, { foreignKey: 'id_klinik' });
Klinik.hasMany(KelasRuangan, { foreignKey: 'id_klinik', as: 'kelas_ruangan' });
Klinik.hasMany(KategoriRuangan, { foreignKey: 'id_klinik', as: 'kategori_ruangan' });

Users.belongsTo(Klinik, { foreignKey: 'id_klinik' });

KelasRuangan.belongsTo(Klinik, { foreignKey: 'id_klinik' });
KelasRuangan.hasMany(KategoriRuangan, { foreignKey: 'id_kelas_ruangan', as: 'kategori_ruangan' });

KategoriRuangan.belongsTo(Klinik, { foreignKey: 'id_klinik' });
KategoriRuangan.belongsTo(KelasRuangan, { foreignKey: 'id_kelas_ruangan', as: 'kelas_ruangan' });

module.exports = db;
