import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('overview', models.TextField(blank=True)),
                ('poster_file', models.CharField(blank=True, max_length=80)),
                ('age_rating', models.CharField(choices=[('G', 'G'), ('PG', 'PG'), ('PG-13', 'PG-13'), ('R', 'R'), ('NR', 'Not rated')], default='NR', max_length=5)),
                ('score', models.PositiveSmallIntegerField(default=0, help_text='Audience score from 0 to 100.', validators=[django.core.validators.MaxValueValidator(100)])),
                ('show_times', models.CharField(blank=True, max_length=120, validators=[django.core.validators.RegexValidator(message='Use 24-hour times separated by spaces, for example "14:00 17:30".', regex='^(?:(?:[01]\\d|2[0-3]):[0-5]\\d(?: (?:[01]\\d|2[0-3]):[0-5]\\d)*)?$')])),
                ('release_date', models.DateField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]
