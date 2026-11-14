# Checklist — Laboratorio 11

Alumno: Sebastián Espíritu · Sección 4-C24-B · Rama `lab11`

## Los 12 pasos de la guía

| Paso | Requisito | Dónde se cumple | Estado |
| --- | --- | --- | --- |
| 1 | Partir del Lab 10 y crear la rama de trabajo | `git checkout -b lab11` | Cumplido |
| 2 | Ampliar estilos con tipografía y utilidades | `typography.css`, `utilities.css`, `variables.css` | Cumplido |
| 3 | Utilidad adaptadora y pasar por ella la cartelera | `src/lib/adaptMovie.js`; `rawMovies.map(adaptMovie)` | Cumplido |
| 4 | Aviso emergente al marcar/desmarcar, sin que la tarjeta sepa cómo se muestra | `useToast`, `Toast`; `MovieCard` solo llama a `onToggleFavorite` | Cumplido |
| 5 | Hook `useDebounce` en el buscador | `src/hooks/useDebounce.js` en `App` | Cumplido |
| 6 | Hook `useWindowSize` para decidir tarjetas por fila | `MovieList` (y `PremieresCarousel`) | Cumplido |
| 7 | Hook `usePremieres` con cargando, datos y error | `src/hooks/usePremieres.js` + `src/lib/api.js` | Cumplido |
| 8 | Esqueleto de carga y carrusel en una sección que muestre cada estado | `LoadingSkeleton`, `PremieresCarousel`, `ErrorMessage`, `PremieresSection` | Cumplido |
| 9 | Contador de favoritas en la raíz, visible en la cabecera sin la lista | `<Header favoritesCount={favoriteIds.length} />` | Cumplido |
| 10 | Botón que limpia el filtro desde el banner, todo sincronizado | `MovieSearch` → `onClear`; limpieza inmediata | Cumplido |
| 11 | Árbol de componentes con el dato de cada nivel y por qué el contador no vive en la cabecera | Informe 3.10 y figura 10 | Cumplido |
| 12 | Subir al repositorio y entregar en el campus | Rama `lab11` en GitHub + Canvas | Push y entrega del Word |

## Rúbrica

| Criterio | Puntos | Evidencia |
| --- | --- | --- |
| Comunica hermanos elevando el estado al ancestro común | 5 | Favoritas y búsqueda en `App` (hermanos `Header`/`Hero`/`MovieList`); estrenos, casilla y carrusel se quedan abajo |
| Extrae a hooks propios la lógica que se repite | 5 | `useWindowSize` en `MovieList` y `PremieresCarousel`; `useDebounce` en `App` y en `useWindowSize`; `usePremieres`, `useToast` |
| Integra la biblioteca de interfaz y resuelve carga y error | 5 | Esqueleto mientras carga; mensaje que explica el error con Try again |
| Entrega el repositorio con los hooks y sus observaciones | 5 | README e informe: qué lógica se extrajo y qué componentes la comparten |
