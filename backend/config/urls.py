"""URL configuration for the Cinema Espiritu API."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from catalog.views import CategoryViewSet, ProductViewSet
from movies.views import MovieViewSet

# One router for the whole API, so /api/ lists every resource.
router = DefaultRouter()
router.register('movies', MovieViewSet, basename='movie')
router.register('categories', CategoryViewSet, basename='category')
router.register('products', ProductViewSet, basename='product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    # Product images uploaded from the admin or the React form.
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
