'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        nama_lengkap: 'Admin Klinik Sehat Selalu',
        email: 'admin@example.com',
        username: 'admin-sehat',
        password_hash: await require('bcrypt').hash('admin', 10),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        nama_lengkap: 'User Klinik Sehat Selalu',
        email: 'user@example.com',
        username: 'user-sehat',
        password_hash: await require('bcrypt').hash('user', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        nama_lengkap: 'Admin Klinik Medika Utama',
        email: 'admin2@example.com',
        username: 'admin-medika',
        password_hash: await require('bcrypt').hash('admin', 10),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        nama_lengkap: 'User Klinik Medika Utama',
        email: 'user2@example.com',
        username: 'user-medika',
        password_hash: await require('bcrypt').hash('user', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
