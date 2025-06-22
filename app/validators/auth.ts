import vine from '@vinejs/vine'

export const AuthValidator = {
  login: vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(6),
    })
  ),

  register: vine.compile(
    vine.object({
      name: vine.string().minLength(3),
      email: vine.string().email(),
      password: vine.string().minLength(6),
      password_confirmation: vine.string().sameAs('password'),
    })
  ),
}