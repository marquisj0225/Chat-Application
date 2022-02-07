import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('channels').del();

  // Inserts seed entries
  await knex('channels').insert([
    {
      id: 1,
      name: 'general',
      description:
        "It's the only channel where everyone comes together. This is the perfect place to make announcements and conduct your team conversations.",
      creator_user_id: 1,
    },
    {
      id: 2,
      name: 'code-share',
      description: 'This is the perfect place to publish code, notes, and snippets',
      creator_user_id: 2,
    },
    {
      id: 3,
      name: 'company-culture',
      description: 'This is the perfect place to publish code, notes, and snippets',
      creator_user_id: 2,
    },
    {
      id: 4,
      name: 'daily-standup',
      description: 'This is the perfect place to publish code, notes, and snippets',
      creator_user_id: 2,
    },
    {
      id: 5,
      name: 'running',
      description: 'This is the perfect place to publish code, notes, and snippets',
      creator_user_id: 2,
    },
  ]);

}
