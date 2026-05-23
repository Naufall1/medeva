// KategoriRuangan model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KategoriRuangan = sequelize.define(
    'kategori_ruangan',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        id_klinik: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'klinik',
                key: 'id'
            }
        },
        id_kelas_ruangan: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'kelas_ruangan',
                key: 'id'
            }
        },
        jenis_kelamin: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        usia: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        penyakit: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        nama_ruangan: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        harga_ruangan: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        fasilitas_ruangan: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        tableName: 'kategori_ruangan',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = KategoriRuangan;