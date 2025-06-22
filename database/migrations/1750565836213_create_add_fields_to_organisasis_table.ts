import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organisasis'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('deskripsi').nullable()
      table.text('alamat').nullable()
      table.string('no_telepon').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('deskripsi')
      table.dropColumn('alamat')
      table.dropColumn('no_telepon')
    })
  }
}