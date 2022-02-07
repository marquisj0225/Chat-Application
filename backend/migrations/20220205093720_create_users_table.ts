import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('first_name', 255).nullable();
    table.string('last_name', 255).nullable();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('photoURL', 255).nullable();
    table.string('email', 255).notNullable().unique();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
