from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Movie

ALLOWED_ORIGIN = 'http://localhost:5173'
OTHER_ORIGIN = 'http://evil.example.com'


@override_settings(CORS_ALLOWED_ORIGINS=[ALLOWED_ORIGIN])
class MovieApiTests(APITestCase):
    url = '/api/movies/'

    def setUp(self):
        self.movie = Movie.objects.create(
            name='Beyond Orion', age_rating='PG-13', score=84, show_times='14:00 17:00'
        )

    def test_list_returns_movies_with_adapter_field_names(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['movie_id'], self.movie.id)
        self.assertEqual(response.data[0]['name'], 'Beyond Orion')

    def test_create_movie(self):
        payload = {'name': '  Paper Wings ', 'age_rating': 'G', 'score': 76, 'show_times': '12:00 14:30'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Paper Wings')
        self.assertEqual(Movie.objects.count(), 2)

    def test_create_with_blank_name_returns_field_error(self):
        response = self.client.post(self.url, {'name': ''}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_create_with_invalid_score_and_times_returns_errors(self):
        payload = {'name': 'Neon Harbor', 'score': 150, 'show_times': '25:00'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('score', response.data)
        self.assertIn('show_times', response.data)

    def test_delete_movie(self):
        response = self.client.delete(f'{self.url}{self.movie.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Movie.objects.exists())

    def test_cors_header_for_allowed_origin(self):
        response = self.client.get(self.url, HTTP_ORIGIN=ALLOWED_ORIGIN)
        self.assertEqual(response.headers.get('Access-Control-Allow-Origin'), ALLOWED_ORIGIN)

    def test_no_cors_header_for_other_origin(self):
        response = self.client.get(self.url, HTTP_ORIGIN=OTHER_ORIGIN)
        self.assertNotIn('Access-Control-Allow-Origin', response.headers)

    def test_preflight_for_allowed_origin(self):
        response = self.client.options(
            self.url,
            HTTP_ORIGIN=ALLOWED_ORIGIN,
            HTTP_ACCESS_CONTROL_REQUEST_METHOD='POST',
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS='content-type',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.headers.get('Access-Control-Allow-Origin'), ALLOWED_ORIGIN)
