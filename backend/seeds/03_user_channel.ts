import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_channel').del();

  // Inserts seed entries
  await knex('user_channel').insert([
    {
      user_id: 1,
      channel_id: 1,
      joining_date: knex.fn.now(),
    },
    {
      user_id: 1,
      channel_id: 2,
      joining_date: knex.fn.now(),
    },
    {
      user_id: 2,
      channel_id: 1,
      joining_date: knex.fn.now(),
    },
    {
      user_id: 3,
      channel_id: 1,
      joining_date: knex.fn.now(),
    },
    {
      user_id: 3,
      channel_id: 2,
      joining_date: knex.fn.now(),
    },
    {
      user_id: 4,
      channel_id: 1,
      joining_date: knex.fn.now(),
    },
    {
      user_id: 4,
      channel_id: 2,
      joining_date: knex.fn.now(),
    },
  ]);
}
