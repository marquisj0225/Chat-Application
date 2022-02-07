import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('channels', function (table) {
    table.increments('id');
    table.string('name', 255).nullable();
    table.string('description', 255).nullable();
    table.integer('creator_user_id').unsigned();
    table.foreign('creator_user_id').references('users.id');

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('channels');
}
