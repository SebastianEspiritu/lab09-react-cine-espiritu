import shutil
import tempfile
from decimal import Decimal
from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import call_command
from django.test import override_settings
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Category, Product

TEMP_MEDIA = tempfile.mkdtemp()


def png_file(name='test.png'):
    buffer = BytesIO()
    Image.new('RGB', (20, 20), (255, 0, 0)).save(buffer, format='PNG')
    return SimpleUploadedFile(name, buffer.getvalue(), content_type='image/png')


@override_settings(MEDIA_ROOT=TEMP_MEDIA)
class CatalogApiTests(APITestCase):

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(TEMP_MEDIA, ignore_errors=True)

    def setUp(self):
        self.snacks = Category.objects.create(name='Snacks', slug='snacks', description='Popcorn and more')
        self.drinks = Category.objects.create(name='Drinks', slug='drinks', description='Cold drinks')
        self.popcorn = Product.objects.create(
            category=self.snacks, name='Large Popcorn', price=Decimal('18.50'), stock=10
        )
        Product.objects.create(category=self.drinks, name='Large Soda', price=Decimal('12.00'), stock=0)

    def test_product_list_nests_the_category(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        popcorn = next(item for item in response.data if item['name'] == 'Large Popcorn')
        self.assertEqual(popcorn['category'], {
            'id': self.snacks.id, 'name': 'Snacks', 'slug': 'snacks', 'description': 'Popcorn and more',
        })
        self.assertTrue(popcorn['is_available'])

    def test_product_list_uses_a_single_query(self):
        with self.assertNumQueries(1):
            self.client.get('/api/products/')

    def test_filter_by_category_id_and_slug(self):
        by_id = self.client.get(f'/api/products/?category={self.drinks.id}')
        by_slug = self.client.get('/api/products/?category=snacks')
        self.assertEqual([item['name'] for item in by_id.data], ['Large Soda'])
        self.assertEqual([item['name'] for item in by_slug.data], ['Large Popcorn'])

    def test_categories_include_product_count(self):
        response = self.client.get('/api/categories/')
        counts = {item['slug']: item['product_count'] for item in response.data}
        self.assertEqual(counts, {'drinks': 1, 'snacks': 1})

    def test_create_product_with_json(self):
        payload = {'name': 'Nachos', 'price': '16.00', 'stock': 5, 'category_id': self.snacks.id}
        response = self.client.post('/api/products/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['category']['name'], 'Snacks')

    def test_create_product_with_image(self):
        payload = {'name': 'Mug', 'price': '29.90', 'stock': '3', 'category_id': self.drinks.id, 'image': png_file()}
        response = self.client.post('/api/products/', payload, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['image'].startswith('http://testserver/media/products/'))

    def test_invalid_product_returns_field_errors(self):
        payload = {'name': '', 'price': '-1', 'stock': -2, 'category_id': 999}
        response = self.client.post('/api/products/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        for field in ('name', 'price', 'stock', 'category_id'):
            self.assertIn(field, response.data)

    def test_update_product(self):
        response = self.client.patch(
            f'/api/products/{self.popcorn.id}/',
            {'price': '20.00', 'category_id': self.drinks.id},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['price'], '20.00')
        self.assertEqual(response.data['category']['slug'], 'drinks')

    def test_delete_product(self):
        response = self.client.delete(f'/api/products/{self.popcorn.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(pk=self.popcorn.id).exists())

    def test_category_with_products_cannot_be_deleted(self):
        response = self.client.delete(f'/api/categories/{self.snacks.id}/')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    def test_seed_command_creates_catalog_with_images(self):
        call_command('seed_catalog', verbosity=0)
        call_command('seed_catalog', verbosity=0)  # idempotent
        self.assertEqual(Category.objects.count(), 3)
        self.assertEqual(Product.objects.filter(name__in=['Large Popcorn', 'Mineral Water']).count(), 2)
        self.assertGreaterEqual(Product.objects.exclude(image='').count(), 9)
