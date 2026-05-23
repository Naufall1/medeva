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
    await queryInterface.bulkInsert('klinik', [
      {
        id: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        nama: 'Klinik Sehat Selalu',
        alamat: 'Jl. Sehat No. 123, Jakarta',
        kode_auth: 'SEHAT123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4b034fee-e779-4fbf-bdae-735074d28520',
        nama: 'Klinik Medika Utama',
        alamat: 'Jl. Medika No. 456, Bandung',
        kode_auth: 'MEDIKA456',
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
    await queryInterface.bulkDelete('klinik', null, {});
  }
};
