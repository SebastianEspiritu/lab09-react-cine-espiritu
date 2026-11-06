// Fictional demo movies. Classifications and ratings are illustrative.
// Ratings use a 0-10 scale; showtimes use the 24-hour HH:mm format.
const movies = [
  {
    "id": "beyond-orion",
    "title": "Beyond Orion",
    "image": `${import.meta.env.BASE_URL}images/movies/beyond-orion.svg`,
    "synopsis": "A pilot follows a mysterious signal beyond the last inhabited star system.",
    "classification": "PG-13",
    "rating": 8.4,
    "showtimes": [
      "14:00",
      "17:00",
      "20:00"
    ]
  },
  {
    "id": "the-last-lighthouse",
    "title": "The Last Lighthouse",
    "image": `${import.meta.env.BASE_URL}images/movies/the-last-lighthouse.svg`,
    "synopsis": "A lighthouse keeper and her son race to guide a missing ship home before dawn.",
    "classification": "PG",
    "rating": 7.8,
    "showtimes": [
      "13:30",
      "16:00",
      "18:30"
    ]
  },
  {
    "id": "midnight-train",
    "title": "Midnight Train",
    "image": `${import.meta.env.BASE_URL}images/movies/midnight-train.svg`,
    "synopsis": "A detective boards an overnight train where every passenger hides a clue.",
    "classification": "PG-13",
    "rating": 8.1,
    "showtimes": [
      "16:30",
      "19:00",
      "21:30"
    ]
  },
  {
    "id": "paper-wings",
    "title": "Paper Wings",
    "image": `${import.meta.env.BASE_URL}images/movies/paper-wings.svg`,
    "synopsis": "Two siblings build a flying machine to enter their town's annual invention contest.",
    "classification": "G",
    "rating": 7.6,
    "showtimes": [
      "12:00",
      "14:30",
      "17:00"
    ]
  },
  {
    "id": "desert-echoes",
    "title": "Desert Echoes",
    "image": `${import.meta.env.BASE_URL}images/movies/desert-echoes.svg`,
    "synopsis": "An archaeologist discovers a buried city and must protect its fragile water source.",
    "classification": "PG-13",
    "rating": 8.0,
    "showtimes": [
      "15:00",
      "18:00",
      "21:00"
    ]
  },
  {
    "id": "the-hidden-garden",
    "title": "The Hidden Garden",
    "image": `${import.meta.env.BASE_URL}images/movies/the-hidden-garden.svg`,
    "synopsis": "A young gardener finds a secret courtyard that brings a divided neighborhood together.",
    "classification": "G",
    "rating": 7.9,
    "showtimes": [
      "12:30",
      "15:00",
      "17:30"
    ]
  },
  {
    "id": "city-of-rhythm",
    "title": "City of Rhythm",
    "image": `${import.meta.env.BASE_URL}images/movies/city-of-rhythm.svg`,
    "synopsis": "A street musician forms an unlikely band to save a neighborhood music hall.",
    "classification": "PG",
    "rating": 8.2,
    "showtimes": [
      "14:00",
      "16:30",
      "19:00"
    ]
  },
  {
    "id": "after-the-storm",
    "title": "After the Storm",
    "image": `${import.meta.env.BASE_URL}images/movies/after-the-storm.svg`,
    "synopsis": "Three old friends reunite to rebuild a coastal workshop after a powerful storm.",
    "classification": "PG-13",
    "rating": 7.7,
    "showtimes": [
      "15:30",
      "18:30",
      "21:00"
    ]
  }
]

export default movies
