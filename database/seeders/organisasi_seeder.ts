import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Organisasi from '#models/organisasi'

export default class extends BaseSeeder {
  async run() {
    // Hapus data yang ada
    await Organisasi.query().delete()

    // Tambah data organisasi
    await Organisasi.createMany([
      {
        nama_organisasi: 'BEM Fakultas Teknik',
        jenis: 'BEM',
        deskripsi: 'Badan Eksekutif Mahasiswa Fakultas Teknik - Organisasi mahasiswa tingkat fakultas',
        alamat: 'Gedung A Lantai 2, Fakultas Teknik',
        no_telepon: '021-1234567'
      },
      {
        nama_organisasi: 'Himpunan Mahasiswa Informatika',
        jenis: 'Himpunan',
        deskripsi: 'Himpunan Mahasiswa Program Studi Informatika - Wadah pengembangan mahasiswa IT',
        alamat: 'Gedung B Lantai 1, Jurusan Informatika',
        no_telepon: '021-1234568'
      },
      {
        nama_organisasi: 'UKM Seni Budaya',
        jenis: 'UKM',
        deskripsi: 'Unit Kegiatan Mahasiswa Seni Budaya - Mengembangkan bakat seni mahasiswa',
        alamat: 'Gedung C Lantai 1, Area Seni Budaya',
        no_telepon: '021-1234569'
      },
      {
        nama_organisasi: 'UKM Olahraga',
        jenis: 'UKM',
        deskripsi: 'Unit Kegiatan Mahasiswa Olahraga - Mengembangkan prestasi olahraga mahasiswa',
        alamat: 'Gedung D Lantai 1, Area Olahraga',
        no_telepon: '021-1234570'
      },
      {
        nama_organisasi: 'UKM Jurnalistik',
        jenis: 'UKM',
        deskripsi: 'Unit Kegiatan Mahasiswa Jurnalistik - Mengembangkan kemampuan menulis dan media',
        alamat: 'Gedung E Lantai 2, Area Media',
        no_telepon: '021-1234571'
      }
    ])

    console.log('✅ Data organisasi berhasil ditambahkan')
  }
}