from django.contrib import admin
from django.db.models import Count
from django.utils.html import format_html

from .models import Category, Product


class ProductInline(admin.TabularInline):
    model = Product
    fields = ('name', 'price', 'stock')
    extra = 0
    show_change_link = True


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'product_count')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductInline]

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(_product_count=Count('products'))

    @admin.display(description='Products', ordering='_product_count')
    def product_count(self, obj):
        return obj._product_count


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('thumbnail', 'name', 'category', 'price', 'stock', 'is_available')
    list_display_links = ('thumbnail', 'name')
    list_editable = ('price', 'stock')
    list_filter = ('category', 'updated_at')
    search_fields = ('name', 'description', 'category__name')
    list_select_related = ('category',)
    readonly_fields = ('preview', 'created_at', 'updated_at')
    fields = ('category', 'name', 'description', 'price', 'stock', 'image', 'preview', 'created_at', 'updated_at')

    @admin.display(description='Image')
    def thumbnail(self, obj):
        if not obj.image:
            return '—'
        return format_html('<img src="{}" alt="" style="height:40px;border-radius:4px">', obj.image.url)

    @admin.display(description='Preview')
    def preview(self, obj):
        if not obj.image:
            return 'No image yet'
        return format_html('<img src="{}" alt="" style="max-height:200px;border-radius:6px">', obj.image.url)

    @admin.display(boolean=True, description='Available')
    def is_available(self, obj):
        return obj.stock > 0
