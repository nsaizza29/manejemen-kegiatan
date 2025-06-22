import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Lokasi from '#models/lokasi'

export default class extends BaseSeeder {
  async run() {
    // Hapus data yang ada
    await Lokasi.query().delete()

    // Tambah data test
    await Lokasi.createMany([
      {
        nama_lokasi: 'Aula Kampus',
        alamat: 'Jl. Kampus No. 1, Jakarta',
        kapasitas: 200,
        deskripsi: 'Aula utama kampus dengan panggung dan sound system'
      },
      {
        nama_lokasi: 'Ruang Seminar',
        alamat: 'Gedung A Lantai 2, Jakarta',
        kapasitas: 50,
        deskripsi: 'Ruang seminar dengan projector dan AC'
      },
      {
        nama_lokasi: 'Lapangan Olahraga',
        alamat: 'Area Kampus Timur, Jakarta',
        kapasitas: 500,
        deskripsi: 'Lapangan outdoor untuk kegiatan olahraga dan acara besar'
      },
      {
        nama_lokasi: 'Perpustakaan',
        alamat: 'Gedung B Lantai 1, Jakarta',
        kapasitas: 100,
        deskripsi: 'Perpustakaan dengan ruang baca dan meeting room'
      }
    ])

    console.log('✅ Data lokasi berhasil ditambahkan')
  }
}