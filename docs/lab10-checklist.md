# Checklist — Laboratorio 10

Alumno: Sebastián Espíritu · Sección 4-C24-B

## Los 12 pasos de la guía

| Paso | Requisito | Dónde se cumple | Estado |
| --- | --- | --- | --- |
| 1 | Partir de la cartelera del Lab 09 funcionando | Mismo proyecto y repositorio | Cumplido |
| 2 | Ampliar estilos: formulario, tipografía y utilidades | `forms.css`, `base.css`, `utilities.css`, `variables.css`, `button.css` | Cumplido |
| 3 | Button con `children` y prop de variante, reemplazando los botones a mano | `Button/Button.jsx`; usado en 5 lugares | Cumplido |
| 4 | Estado de favoritas con `useState` en App y función para agregar/quitar | `favoriteIds` y `toggleFavorite` en `App.jsx` | Cumplido |
| 5 | Pasar la función a MovieCard y botón de favorita que muestre el estado | `onToggleFavorite`, `isFavorite`, `aria-pressed` | Cumplido |
| 6 | MovieSearch como entrada controlada | `value` + `onChange` | Cumplido |
| 7 | Retardo en el buscador y comprobar la diferencia en consola | `hooks/useDebounce.js`; 5 pulsaciones → 1 filtrado | Cumplido |
| 8 | MovieList filtra y dibuja estado vacío | `matchesSearch` y `.empty-state` | Cumplido |
| 9 | Buscador integrado en el banner con su llamada a la acción | `<Hero>{children}</Hero>`, Search y Explore now showing | Cumplido |
| 10 | Favoritas en el almacenamiento del navegador | `localStorage` con lectura inicial y `useEffect` | Cumplido |
| 11 | Registrar dónde vive cada dato y por qué; captura del estado vacío | Informe 3.10 y figura 6 | Cumplido |
| 12 | Subir al repositorio y entregar en el campus | GitHub + Canvas | Push y entrega del Word |

## Rúbrica

| Criterio | Puntos | Evidencia |
| --- | --- | --- |
| Componentes reutilizables con contenido y variantes por props | 5 | `Button` en 5 lugares con 3 variantes, como botón o enlace; `Hero` con `children` |
| Estado con `useState` y eventos | 5 | Favoritas y búsqueda en `App`; clic, teclado, escritura y envío manejados sin recargar; lo derivado no se guarda en estado |
| Comunicación hacia arriba con funciones | 5 | `onToggleFavorite`, `onChange`, `onSubmit`, `onClearSearch`; ningún hijo toca estado ajeno |
| Repositorio con observaciones | 5 | README e informe explican qué componente es reutilizable y por qué |
