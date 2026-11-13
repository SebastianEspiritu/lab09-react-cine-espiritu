# Cinema Espiritu — Laboratorios 09 y 10

Cartelera de cine hecha con React, JSX y Vite para el curso **Desarrollo de Aplicaciones Empresariales** (sección 4-C24-B). El proyecto es acumulativo: el **Lab 09** armó la cartelera con componentes y props; el **Lab 10** le agrega un botón reutilizable, favoritas que se guardan en el navegador y un buscador con retardo. Las películas, los afiches SVG y los datos de contacto son ficticios.

**Autor:** Sebastián Espíritu

![Cartelera con favoritas y buscador](docs/evidence/lab10/08-full-page.png)

## Requisitos

- Node.js 20 o superior (probado con Node v24.15.0 y npm 11.12.1)
- Git

## Instalación y ejecución

```powershell
npm install
npm run dev
```

Abrir la URL que muestra Vite (normalmente `http://localhost:5173/`). Detener con `Ctrl+C`.

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la carpeta `dist/` |
| `npm run lint` | Revisa el código con Oxlint |

## Dependencias

Declaradas en `package.json` y fijadas en `package-lock.json`:

| Paquete | Uso |
| --- | --- |
| `react`, `react-dom` | Biblioteca de interfaz y renderizado en el navegador |
| `vite`, `@vitejs/plugin-react` | Servidor de desarrollo y compilación con soporte JSX |
| `oxlint` | Linter |
| `@types/react`, `@types/react-dom` | Tipos para el autocompletado del editor |

`.gitignore` excluye `node_modules/` y `dist/`.

## Estructura del proyecto

```text
public/
  favicon.svg
  images/movies/          Ocho afiches SVG
src/
  components/
    Button/Button.jsx           Botón reutilizable con variantes (Lab 10)
    Header/Header.jsx           Marca, navegación y contador de favoritas
    Hero/Hero.jsx               Banner destacado; recibe el buscador por children
    MovieSearch/MovieSearch.jsx Buscador controlado (Lab 10)
    MovieList/MovieList.jsx     Filtra y dibuja la cartelera; estado vacío
    MovieCard/MovieCard.jsx     Tarjeta con botón de favorita
    Footer/Footer.jsx           Contacto e información
  hooks/useDebounce.js    Retardo para el buscador (Lab 10)
  data/movies.js          Datos de las ocho películas
  styles/                 Arquitectura CSS (ver abajo)
  App.jsx                 Composición de la página
  main.jsx                Punto de entrada
docs/
  INFORME-LAB09.md        Informe del Lab 09
  INFORME-LAB10.md        Informe del Lab 10
  lab09-checklist.md      Cumplimiento del Lab 09
  lab10-checklist.md      Cumplimiento del Lab 10
  evidence/
    jsx-errors.md         Errores JSX del Lab 09
    screenshots/          Capturas del Lab 09
    lab10/                Capturas del Lab 10
```

## Componentes y props

![Recorte de la interfaz en componentes](docs/evidence/screenshots/08-component-breakdown.png)

| Componente | Responsabilidad | Props que recibe |
| --- | --- | --- |
| `App` | Importa los datos, guarda el estado (favoritas y búsqueda) y compone la página | — |
| `Header` | Nombre del cine, navegación y contador de favoritas | `favoritesCount` |
| `Hero` | Banner con afiche, título, sinopsis, clasificación, valoración y el buscador | `movie`, `children` |
| `MovieSearch` | Campo de búsqueda controlado y botón Search | `value`, `onChange`, `onSubmit` |
| `MovieList` | Filtra la cartelera, dibuja las tarjetas o el estado vacío | `movies`, `searchTerm`, `favoriteIds`, `onToggleFavorite`, `onClearSearch` |
| `MovieCard` | Afiche, título, clasificación, valoración, horarios y botón de favorita | `movie`, `isFavorite`, `onToggleFavorite` |
| `Button` | Botón o enlace con variante | `children`, `variant`, `href` y cualquier atributo |
| `Footer` | Datos de contacto y derechos | — |

Flujo de datos: `App` es el único componente que importa `movies.js`. Pasa `movies[0]` a `Hero` y el arreglo completo a `MovieList`, que lo filtra, lo recorre con `map` y crea un `MovieCard` por película:

```jsx
{visibleMovies.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={movie}
    isFavorite={favoriteIds.includes(movie.id)}
    onToggleFavorite={onToggleFavorite}
  />
))}
```

Los componentes hijos no saben de dónde vienen los datos; solo usan lo que reciben por props. La `key` usa el `id` de cada película (nunca el índice), y los horarios usan `${id}-${showtime}`.

## Datos

Cada película de `src/data/movies.js` tiene `id`, `title`, `image`, `synopsis`, `classification`, `rating` (escala 0–10, se muestra con un decimal) y `showtimes` (formato 24 horas). Las imágenes usan `import.meta.env.BASE_URL` para que funcionen también tras compilar.

## Arquitectura CSS

`src/styles/index.css` es la única hoja que se importa (en `main.jsx`) y reúne el resto en orden:

| Archivo | Contenido |
| --- | --- |
| `variables.css` | Colores, tipografía, espaciados, alto de controles y transiciones |
| `base.css` | Reglas globales, tipografía y foco visible |
| `utilities.css` | Clases de utilidad (`visually-hidden`) |
| `forms.css` | Etiquetas, campos de texto y buscador |
| `layout.css` | Contenedor y distribución general |
| `button.css` | Componente Button y sus tres variantes |
| `header.css`, `hero.css`, `movie-list.css`, `movie-card.css`, `footer.css` | Estilos de cada componente |

