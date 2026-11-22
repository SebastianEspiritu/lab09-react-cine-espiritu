from rest_framework import serializers

from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    """Sends each movie with the field names the React adapter expects."""

    movie_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Movie
        fields = [
            'movie_id',
            'name',
            'overview',
            'poster_file',
            'age_rating',
            'score',
            'show_times',
            'release_date',
        ]

    def validate_name(self, value):
        name = value.strip()
        if len(name) < 2:
            raise serializers.ValidationError('The title must have at least 2 characters.')
        return name
