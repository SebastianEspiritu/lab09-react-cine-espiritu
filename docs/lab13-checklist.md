# Checklist — Laboratorio 13

Alumno: Sebastián Espíritu · Sección 4-C24-B · Rama `lab13`

## Los 12 pasos de la guía

| Paso | Requisito | Dónde se cumple | Estado |
| --- | --- | --- | --- |
| 1 | App del catálogo en Django con `Category` y `Product` (nombre, descripción, precio, existencias, imagen) | `backend/catalog/models.py`, diagrama en `docs/diagrams/catalog-er.png` | Cumplido |
| 2 | Migrar, registrar en el admin con listados y filtros, 3 categorías y 8+ productos con imagen | `catalog/migrations/0001_initial.py`, `catalog/admin.py`, `python manage.py seed_catalog` (3 categorías, 9 productos) | Cumplido |
| 3 | Serializadores con la categoría anidada en el producto | `catalog/serializers.py` (`CategorySummarySerializer` dentro de `ProductSerializer`) | Cumplido |
| 4 | ViewSets + router; el listado trae la categoría anidada | `catalog/views.py`, `config/urls.py` (un solo `DefaultRouter`) | Cumplido |
| 5 | Carpeta `services` y cliente de Axios con dirección base única | `src/services/apiClient.js` | Cumplido |
| 6 | `productService` y `categoryService` con listar, obtener, crear, modificar y eliminar; ningún componente llama a Axios | `src/services/productService.js`, `src/services/categoryService.js` | Cumplido |
| 7 | Catálogo: carga por servicio en el efecto, tarjeta con imagen, precio y categoría, tres estados | `useResource.js`, `CatalogPage`, `ProductCard`, `ProductGridSkeleton`, `ErrorMessage` | Cumplido |
| 8 | Filtro por categoría con categorías cargadas del API | `CategoryFilter` + `useCategories` + `?category=` | Cumplido |
| 9 | Alta: formulario controlado, select de categorías por servicio, `post`, vuelve al catálogo | `ProductFormPage` / `ProductForm` | Cumplido |
| 10 | Edición y borrado con los mismos servicios; el catálogo refleja el cambio sin recargar | `/shop/:id/edit` (`productService.update`), borrado en `ProductCard` (`productService.remove` + `refresh()`) | Cumplido |
| 11 | Diagrama, tabla de la API y capturas con el filtrado | README → Lab 13; informe | Faltan las capturas |
| 12 | Subir los dos proyectos y el entregable | Rama `lab13` | Push y entrega |

## Rúbrica

| Criterio | Pts | Evidencia |
| --- | --- | --- |
| Estructura principal sobre Django y ReactJS | 5 | Django: una app por responsabilidad (`movies`, `catalog`), migraciones versionadas, `.env`. React: `services/`, `hooks/`, `pages/`, `components/` con una carpeta por componente. Las dos partes conectadas por CORS. |
| Catálogo con serializadores anidados, sin dos peticiones | 5 | `GET /api/products/` devuelve cada producto con su categoría (nombre, slug y descripción); 1 consulta SQL (`assertNumQueries(1)`) |
| Capa de servicios | 5 | Solo `src/services/` importa Axios; páginas y hooks usan `productService`, `categoryService` y `movieService` |
| Repositorio con estructura y observaciones | 5 | README: reparto servidor/cliente, cómo levantar cada lado, orígenes, tabla de la API, diagrama |
