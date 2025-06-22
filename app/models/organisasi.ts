import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Kegiatan from './kegiatan.js'
import Anggota from './anggota.js'

export default class Organisasi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_organisasi: string

  @column()
  declare jenis: string

  @column()
  declare deskripsi: string | null

  @column()
  declare alamat: string | null

  @column()
  declare no_telepon: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Kegiatan, {
    foreignKey: 'organisasi_id'
  })
  declare kegiatans: HasMany<typeof Kegiatan>

  @hasMany(() => Anggota, {
    foreignKey: 'organisasi_id'
  })
  declare anggotas: HasMany<typeof Anggota>
}