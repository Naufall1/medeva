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
    await queryInterface.bulkInsert('kategori_ruangan', [
      {
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        id_kelas_ruangan: 'be3f3315-0c2c-40d9-907d-fccbd8318ebf', // Kelas 1
        jenis_kelamin: 'Laki-laki', // Opsi: Laki-laki, Perempuan, Semua
        usia: 'Dewasa', // Opsi: Anak, Dewasa
        penyakit: 'Non-Infeksius', // OPSI: Semua, Infeksius, Non-Infeksius
        nama_ruangan: 'Ruangan 1',
        harga_ruangan: '500000',
        fasilitas_ruangan: JSON.stringify({
          kapasitas: 1,
          ac: true,
          kipas_angin: false,
          tv: true,
          amenities: true,
          kamar_mandi: true,
          kulkas: true,
          bed_penunggu: true,
          lemari: true,
          kursi: true,
          dispenser: true,
          sofa: true,
          overbed_table: true,
          meja: true,
          kabinet: true,
          bed_bayi: false,
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_klinik: '1e8b9c3e-5f1a-4c2b-9a1d-2f3e4b5c6d7e',
        id_kelas_ruangan: '4b034fee-e779-4fbf-bdae-735074d28520', // Kelas 2
        jenis_kelamin: 'Perempuan', // Opsi: Laki-laki, Perempuan, Semua
        usia: 'Anak', // Opsi: Anak, Dewasa
        penyakit: 'Infeksius', // OPSI: Semua, Infeksius, Non-Infeksius
        nama_ruangan: 'Ruangan 2',
        harga_ruangan: '300000',
        fasilitas_ruangan: JSON.stringify({
          kapasitas: 2,
          ac: true,
          kipas_angin: true,
          tv: false,
          amenities: true,
          kamar_mandi: true,
          kulkas: false,
          bed_penunggu: false,
          lemari: true,
          kursi: true,
          dispenser: false,
          sofa: false,
          overbed_table: true,
          meja: true,
          kabinet: true,
          bed_bayi: false,
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        id_kelas_ruangan: '0f9bfebd-b7f1-48d9-9641-ebe3e9c0787f', // Kelas 1 (Medika)
        jenis_kelamin: 'Semua', // Opsi: Laki-laki, Perempuan, Semua
        usia: 'Dewasa', // Opsi: Anak, Dewasa
        penyakit: 'Semua', // OPSI: Semua, Infeksius, Non-Infeksius
        nama_ruangan: 'Ruangan 1',
        harga_ruangan: '550000',
        fasilitas_ruangan: JSON.stringify({
          kapasitas: 1,
          ac: true,
          kipas_angin: false,
          tv: true,
          amenities: true,
          kamar_mandi: true,
          kulkas: true,
          bed_penunggu: true,
          lemari: true,
          kursi: true,
          dispenser: true,
          sofa: true,
          overbed_table: true,
          meja: true,
          kabinet: true,
          bed_bayi: false,
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_klinik: '4b034fee-e779-4fbf-bdae-735074d28520',
        id_kelas_ruangan: 'df494065-189e-445b-8179-510657e6fcb1', // Kelas 2 (Medika)
        jenis_kelamin: 'Laki-laki', // Opsi: Laki-laki, Perempuan, Semua
        usia: 'Anak', // Opsi: Anak, Dewasa
        penyakit: 'Non-Infeksius', // OPSI: Semua, Infeksius, Non-Infeksius
        nama_ruangan: 'Ruangan 2',
        harga_ruangan: '320000',
        fasilitas_ruangan: JSON.stringify({
          kapasitas: 2,
          ac: true,
          kipas_angin: true,
          tv: false,
          amenities: true,
          kamar_mandi: true,
          kulkas: false,
          bed_penunggu: false,
          lemari: true,
          kursi: true,
          dispenser: false,
          sofa: false,
          overbed_table: true,
          meja: true,
          kabinet: true,
          bed_bayi: false,
        }),
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
    await queryInterface.bulkDelete('kategori_ruangan', null, {});
  }
};
