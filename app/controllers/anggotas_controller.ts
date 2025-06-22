import { HttpContext } from '@adonisjs/core/http'
import Anggota from '#models/anggota'
import Organisasi from '#models/organisasi'

export default class AnggotasController {
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    
    const query = Anggota.query()
      .preload('organisasi')

    // Filter berdasarkan organisasi
    if (request.input('organisasi')) {
      query.where('organisasi_id', request.input('organisasi'))
    }

    // Filter berdasarkan jenis kelamin
    if (request.input('jenis_kelamin')) {
      query.where('jenis_kelamin', request.input('jenis_kelamin'))
    }

    // Search berdasarkan nama atau NIM
    if (request.input('search')) {
      const search = request.input('search')
      query.where((query) => {
        query.where('nama', 'like', `%${search}%`)
          .orWhere('nim', 'like', `%${search}%`)
      })
    }

    const anggotas = await query.paginate(page, limit)
    const organisasis = await Organisasi.all()

    return view.render('anggota/index', { anggotas, organisasis })
  }

  async create({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    return view.render('anggota/create', { organisasis })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const data = request.only(['nama', 'nim', 'jenis_kelamin', 'organisasi_id', 'email', 'no_telepon', 'alamat'])
      
      // Validasi data
      if (!data.nama || !data.nim || !data.jenis_kelamin || !data.organisasi_id || !data.email) {
        session.flash('error', 'Semua field wajib diisi')
        return response.redirect().back()
      }

      await Anggota.create(data)
      session.flash('success', 'Anggota berhasil ditambahkan')
      return response.redirect('/anggota')
    } catch (error) {
      console.error('Error creating anggota:', error)
      session.flash('error', 'Gagal menambahkan anggota: ' + (error.message || 'Unknown error'))
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    try {
      const anggota = await Anggota.query()
        .where('id', params.id)
        .preload('organisasi')
        .preload('kepanitiaans', (query) => {
          query.preload('kegiatan')
        })
        .firstOrFail()

      return view.render('anggota/show', { anggota })
    } catch (error) {
      throw new Error('Anggota tidak ditemukan')
    }
  }

  async edit({ params, view }: HttpContext) {
    try {
      const anggota = await Anggota.findOrFail(params.id)
      const organisasis = await Organisasi.all()
      
      return view.render('anggota/edit', { anggota, organisasis })
    } catch (error) {
      throw new Error('Anggota tidak ditemukan')
    }
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const anggota = await Anggota.findOrFail(params.id)
      const data = request.only(['nama', 'nim', 'jenis_kelamin', 'organisasi_id', 'email', 'no_telepon', 'alamat'])
      
      // Validasi data
      if (!data.nama || !data.nim || !data.jenis_kelamin || !data.organisasi_id || !data.email) {
        session.flash('error', 'Semua field wajib diisi')
        return response.redirect().back()
      }

      anggota.merge(data)
      await anggota.save()
      session.flash('success', 'Anggota berhasil diperbarui')
      return response.redirect('/anggota')
    } catch (error) {
      console.error('Error updating anggota:', error)
      session.flash('error', 'Gagal memperbarui anggota: ' + (error.message || 'Unknown error'))
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const anggota = await Anggota.findOrFail(params.id)
      await anggota.delete()
      session.flash('success', 'Anggota berhasil dihapus')
    } catch (error) {
      console.error('Error deleting anggota:', error)
      session.flash('error', 'Gagal menghapus anggota: ' + (error.message || 'Unknown error'))
    }
    
    return response.redirect('/anggota')
  }
}