from django.core.validators import MaxValueValidator, RegexValidator
from django.db import models

SHOW_TIMES_VALIDATOR = RegexValidator(
    regex=r'^(?:(?:[01]\d|2[0-3]):[0-5]\d(?: (?:[01]\d|2[0-3]):[0-5]\d)*)?$',
    message='Use 24-hour times separated by spaces, for example "14:00 17:30".',
)


class Movie(models.Model):
    """A movie in the cinema listings."""

    class AgeRating(models.TextChoices):
        G = 'G', 'G'
        PG = 'PG', 'PG'
        PG_13 = 'PG-13', 'PG-13'
        R = 'R', 'R'
        NOT_RATED = 'NR', 'Not rated'

    name = models.CharField(max_length=120)
    overview = models.TextField(blank=True)
    poster_file = models.CharField(max_length=80, blank=True)
    age_rating = models.CharField(
        max_length=5, choices=AgeRating.choices, default=AgeRating.NOT_RATED
    )
    score = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(100)],
        help_text='Audience score from 0 to 100.',
    )
    show_times = models.CharField(
        max_length=120, blank=True, validators=[SHOW_TIMES_VALIDATOR]
    )
    release_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name
