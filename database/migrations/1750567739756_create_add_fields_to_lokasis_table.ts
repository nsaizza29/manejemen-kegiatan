import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lokasis'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('kapasitas').defaultTo(0)
      table.text('deskripsi').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('kapasitas')
      table.dropColumn('deskripsi')
    })
  }
}