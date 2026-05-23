// Klinik model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Klinik = sequelize.define('klinik', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    kode_auth: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'klinik',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Klinik;