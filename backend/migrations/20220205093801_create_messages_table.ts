import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', function (table) {
    table.increments('id');
    table.string('content', 500);
    table.integer('content_type', 2).defaultTo(1).notNullable().comment('1 text, 2 gif');
    table.integer('channel_id').unsigned();
    table.foreign('channel_id').references('channels.id');
    table.integer('sender_user_id').unsigned();
    table.foreign('sender_user_id').references('users.id');

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}
