import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kegiatans'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('status', ['aktif', 'nonaktif']).defaultTo('aktif')
    })
  }
}