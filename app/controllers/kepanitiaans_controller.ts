import { HttpContext } from '@adonisjs/core/http'
import Kepanitiaan from '#models/kepanitiaan'
import Kegiatan from '#models/kegiatan'
import Anggota from '#models/anggota'
import Organisasi from '#models/organisasi'

export default class KepanitiaansController {
  async index({ view, request }: HttpContext) {
    const kegiatanId = request.input('kegiatan_id')
    
    if (!kegiatanId) {
      return view.render('kepanitiaan/index', { kepanitiaans: [], kegiatan: null })
    }

    const kegiatan = await Kegiatan.query()
      .where('id', kegiatanId)
      .preload('organisasi')
      .preload('lokasi')
      .firstOrFail()

    const kepanitiaans = await Kepanitiaan.query()
      .where('kegiatan_id', kegiatanId)
      .preload('anggota', (query) => {
        query.preload('organisasi')
      })

    return view.render('kepanitiaan/index', { kepanitiaans, kegiatan })
  }

  async create({ view, request }: HttpContext) {
    const kegiatanId = request.input('kegiatan_id')
    const kegiatan = await Kegiatan.query()
      .where('id', kegiatanId)
      .preload('organisasi')
      .preload('lokasi')
      .firstOrFail()
    const anggotas = await Anggota.query().preload('organisasi')
    
    return view.render('kepanitiaan/create', { kegiatan, anggotas })
  }

  async store({ request, response, session }: HttpContext) {
    const data = request.only(['kegiatan_id', 'anggota_id', 'jabatan'])
    
    try {
      await Kepanitiaan.create(data)
      session.flash('success', 'Panitia berhasil ditambahkan')
      return response.redirect(`/kegiatan/${data.kegiatan_id}`)
    } catch (error) {
      session.flash('error', 'Gagal menambahkan panitia')
      return response.redirect().back()
    }
  }

  async edit({ params, view }: HttpContext) {
    const kepanitiaan = await Kepanitiaan.query()
      .where('id', params.id)
      .preload('kegiatan')
      .preload('anggota')
      .firstOrFail()

    const anggotas = await Anggota.query().preload('organisasi')
    
    return view.render('kepanitiaan/edit', { kepanitiaan, anggotas })
  }

  async update({ params, request, response, session }: HttpContext) {
    const kepanitiaan = await Kepanitiaan.findOrFail(params.id)
    const data = request.only(['anggota_id', 'jabatan'])
    
    try {
      kepanitiaan.merge(data)
      await kepanitiaan.save()
      session.flash('success', 'Panitia berhasil diperbarui')
      return response.redirect(`/kegiatan/${kepanitiaan.kegiatan_id}`)
    } catch (error) {
      session.flash('error', 'Gagal memperbarui panitia')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    const kepanitiaan = await Kepanitiaan.findOrFail(params.id)
    const kegiatanId = kepanitiaan.kegiatan_id
    
    try {
      await kepanitiaan.delete()
      session.flash('success', 'Panitia berhasil dihapus')
    } catch (error) {
      session.flash('error', 'Gagal menghapus panitia')
    }
    
    return response.redirect(`/kegiatan/${kegiatanId}`)
  }
}