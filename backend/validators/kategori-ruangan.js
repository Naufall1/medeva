const yup = require('yup');

const kategoriRuanganSchema = yup.object({
    nama_ruangan: yup.string()
        .required('Nama ruangan is required'),
    kapasitas: yup.number()
        .required('Kapasitas is required')
        .positive('Kapasitas must be a positive number')
        .integer('Kapasitas must be an integer'),
    id_kelas: yup.string()
        .required('Kelas Ruangan is required')
        .uuid('Kelas ruangan is invalid'),
    harga: yup.number()
        .required('Harga is required')
        .positive('Harga must be a positive number'),
    fasilitas: yup.object()
        .required('Fasilitas is required')
        .shape({
            ac: yup.boolean().required('ac is required'),
            tv: yup.boolean().required('tv is required'),
            meja: yup.boolean().required('meja is required'),
            sofa: yup.boolean().required('sofa is required'),
            kursi: yup.boolean().required('kursi is required'),
            kulkas: yup.boolean().required('kulkas is required'),
            lemari: yup.boolean().required('lemari is required'),
            kabinet: yup.boolean().required('kabinet is required'),
            bed_bayi: yup.boolean().required('bed_bayi is required'),
            amenities: yup.boolean().required('amenities is required'),
            dispenser: yup.boolean().required('dispenser is required'),
            kamar_mandi: yup.boolean().required('kamar_mandi is required'),
            kipas_angin: yup.boolean().required('kipas_angin is required'),
            bed_penunggu: yup.boolean().required('bed_penunggu is required'),
            overbed_table: yup.boolean().required('overbed_table is required'),
        }).noUnknown(true, 'Unknown fasilitas field'),
    jenis_kelamin: yup.string()
        .required('Jenis kelamin is required')
        .oneOf(['Semua', 'Laki-laki', 'Perempuan'], 'Jenis kelamin must be either "Semua", "Laki-laki", or "Perempuan"'),
    usia: yup.string()
        .required('Usia is required')
        .oneOf(['Semua', 'Anak', 'Dewasa'], 'Usia must be either "Semua", "Anak", or "Dewasa"'),
    penyakit: yup.string()
        .required('Penyakit is required')
        .oneOf(['Semua', 'Infeksius', 'Non-Infeksius'], 'Penyakit must be either "Semua", "Infeksius", or "Non-Infeksius"'),

    is_active: yup.boolean()
        .required('is_active is required'),
});

module.exports = {
    kategoriRuanganSchema,
};