import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Organisasi from './organisasi.js'
import Lokasi from './lokasi.js'
import Kepanitiaan from './kepanitiaan.js'

export default class Kegiatan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare deskripsi: string

  @column.date()
  declare tgl_pelaksanaan: DateTime

  @column()
  declare organisasi_id: number

  @column()
  declare lokasi_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Organisasi, { foreignKey: 'organisasi_id' })
  declare organisasi: BelongsTo<typeof Organisasi>

  @belongsTo(() => Lokasi, { foreignKey: 'lokasi_id' })
  declare lokasi: BelongsTo<typeof Lokasi>

  @hasMany(() => Kepanitiaan, { foreignKey: 'kegiatan_id' })
  declare kepanitiaans: HasMany<typeof Kepanitiaan>
}