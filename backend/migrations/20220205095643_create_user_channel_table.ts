import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_channel', function (table) {
    table.increments('id');
    table.integer('user_id').unsigned();
    table.integer('channel_id').unsigned();

    table.primary(['user_id', 'channel_id']);

    table.foreign('user_id').references('users.id');
    table.foreign('channel_id').references('channels.id');

    table.dateTime('joining_date').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_channel');
}
