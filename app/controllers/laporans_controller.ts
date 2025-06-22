import { HttpContext } from '@adonisjs/core/http'
import Kegiatan from '#models/kegiatan'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'
import db from '@adonisjs/lucid/services/db'

export default class LaporansController {
  async index({ view, request }: HttpContext) {
    // Debug: Periksa data panitia di database
    const totalPanitia = await db.from('kepanitiaans').count('* as total')
    console.log('=== DEBUG PANITIA ===')
    console.log('Total panitia di database:', totalPanitia[0].total)
    
    const samplePanitia = await db.from('kepanitiaans').select('*').limit(5)
    console.log('Sample panitia:', samplePanitia)
    console.log('=====================')

    // Gunakan query builder untuk mendapatkan data dengan count yang lebih eksplisit
    const kegiatansQuery = db
      .from('kegiatans')
      .leftJoin('kepanitiaans', 'kegiatans.id', 'kepanitiaans.kegiatan_id')
      .leftJoin('organisasis', 'kegiatans.organisasi_id', 'organisasis.id')
      .leftJoin('lokasis', 'kegiatans.lokasi_id', 'lokasis.id')
      .select(
        'kegiatans.*',
        'organisasis.nama_organisasi',
        'lokasis.nama_lokasi',
        db.raw('COUNT(kepanitiaans.id) as kepanitiaans_count')
      )
      .groupBy('kegiatans.id', 'organisasis.nama_organisasi', 'lokasis.nama_lokasi')

    // Filter berdasarkan organisasi
    if (request.input('organisasi_id')) {
      kegiatansQuery.where('kegiatans.organisasi_id', request.input('organisasi_id'))
    }

    // Filter berdasarkan lokasi
    if (request.input('lokasi_id')) {
      kegiatansQuery.where('kegiatans.lokasi_id', request.input('lokasi_id'))
    }

    const kegiatans = await kegiatansQuery.exec()
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()

    // Debug: Log data kegiatan dan jumlah panitia
    console.log('=== DEBUG LAPORAN ===')
    kegiatans.forEach((kegiatan: any, index: number) => {
      console.log(`Kegiatan ${index + 1}: ${kegiatan.nama}`)
      console.log(`- ID: ${kegiatan.id}`)
      console.log(`- kepanitiaans_count: ${kegiatan.kepanitiaans_count}`)
      console.log(`- organisasi: ${kegiatan.nama_organisasi}`)
      console.log(`- lokasi: ${kegiatan.nama_lokasi}`)
    })
    console.log('=====================')

    return view.render('laporan/index', { 
      kegiatans, 
      organisasis, 
      lokasis 
    })
  }
}