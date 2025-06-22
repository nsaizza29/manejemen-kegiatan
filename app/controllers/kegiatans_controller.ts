import { HttpContext } from '@adonisjs/core/http'
import Kegiatan from '#models/kegiatan'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'

export default class KegiatansController {
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    
    const query = Kegiatan.query()
      .preload('organisasi')
      .preload('lokasi')

    // Filter berdasarkan organisasi
    if (request.input('organisasi')) {
      query.where('organisasi_id', request.input('organisasi'))
    }

    // Search berdasarkan nama
    if (request.input('search')) {
      query.whereILike('nama', `%${request.input('search')}%`)
    }

    const kegiatans = await query.paginate(page, limit)
    const organisasis = await Organisasi.all()

    return view.render('kegiatan/index', { kegiatans, organisasis })
  }

  async create({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()
    return view.render('kegiatan/create', { organisasis, lokasis })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const data = request.only(['nama', 'deskripsi', 'tgl_pelaksanaan', 'organisasi_id', 'lokasi_id'])
      
      // Validasi data
      if (!data.nama || !data.organisasi_id || !data.lokasi_id || !data.tgl_pelaksanaan) {
        session.flash('error', 'Semua field wajib diisi')
        return response.redirect().back()
      }

      await Kegiatan.create(data)
      session.flash('success', 'Kegiatan berhasil ditambahkan')
      return response.redirect('/kegiatan')
    } catch (error) {
      console.error('Error creating kegiatan:', error)
      session.flash('error', 'Gagal menambahkan kegiatan: ' + (error.message || 'Unknown error'))
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.query()
        .where('id', params.id)
        .preload('organisasi')
        .preload('lokasi')
        .preload('kepanitiaans', (query) => {
          query.preload('anggota')
        })
        .firstOrFail()

      return view.render('kegiatan/show', { kegiatan })
    } catch (error) {
      throw new Error('Kegiatan tidak ditemukan')
    }
  }

  async edit({ params, view }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.findOrFail(params.id)
      const organisasis = await Organisasi.all()
      const lokasis = await Lokasi.all()
      
      return view.render('kegiatan/edit', { kegiatan, organisasis, lokasis })
    } catch (error) {
      throw new Error('Kegiatan tidak ditemukan')
    }
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.findOrFail(params.id)
      const data = request.only(['nama', 'deskripsi', 'tgl_pelaksanaan', 'organisasi_id', 'lokasi_id'])
      
      // Validasi data
      if (!data.nama || !data.organisasi_id || !data.lokasi_id || !data.tgl_pelaksanaan) {
        session.flash('error', 'Semua field wajib diisi')
        return response.redirect().back()
      }

      kegiatan.merge(data)
      await kegiatan.save()
      session.flash('success', 'Kegiatan berhasil diperbarui')
      return response.redirect('/kegiatan')
    } catch (error) {
      console.error('Error updating kegiatan:', error)
      session.flash('error', 'Gagal memperbarui kegiatan: ' + (error.message || 'Unknown error'))
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.findOrFail(params.id)
      await kegiatan.delete()
      session.flash('success', 'Kegiatan berhasil dihapus')
    } catch (error) {
      console.error('Error deleting kegiatan:', error)
      session.flash('error', 'Gagal menghapus kegiatan: ' + (error.message || 'Unknown error'))
    }
    
    return response.redirect('/kegiatan')
  }
}