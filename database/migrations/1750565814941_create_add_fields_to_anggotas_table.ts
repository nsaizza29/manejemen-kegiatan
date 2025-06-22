import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anggotas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('jenis_kelamin').nullable()
      table.string('email').nullable()
      table.string('no_telepon').nullable()
      table.text('alamat').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('jenis_kelamin')
      table.dropColumn('email')
      table.dropColumn('no_telepon')
      table.dropColumn('alamat')
    })
  }
}