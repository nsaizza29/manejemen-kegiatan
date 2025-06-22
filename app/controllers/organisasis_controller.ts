import { HttpContext } from '@adonisjs/core/http'
import Organisasi from '#models/organisasi'

export default class OrganisasisController {
  async index({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    return view.render('organisasi/index', { organisasis })
  }

  async create({ view }: HttpContext) {
    return view.render('organisasi/create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = request.only(['nama_organisasi', 'jenis', 'deskripsi', 'alamat', 'no_telepon'])
    
    try {
      await Organisasi.create(data)
      session.flash('success', 'Organisasi berhasil ditambahkan')
      return response.redirect('/organisasi')
    } catch (error) {
      session.flash('error', 'Gagal menambahkan organisasi')
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    try {
      const organisasi = await Organisasi.findOrFail(params.id)
      
      // Load relasi dengan error handling
      try {
        await organisasi.load('anggotas')
      } catch (error) {
        // Jika relasi anggotas gagal, set sebagai array kosong
        organisasi.$extras.anggotas = []
      }
      
      try {
        await organisasi.load('kegiatans', (query) => {
          query.preload('lokasi')
        })
      } catch (error) {
        // Jika relasi kegiatans gagal, set sebagai array kosong
        organisasi.$extras.kegiatans = []
      }
      
      return view.render('organisasi/show', { organisasi })
    } catch (error) {
      // Jika organisasi tidak ditemukan
      return view.render('pages/errors/not_found')
    }
  }

  async edit({ params, view }: HttpContext) {
    const organisasi = await Organisasi.findOrFail(params.id)
    return view.render('organisasi/edit', { organisasi })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const organisasi = await Organisasi.findOrFail(params.id)
      const data = request.only(['nama_organisasi', 'jenis', 'deskripsi', 'alamat', 'no_telepon'])
      
      organisasi.merge(data)
      await organisasi.save()
      
      session.flash('success', 'Organisasi berhasil diperbarui')
      return response.redirect('/organisasi')
    } catch (error) {
      console.error('Update error:', error)
      session.flash('error', 'Gagal memperbarui organisasi')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const organisasi = await Organisasi.findOrFail(params.id)
      await organisasi.delete()
      session.flash('success', 'Organisasi berhasil dihapus')
    } catch (error) {
      session.flash('error', 'Gagal menghapus organisasi')
    }
    
    return response.redirect('/organisasi')
  }
}