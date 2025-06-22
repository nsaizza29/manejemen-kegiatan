import { HttpContext } from '@adonisjs/core/http'

export default class GuestMiddleware {
  async handle({ session, response }: HttpContext, next: () => Promise<void>) {
    const userId = session.get('user_id')
    if (userId) {
      return response.redirect('/dashboard')
    }
    await next()
  }
} 