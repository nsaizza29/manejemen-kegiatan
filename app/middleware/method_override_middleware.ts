import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class MethodOverrideMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const body = ctx.request.body()
    
    if (
      ctx.request.method() === 'POST' &&
      body &&
      body['_method']
    ) {
      const method = body['_method'].toUpperCase()
      if (['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        // Override the method by modifying the request object
        ctx.request.request.method = method
      }
    }
    
    await next()
  }
} 