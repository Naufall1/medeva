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
    await queryInterface.bulkInsert('kelas_ruangan', [
      {
        id: 'be3f3315-0c2c-40d9-907d-fccbd8318ebf',
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        nama_kelas: 'Kelas 1',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4b034fee-e779-4fbf-bdae-735074d28520',
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        nama_kelas: 'Kelas 2',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'd2ade46d-7b2a-43ee-b257-f5dbc8fc700e',
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        nama_kelas: 'Kelas 3',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '0f9bfebd-b7f1-48d9-9641-ebe3e9c0787f',
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        nama_kelas: 'Kelas 1',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'df494065-189e-445b-8179-510657e6fcb1',
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        nama_kelas: 'Kelas 2',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '6db058e5-e87d-4e1b-b0bc-150bf7999489',
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        nama_kelas: 'Kelas 3',
        is_active: true,
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
    await queryInterface.bulkDelete('kelas_ruangan', null, {});
  }
};
