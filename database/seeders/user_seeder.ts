import User from '#models/User' // Pakai alias #models
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class UserSeeder {
  public async run() {
    // Admin user
    await User.create({
      email: 'admin@example.com',
      password: await hash.make('admin123'),
      name: 'Administrator',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    })

    // Regular user
    await User.create({
      email: 'user@example.com',
      password: await hash.make('user123'),
      name: 'User Regular',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    })

    // Test user
    await User.create({
      email: 'test@example.com',
      password: await hash.make('test123'),
      name: 'Test User',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    })
  }
}