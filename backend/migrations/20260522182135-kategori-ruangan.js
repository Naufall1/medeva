'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('kategori_ruangan', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      id_klinik: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'klinik',
          key: 'id',
        },
      },
      id_kelas_ruangan: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'kelas_ruangan',
          key: 'id',
        },
      },
      jenis_kelamin: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      usia: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      penyakit: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nama_ruangan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      harga_ruangan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fasilitas_ruangan: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('kategori_ruangan');
  }
};
