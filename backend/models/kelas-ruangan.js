// KelasRuangan model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KelasRuangan = sequelize.define('kelas_ruangan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    id_klinik: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'klinik',
            key: 'id',
        },
    },
    nama_kelas: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
}, {
    tableName: 'kelas_ruangan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = KelasRuangan;