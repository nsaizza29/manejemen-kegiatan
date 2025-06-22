/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', ({ response }) => {
  return response.redirect('/login')
})

// Auth routes
router.get('/login', async ({ view, session }) => {
  return view.render('auth/login')
})

router.post('/login', '#controllers/auth_controller.login')

router.get('/register', async ({ view }) => {
  return view.render('auth/register')
})

router.post('/register', '#controllers/auth_controller.register')

router.post('/logout', '#controllers/auth_controller.logout')

// Protected routes
router.get('/dashboard', '#controllers/dashboard_controller.index')

// Organisasi routes
router.get('/organisasi', '#controllers/organisasis_controller.index')
router.get('/organisasi/create', '#controllers/organisasis_controller.create')
router.post('/organisasi', '#controllers/organisasis_controller.store')
router.get('/organisasi/:id', '#controllers/organisasis_controller.show')
router.get('/organisasi/:id/edit', '#controllers/organisasis_controller.edit')
router.post('/organisasi/:id/update', '#controllers/organisasis_controller.update')
router.post('/organisasi/:id/delete', '#controllers/organisasis_controller.destroy')

// Lokasi routes
router.get('/lokasi', '#controllers/lokasis_controller.index')
router.get('/lokasi/create', '#controllers/lokasis_controller.create')
router.post('/lokasi', '#controllers/lokasis_controller.store')
router.get('/lokasi/:id', '#controllers/lokasis_controller.show')
router.get('/lokasi/:id/edit', '#controllers/lokasis_controller.edit')
router.post('/lokasi/:id/update', '#controllers/lokasis_controller.update')
router.post('/lokasi/:id/delete', '#controllers/lokasis_controller.destroy')

// Kegiatan routes
router.get('/kegiatan', '#controllers/kegiatans_controller.index')
router.get('/kegiatan/create', '#controllers/kegiatans_controller.create')
router.post('/kegiatan', '#controllers/kegiatans_controller.store')
router.get('/kegiatan/:id', '#controllers/kegiatans_controller.show')
router.get('/kegiatan/:id/edit', '#controllers/kegiatans_controller.edit')
router.post('/kegiatan/:id/update', '#controllers/kegiatans_controller.update')
router.post('/kegiatan/:id/delete', '#controllers/kegiatans_controller.destroy')

// Anggota routes
router.get('/anggota', '#controllers/anggotas_controller.index')
router.get('/anggota/create', '#controllers/anggotas_controller.create')
router.post('/anggota', '#controllers/anggotas_controller.store')
router.get('/anggota/:id', '#controllers/anggotas_controller.show')
router.get('/anggota/:id/edit', '#controllers/anggotas_controller.edit')
router.post('/anggota/:id/update', '#controllers/anggotas_controller.update')
router.post('/anggota/:id/delete', '#controllers/anggotas_controller.destroy')

// Kepanitiaan routes
router.get('/kepanitiaan', '#controllers/kepanitiaans_controller.index')
router.get('/kepanitiaan/create', '#controllers/kepanitiaans_controller.create')
router.post('/kepanitiaan', '#controllers/kepanitiaans_controller.store')
router.get('/kepanitiaan/:id', '#controllers/kepanitiaans_controller.show')
router.get('/kepanitiaan/:id/edit', '#controllers/kepanitiaans_controller.edit')
router.post('/kepanitiaan/:id/update', '#controllers/kepanitiaans_controller.update')
router.post('/kepanitiaan/:id/delete', '#controllers/kepanitiaans_controller.destroy')

// Laporan routes
router.get('/laporan', '#controllers/laporans_controller.index')