La cuadrícula usa `repeat(auto-fit, minmax(...))`, así que pasa de cuatro columnas en escritorio a una en el celular.

## Lab 10: componentes reutilizables, estado y eventos

### Componentes reutilizables

| Componente | Por qué es reutilizable | Dónde se usa |
| --- | --- | --- |
| `Button` | Recibe el texto por `children` y el aspecto por `variant` (`primary`, `secondary`, `ghost`). Si recibe `href` se dibuja como enlace; si no, como `<button>`. Pasa el resto de props (`onClick`, `aria-pressed`, `type`...) al elemento. | Buscar (Hero), Explore now showing (Hero), favorita de cada tarjeta, Clear search (estado vacío) y Back to top (Footer) |
| `MovieCard` | Solo depende de sus props `movie`, `isFavorite` y `onToggleFavorite`. | 8 veces en `MovieList` |
| `Hero` | Recibe por `children` lo que va dentro del banner; aquí, el buscador. | `App` |
| `MovieSearch` | Es una entrada controlada: el padre le da `value`, `onChange` y `onSubmit`. | Dentro de `Hero` |
| `useDebounce` | Hook genérico que retrasa cualquier valor. | El texto del buscador en `App` |

### Dónde vive cada dato que la app recuerda

| Dato | Dónde vive | Por qué ahí |
| --- | --- | --- |
| `favoriteIds` (favoritas) | Estado de `App` con `useState` | Lo usan el `Header` (contador) y cada `MovieCard` (botón). Por eso va en el padre común. Las tarjetas no lo modifican: llaman a `onToggleFavorite(id)` y `App` actualiza la lista. |
| Favoritas guardadas | `localStorage`, clave `cinema-espiritu:favorites` | `App` las lee al iniciar (`useState(readStoredFavorites)`) y las guarda con `useEffect` cada vez que cambian, así sobreviven a una recarga. |
| `searchText` (lo que se escribe) | Estado de `App` | Se escribe en `MovieSearch` (dentro de `Hero`), pero lo necesita `MovieList` y el botón "Clear search" del estado vacío lo borra. Si viviera en `MovieSearch`, `MovieList` no podría limpiarlo. |
| `searchTerm` (texto con retardo) | `useDebounce(searchText, 400)` en `App` | Solo cambia cuando el usuario deja de escribir 400 ms; es el que usa el filtro. |
| Películas visibles | No es estado: se calculan en `MovieList` en cada render | Salen de `movies` + `searchTerm`; guardarlas en estado duplicaría datos. |
| `isFavorite` de cada tarjeta | No es estado: `favoriteIds.includes(movie.id)` | Se deriva de las favoritas. |

El texto del buscador no se guarda en `localStorage` porque es temporal: al volver a la página se espera ver toda la cartelera.

### Comunicación hijo → padre

- `MovieCard` → `App`: `onToggleFavorite(movie.id)` al hacer clic en ☆/★.
- `MovieSearch` → `App`: `onChange(texto)` en cada pulsación y `onSubmit()` al pulsar Search.
- `MovieList` → `App`: `onClearSearch()` desde el estado vacío.

### Retardo del buscador

Al escribir "storm" la consola muestra cinco pulsaciones y un solo filtrado:

```text
[MovieSearch] keystroke: "s"
[MovieSearch] keystroke: "st"
[MovieSearch] keystroke: "sto"
[MovieSearch] keystroke: "stor"
[MovieSearch] keystroke: "storm"
[App] filtering listings by: "storm"
```

### Estado vacío

![Estado vacío del buscador](docs/evidence/lab10/07-empty-state.png)

Detalle completo en el [informe del Lab 10](docs/INFORME-LAB10.md).

## Errores típicos de JSX (Lab 09)

Se provocaron y corrigieron tres errores (detalle en [docs/evidence/jsx-errors.md](docs/evidence/jsx-errors.md)):

| Error | Mensaje | Solución |
| --- | --- | --- |
| `class` en vez de `className` | Invalid DOM property `class`. Did you mean `className`? | Usar `className` |
| Dos nodos raíz | Adjacent JSX elements must be wrapped in an enclosing tag. | Un solo contenedor o un fragmento `<>...</>` |
| `map` sin `key` | Each child in a list should have a unique "key" prop. | `key={movie.id}` |

## Pruebas

| Prueba | Resultado |
| --- | --- |
| `npm run build` | Compila sin errores |
| `npm run lint` | Sin advertencias ni errores |
| Página en el navegador | Header, Hero, 8 tarjetas, 24 horarios y Footer; consola sin errores |
| Favoritas | El botón cambia a ★ Favorite, el contador del Header sube y baja, y siguen tras recargar |
| Buscador | "storm" → 1 película; "pg-13" → 4; "zzz" → estado vacío; Clear search vuelve a 8 |
| Retardo | 5 pulsaciones → 1 filtrado |
| Datos | Cada tarjeta coincide con su registro de `movies.js` |
| Afiches | Los 8 SVG cargan correctamente |
| Celular (390 px) | Una columna, sin desplazamiento horizontal |
| Teclado | `Tab` muestra el enlace "Skip to content" y el foco es visible |

Más detalle en el [informe](docs/INFORME-LAB09.md).
