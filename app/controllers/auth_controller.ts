import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async register({ request, response, session }: HttpContext) {
    try {
      const data = request.only(['name', 'email', 'password'])
      
      // Check if user already exists
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        session.flash('error', 'Email sudah terdaftar')
        return response.redirect().back()
      }

      // Create new user
      const user = await User.create(data)
      
      session.flash('success', 'Registrasi berhasil! Silakan login.')
      return response.redirect('/login')
    } catch (error) {
      console.error('Registration error:', error)
      session.flash('error', 'Terjadi kesalahan saat registrasi')
      return response.redirect().back()
    }
  }

  async login({ request, response, session }: HttpContext) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      
      if (!email || !password) {
        session.flash('error', 'Email dan password harus diisi')
        return response.redirect().back()
      }

      const user = await User.findBy('email', email)
      
      if (!user) {
        session.flash('error', 'Email atau password salah')
        return response.redirect().back()
      }

      const isValidPassword = await hash.verify(user.password, password)
      
      if (!isValidPassword) {
        session.flash('error', 'Email atau password salah')
        return response.redirect().back()
      }

      // Set session data
      session.put('user_id', user.id)
      session.put('user_name', user.name)
      session.put('user_email', user.email)
      
      session.flash('success', `Selamat datang, ${user.name}!`)
      return response.redirect('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      session.flash('error', 'Terjadi kesalahan saat login')
      return response.redirect().back()
    }
  }

  async logout({ response, session }: HttpContext) {
    session.forget('user_id')
    session.forget('user_name')
    session.forget('user_email')
    
    session.flash('success', 'Logout berhasil')
    return response.redirect('/login')
  }
}