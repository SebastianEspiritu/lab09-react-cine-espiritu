from rest_framework import viewsets

from .models import Movie
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    """List, create, retrieve, update and delete movies."""

    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
