// User model definition using Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    id_klinik: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'klinik',
            key: 'id'
        }
    },
    nama_lengkap: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Users;