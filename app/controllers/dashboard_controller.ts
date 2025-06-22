import { HttpContext } from '@adonisjs/core/http'
import Kegiatan from '#models/kegiatan'
import Anggota from '#models/anggota'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'

export default class DashboardController {
  async index({ view, response }: HttpContext) {
    try {
      const totalKegiatanResult = await Kegiatan.query().count('* as total')
      const totalAnggotaResult = await Anggota.query().count('* as total')
      const totalOrganisasiResult = await Organisasi.query().count('* as total')
      const totalLokasiResult = await Lokasi.query().count('* as total')

      const totalKegiatan = totalKegiatanResult[0]?.$extras.total || 0
      const totalAnggota = totalAnggotaResult[0]?.$extras.total || 0
      const totalOrganisasi = totalOrganisasiResult[0]?.$extras.total || 0
      const totalLokasi = totalLokasiResult[0]?.$extras.total || 0

      const kegiatanTerbaru = await Kegiatan.query()
        .preload('organisasi')
        .preload('lokasi')
        .orderBy('created_at', 'desc')
        .limit(5)
      
      return view.render('dashboard', {
        totalKegiatan,
        totalAnggota,
        totalOrganisasi,
        totalLokasi,
        kegiatanTerbaru,
      })
    } catch (error) {
      console.error('Dashboard error:', error)
      return response.status(500).send('Internal Server Error')
    }
  }
}