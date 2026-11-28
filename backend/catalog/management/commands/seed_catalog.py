"""
Create the demo catalog: 3 categories and 9 products, each with an image.

Run it as many times as you want: existing rows are updated, not duplicated.
The images are generated with Pillow, so no files have to be downloaded.
"""
from decimal import Decimal
from io import BytesIO

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction
from PIL import Image, ImageDraw, ImageFont

from catalog.models import Category, Product

CATEGORIES = [
    {
        'name': 'Snacks',
        'slug': 'snacks',
        'description': 'Popcorn, nachos and sweets to enjoy during the movie.',
        'colors': ('#F6B93B', '#E55039'),
    },
    {
        'name': 'Drinks',
        'slug': 'drinks',
        'description': 'Cold drinks and hot coffee for every showtime.',
        'colors': ('#4A69BD', '#0C2461'),
    },
    {
        'name': 'Merchandise',
        'slug': 'merchandise',
        'description': 'Posters, mugs and shirts of Cinema Espiritu.',
        'colors': ('#78E08F', '#079992'),
    },
]

PRODUCTS = [
    ('snacks', 'Large Popcorn', 'Fresh buttered popcorn in a 130 oz bucket.', '18.50', 40),
    ('snacks', 'Cheese Nachos', 'Crunchy nachos with warm cheese sauce and jalapeños.', '16.00', 25),
    ('snacks', 'Chocolate Bar', 'Milk chocolate bar, 90 g.', '6.50', 60),
    ('drinks', 'Large Soda', 'Refillable 32 oz soda, choose your flavor at the counter.', '12.00', 80),
    ('drinks', 'Mineral Water', 'Still mineral water, 625 ml.', '5.00', 100),
    ('drinks', 'Iced Coffee', 'Cold brew coffee with milk and caramel.', '11.00', 0),
    ('merchandise', 'Beyond Orion Poster', 'Official 60 x 90 cm poster printed on matte paper.', '25.00', 15),
    ('merchandise', 'Cinema Espiritu Mug', 'Ceramic mug with the Cinema Espiritu logo, 350 ml.', '29.90', 12),
    ('merchandise', 'Midnight Train T-Shirt', 'Black cotton t-shirt with the Midnight Train artwork.', '45.00', 8),
]


def hex_to_rgb(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def load_font(size):
    try:
        return ImageFont.load_default(size=size)
    except TypeError:  # Pillow < 10.1
        return ImageFont.load_default()


def build_image(title, category_name, colors, size=600):
    """Vertical gradient with the product name and its category."""
    top, bottom = hex_to_rgb(colors[0]), hex_to_rgb(colors[1])
    image = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(image)
    for y in range(size):
        ratio = y / (size - 1)
        color = tuple(int(top[i] + (bottom[i] - top[i]) * ratio) for i in range(3))
        draw.line([(0, y), (size, y)], fill=color)

    draw.ellipse([size * 0.3, size * 0.14, size * 0.7, size * 0.54], fill=(255, 255, 255))
    initials = ''.join(word[0] for word in title.split()[:2]).upper()
    initial_font = load_font(120)
    draw.text((size / 2, size * 0.34), initials, font=initial_font, fill=bottom, anchor='mm')

    title_font = load_font(44)
    label_font = load_font(28)
    draw.text((size / 2, size * 0.70), title, font=title_font, fill=(255, 255, 255), anchor='mm')
    draw.text((size / 2, size * 0.80), category_name.upper(), font=label_font, fill=(255, 255, 255), anchor='mm')

    buffer = BytesIO()
    image.save(buffer, format='PNG')
    return buffer.getvalue()


def slugify_name(name):
    return name.lower().replace(' ', '-')


class Command(BaseCommand):
    help = 'Create 3 categories and 9 products with generated images.'

    @transaction.atomic
    def handle(self, *args, **options):
        categories = {}
        for data in CATEGORIES:
            category, _ = Category.objects.update_or_create(
                slug=data['slug'],
                defaults={'name': data['name'], 'description': data['description']},
            )
            categories[data['slug']] = (category, data['colors'])

        created = 0
        for slug, name, description, price, stock in PRODUCTS:
            category, colors = categories[slug]
            product, was_created = Product.objects.update_or_create(
                name=name,
                defaults={
                    'category': category,
                    'description': description,
                    'price': Decimal(price),
                    'stock': stock,
                },
            )
            created += was_created
            if not product.image:
                png = build_image(name, category.name, colors)
                product.image.save(f'{slugify_name(name)}.png', ContentFile(png), save=True)

        self.stdout.write(self.style.SUCCESS(
            f'Catalog ready: {Category.objects.count()} categories, '
            f'{Product.objects.count()} products ({created} new).'
        ))
