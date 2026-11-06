# Laboratorio 09 - Cinema Espiritu

Proyecto de React y Vite desarrollado por etapas. La etapa 2 organiza los datos y estilos; los componentes de la cartelera siguen pendientes.

## Ejecuci?n

```sh
npm install
npm run dev
```

Abrir la URL indicada por Vite en la terminal. Para compilar: `npm run build`. Para revisar el c?digo: `npm run lint`.

## Organizaci?n

- `src/components/`: reservada para los componentes funcionales, con una carpeta por componente en la siguiente etapa.
- `src/data/movies.js`: ocho pel?culas ficticias con `id`, `title`, `image`, `synopsis`, `classification`, `rating` y `showtimes`.
- `src/styles/index.css`: entrada de CSS que importa variables, estilos base y distribuci?n general, en ese orden.
- `src/styles/variables.css`: colores, tipograf?a, espaciado y dimensiones compartidas.
- `src/styles/base.css`: reglas globales y accesibilidad del foco.
- `src/styles/layout.css`: altura de la aplicaci?n y contenedor adaptable.
- `public/images/movies/`: ocho afiches SVG originales y locales, sin dependencias de servicios externos.

## Datos de demostraci?n

Los t?tulos, sinopsis, clasificaciones, valoraciones y horarios son ficticios. Las valoraciones usan una escala de 0 a 10; los horarios usan el formato de 24 horas. Cada pel?cula tiene un identificador estable para usarlo como clave al implementar la lista. Las im?genes respetan la ruta base configurada en Vite.

La pantalla actual solo contiene el nombre del cine. No se han implementado Header, Footer, Hero, MovieCard ni MovieList.
