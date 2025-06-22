import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Kepanitiaan from '#models/kepanitiaan'
import Kegiatan from '#models/kegiatan'
import Anggota from '#models/anggota'

export default class extends BaseSeeder {
  async run() {
    await Kepanitiaan.query().delete()
    const kegiatans = await Kegiatan.all()
    const anggotas = await Anggota.all()
    if (kegiatans.length === 0 || anggotas.length === 0) {
      console.log('❌ Data kegiatan/anggota belum ada. Jalankan seeder kegiatan & anggota dulu.')
      return
    }
    await Kepanitiaan.createMany([
      {
        kegiatan_id: kegiatans[0].id,
        anggota_id: anggotas[0].id,
        jabatan: 'Ketua Panitia'
      },
      {
        kegiatan_id: kegiatans[0].id,
        anggota_id: anggotas[1].id,
        jabatan: 'Sekretaris'
      },
      {
        kegiatan_id: kegiatans[1].id,
        anggota_id: anggotas[8].id,
        jabatan: 'Ketua Panitia'
      },
      {
        kegiatan_id: kegiatans[2].id,
        anggota_id: anggotas[6].id,
        jabatan: 'Ketua Panitia'
      },
      {
        kegiatan_id: kegiatans[2].id,
        anggota_id: anggotas[7].id,
        jabatan: 'Anggota'
      }
    ])
    console.log('✅ Data kepanitiaan berhasil ditambahkan')
  }
}