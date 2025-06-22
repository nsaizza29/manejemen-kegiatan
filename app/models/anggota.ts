import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Organisasi from './organisasi.js'
import Kepanitiaan from './kepanitiaan.js'

export default class Anggota extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare nim: string

  @column()
  declare jenis_kelamin: string

  @column()
  declare organisasi_id: number

  @column()
  declare email: string

  @column()
  declare no_telepon: string | null

  @column()
  declare alamat: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Organisasi, {
    foreignKey: 'organisasi_id'
  })
  declare organisasi: BelongsTo<typeof Organisasi>

  @hasMany(() => Kepanitiaan, {
    foreignKey: 'anggota_id'
  })
  declare kepanitiaans: HasMany<typeof Kepanitiaan>
}