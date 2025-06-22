import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Kegiatan from '#models/kegiatan'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Kegiatan.query().delete()
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()
    if (organisasis.length === 0 || lokasis.length === 0) {
      console.log('❌ Data organisasi/lokasi belum ada. Jalankan seeder organisasi & lokasi dulu.')
      return
    }
    await Kegiatan.createMany([
      {
        nama: 'Seminar Nasional Teknologi',
        deskripsi: 'Seminar nasional tentang perkembangan teknologi terbaru.',
        tgl_pelaksanaan: DateTime.local().plus({ days: 10 }),
        organisasi_id: organisasis[0].id,
        lokasi_id: lokasis[0].id
      },
      {
        nama: 'Pelatihan Jurnalistik',
        deskripsi: 'Pelatihan menulis dan jurnalistik untuk mahasiswa.',
        tgl_pelaksanaan: DateTime.local().plus({ days: 20 }),
        organisasi_id: organisasis[4].id,
        lokasi_id: lokasis[3].id
      },
      {
        nama: 'Lomba Futsal Antar Fakultas',
        deskripsi: 'Kompetisi futsal antar fakultas se-kampus.',
        tgl_pelaksanaan: DateTime.local().plus({ days: 30 }),
        organisasi_id: organisasis[3].id,
        lokasi_id: lokasis[2].id
      }
    ])
    console.log('✅ Data kegiatan berhasil ditambahkan')
  }
}