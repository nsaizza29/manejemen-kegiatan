import { HttpContext } from '@adonisjs/core/http'
import Lokasi from '#models/lokasi'

export default class LokasisController {
  async index({ view }: HttpContext) {
    try {
      console.log('=== INDEX METHOD CALLED ===')
      
      const allLokasis = await Lokasi.all()
      console.log('Found', allLokasis.length, 'lokasi records')
      
      const lokasis = {
        data: allLokasis,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: allLokasis.length,
          from: allLokasis.length > 0 ? 1 : 0,
          to: allLokasis.length,
          links: []
        }
      }
      
      return view.render('lokasi/index', { lokasis })
      
    } catch (error) {
      console.error('Error in index:', error)
      return view.render('lokasi/index', { 
        lokasis: {
          data: [],
          meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: 0,
            to: 0,
            links: []
          }
        }
      })
    }
  }

  async create({ view }: HttpContext) {
    return view.render('lokasi/create')
  }

  async store({ request, response, session }: HttpContext) {
    try {
      console.log('=== STORE METHOD CALLED ===')
      
      const nama_lokasi = request.input('nama_lokasi')
      const alamat = request.input('alamat')
      const kapasitas = request.input('kapasitas')
      const deskripsi = request.input('deskripsi')
      
      console.log('Data:', { nama_lokasi, alamat, kapasitas, deskripsi })
      
      if (!nama_lokasi || !alamat) {
        session.flash('error', 'Nama lokasi dan alamat wajib diisi')
        return response.redirect().back()
      }
      
      const lokasiData = {
        nama_lokasi: nama_lokasi,
        alamat: alamat,
        kapasitas: kapasitas ? parseInt(kapasitas) : 0,
        deskripsi: deskripsi || ''
      }
      
      const lokasi = await Lokasi.create(lokasiData)
      console.log('Lokasi created:', lokasi.toJSON())
      
      session.flash('success', 'Lokasi berhasil ditambahkan')
      return response.redirect('/lokasi')
      
    } catch (error) {
      console.error('Error in store:', error)
      session.flash('error', `Gagal menambahkan lokasi: ${error.message}`)
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    try {
      const lokasi = await Lokasi.findOrFail(params.id)
      await lokasi.load('kegiatans', (query) => {
        query.preload('organisasi')
      })
      return view.render('lokasi/show', { lokasi })
    } catch (error) {
      return view.render('pages/errors/not_found')
    }
  }

  async edit({ params, view }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    return view.render('lokasi/edit', { lokasi })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const lokasi = await Lokasi.findOrFail(params.id)
      const data = request.only(['nama_lokasi', 'alamat', 'kapasitas', 'deskripsi'])
      
      if (data.kapasitas) {
        data.kapasitas = parseInt(data.kapasitas as string)
      }
      
      lokasi.merge(data)
      await lokasi.save()
      
      session.flash('success', 'Lokasi berhasil diperbarui')
      return response.redirect('/lokasi')
    } catch (error) {
      console.error('Update error:', error)
      session.flash('error', 'Gagal memperbarui lokasi')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const lokasi = await Lokasi.findOrFail(params.id)
      await lokasi.delete()
      session.flash('success', 'Lokasi berhasil dihapus')
    } catch (error) {
      session.flash('error', 'Gagal menghapus lokasi')
    }
    
    return response.redirect('/lokasi')
  }
} 