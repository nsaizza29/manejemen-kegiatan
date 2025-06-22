import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Anggota from '#models/anggota'
import Organisasi from '#models/organisasi'

export default class extends BaseSeeder {
  async run() {
    await Anggota.query().delete()
    const organisasis = await Organisasi.all()
    if (organisasis.length === 0) {
      console.log('❌ Tidak ada data organisasi. Jalankan seeder organisasi terlebih dahulu.')
      return
    }
    await Anggota.createMany([
      {
        nama: 'Ahmad Rizki',
        nim: '2021001',
        jenis_kelamin: 'Laki-laki',
        email: 'ahmad.rizki@email.com',
        no_telepon: '081234567890',
        alamat: 'Jl. Sudirman No. 123, Jakarta',
        organisasi_id: organisasis[0].id
      },
      {
        nama: 'Siti Nurhaliza',
        nim: '2021002',
        jenis_kelamin: 'Perempuan',
        email: 'siti.nurhaliza@email.com',
        no_telepon: '081234567891',
        alamat: 'Jl. Thamrin No. 456, Jakarta',
        organisasi_id: organisasis[0].id
      },
      {
        nama: 'Budi Santoso',
        nim: '2021003',
        jenis_kelamin: 'Laki-laki',
        email: 'budi.santoso@email.com',
        no_telepon: '081234567892',
        alamat: 'Jl. Gatot Subroto No. 789, Jakarta',
        organisasi_id: organisasis[1].id
      },
      {
        nama: 'Rina Marlina',
        nim: '2021004',
        jenis_kelamin: 'Perempuan',
        email: 'rina.marlina@email.com',
        no_telepon: '081234567893',
        alamat: 'Jl. Rasuna Said No. 321, Jakarta',
        organisasi_id: organisasis[1].id
      },
      {
        nama: 'Citra Dewi',
        nim: '2021005',
        jenis_kelamin: 'Perempuan',
        email: 'citra.dewi@email.com',
        no_telepon: '081234567894',
        alamat: 'Jl. Kuningan No. 654, Jakarta',
        organisasi_id: organisasis[2].id
      },
      {
        nama: 'Agus Setiawan',
        nim: '2021006',
        jenis_kelamin: 'Laki-laki',
        email: 'agus.setiawan@email.com',
        no_telepon: '081234567895',
        alamat: 'Jl. Senayan No. 987, Jakarta',
        organisasi_id: organisasis[2].id
      },
      {
        nama: 'Rizki Pratama',
        nim: '2021007',
        jenis_kelamin: 'Laki-laki',
        email: 'rizki.pratama@email.com',
        no_telepon: '081234567896',
        alamat: 'Jl. Sudirman No. 147, Jakarta',
        organisasi_id: organisasis[3].id
      },
      {
        nama: 'Nina Safitri',
        nim: '2021008',
        jenis_kelamin: 'Perempuan',
        email: 'nina.safitri@email.com',
        no_telepon: '081234567897',
        alamat: 'Jl. Thamrin No. 258, Jakarta',
        organisasi_id: organisasis[3].id
      },
      {
        nama: 'Putri Wulandari',
        nim: '2021009',
        jenis_kelamin: 'Perempuan',
        email: 'putri.wulandari@email.com',
        no_telepon: '081234567898',
        alamat: 'Jl. Gatot Subroto No. 369, Jakarta',
        organisasi_id: organisasis[4].id
      },
      {
        nama: 'Ahmad Fauzi',
        nim: '2021010',
        jenis_kelamin: 'Laki-laki',
        email: 'ahmad.fauzi@email.com',
        no_telepon: '081234567899',
        alamat: 'Jl. Rasuna Said No. 741, Jakarta',
        organisasi_id: organisasis[4].id
      }
    ])
    console.log('✅ Data anggota berhasil ditambahkan')
  }
}