// Raw premiere records, same shape as the listings plus a release date.
// The fake API in src/lib/api.js returns them after a delay. All fictional.
const rawPremieres = [
  {
    movie_id: 'neon-harbor',
    name: 'Neon Harbor',
    poster_file: 'neon-harbor.svg',
    overview: 'A night-shift mechanic finds a map hidden inside a stolen drone.',
    age_rating: 'PG-13',
    score: 0,
    show_times: '',
    release_date: '2026-12-04',
  },
  {
    movie_id: 'the-glass-forest',
    name: 'The Glass Forest',
    poster_file: 'the-glass-forest.svg',
    overview: 'Two sisters follow the sound of bells into a forest that remembers everything.',
    age_rating: 'PG',
    score: 0,
    show_times: '',
    release_date: '2026-12-18',
  },
  {
    movie_id: 'echo-of-mars',
    name: 'Echo of Mars',
    poster_file: 'echo-of-mars.svg',
    overview: 'The last crew on a red-planet station hears a voice from the first mission.',
    age_rating: 'PG-13',
    score: 0,
    show_times: '',
    release_date: '2027-01-08',
  },
  {
    movie_id: 'winter-carnival',
    name: 'Winter Carnival',
    poster_file: 'winter-carnival.svg',
    overview: 'A small town rebuilds its frozen fair in one week to save the old carousel.',
    age_rating: 'G',
    score: 0,
    show_times: '',
    release_date: '2027-01-22',
  },
]

export default rawPremieres
