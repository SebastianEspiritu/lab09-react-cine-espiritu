from django.contrib import admin

from .models import Movie


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age_rating', 'score', 'show_times')
    search_fields = ('name', 'overview')
    list_filter = ('age_rating',)
