import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kegiatan from './kegiatan.js'
import Anggota from './anggota.js'

export default class Kepanitiaan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare kegiatan_id: number

  @column()
  declare anggota_id: number

  @column()
  declare jabatan: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Kegiatan, { foreignKey: 'kegiatan_id' })
  declare kegiatan: BelongsTo<typeof Kegiatan>

  @belongsTo(() => Anggota, { foreignKey: 'anggota_id' })
  declare anggota: BelongsTo<typeof Anggota>
}