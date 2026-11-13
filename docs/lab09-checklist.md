# Checklist — Laboratorio 09

Alumno: Sebastián Espíritu · Sección 4-C24-B

## Los 12 pasos de la guía

| Paso | Requisito | Dónde se cumple | Estado |
| --- | --- | --- | --- |
| 1 | Revisar Node, crear el proyecto con Vite, instalar y levantar | `package.json`, `package-lock.json`, `vite.config.js`; informe 4.1 | Cumplido |
| 2 | Limpiar la plantilla | `index.html`, `src/main.jsx`, `src/App.jsx` sin contador ni logos | Cumplido |
| 3 | Carpetas por responsabilidad y arquitectura CSS | `src/components/`, `src/data/`, `src/styles/` | Cumplido |
| 4 | Al menos 8 películas con título, imagen, sinopsis, clasificación, valoración y horarios | `src/data/movies.js` | Cumplido |
| 5 | Header con nombre y navegación, comprobado en pantalla | `Header/Header.jsx`; figura 2 | Cumplido |
| 6 | Footer con contacto e información | `Footer/Footer.jsx`; figura 3 | Cumplido |
| 7 | Hero recibe la película por props | `<Hero movie={featuredMovie} />`; figura 2 | Cumplido |
| 8 | MovieCard recibe una película y muestra imagen, título, valoración y horarios | `MovieCard/MovieCard.jsx`; figura 6 | Cumplido |
| 9 | MovieList recorre con `map` y pasa la `key` | `movies.map(...)` con `key={movie.id}` | Cumplido |
| 10 | Componer en App y comprobar en el navegador | `App.jsx`; figuras 7–9 | Cumplido |
| 11 | Provocar `class`, dos raíces y falta de `key` y registrar el mensaje | `docs/evidence/jsx-errors.md`; informe 4.8 | Cumplido |
| 12 | Subir al repositorio y entregar en el campus | GitHub + entregable en Canvas | Subir capturas de terminal y VS Code (figuras 1, 10, 11 y 12) y entregar |

## Rúbrica

| Criterio | Puntos | Evidencia |
| --- | --- | --- |
| Crea el proyecto de React con Vite y lo levanta | 5 | Proyecto Vite funcionando; consola sin errores |
| Componentes funcionales con JSX compuestos en una interfaz | 5 | Cinco componentes con una responsabilidad cada uno, compuestos en App (figura 8) |
| Datos del padre a los hijos por props | 5 | App → Hero (`movie`), App → MovieList (`movies`), MovieList → MovieCard (`movie`); los hijos no importan los datos |
| Repositorio con la interfaz y observaciones | 5 | README con estructura, componentes y dependencias; informe con capturas y observaciones |

## Normas

| Norma | Estado |
| --- | --- |
| Componentes en PascalCase | Cumplido |
| Hooks con prefijo `use` (`useId`) | Cumplido |
| Una carpeta por componente | Cumplido |
| Código, variables y comentarios en inglés | Cumplido |
| Entregables y explicaciones en español | Cumplido |
