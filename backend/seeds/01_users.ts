import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Teodoro',
      last_name: 'B. Talley',
      username: 'Awithist',
      password: 'boo9ook4Oo',
      email: 'teodoroBTalley@rhyta.com',
      photoURL:
        'https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg',
    },
    {
      id: 2,
      first_name: 'Mary',
      last_name: 'W. Ruley',
      username: 'Whowerromed',
      password: 'ahv6aiJi',
      email: 'MaryWRuley@rhyta.com',
      photoURL: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg',
    },
    {
      id: 3,
      first_name: 'George',
      last_name: 'B. Phillips',
      username: 'Murs1984',
      password: 'eHeeCh8jue',
      email: 'GeorgeBPhillips@jourrapide.com',
      photoURL: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg',
    },
    {
      id: 4,
      first_name: 'Joanne',
      last_name: 'R. Rhodes',
      username: 'Sioneve',
      password: 'zeod1ooTh',
      email: 'JoanneRRhodes@armyspy.com',
      photoURL: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg',
    },
  ]);

}
