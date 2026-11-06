# Laboratorio 09 - Cinema Espiritu

Proyecto de React y Vite desarrollado por etapas. La etapa 3 incorpora Header y Footer con una sección principal temporal.

## Ejecuci?n

```sh
npm install
npm run dev
```

Abrir la URL indicada por Vite en la terminal. Para compilar: `npm run build`. Para revisar el c?digo: `npm run lint`.

## Organizaci?n

- `src/components/Header.jsx`: identidad visual, enlace para saltar al contenido y navegación interna.
- `src/components/Footer.jsx`: contacto y ubicación ficticios, con derechos de autor y año dinámico.
- `src/data/movies.js`: ocho pel?culas ficticias con `id`, `title`, `image`, `synopsis`, `classification`, `rating` y `showtimes`.
- `src/styles/index.css`: entrada de CSS que importa variables, estilos base y distribuci?n general, en ese orden.
- `src/styles/variables.css`: colores, tipograf?a, espaciado y dimensiones compartidas.
- `src/styles/base.css`: reglas globales y accesibilidad del foco.
- `src/styles/layout.css`: altura de la aplicaci?n y contenedor adaptable.
- `public/images/movies/`: ocho afiches SVG originales y locales, sin dependencias de servicios externos.

## Datos de demostraci?n

Los t?tulos, sinopsis, clasificaciones, valoraciones y horarios son ficticios. Las valoraciones usan una escala de 0 a 10; los horarios usan el formato de 24 horas. Cada pel?cula tiene un identificador estable para usarlo como clave al implementar la lista. Las im?genes respetan la ruta base configurada en Vite.

Header y Footer se integran en App junto a una sección principal temporal. Los enlaces internos apuntan a destinos existentes: inicio, cartelera y contacto. El correo usa el dominio reservado `.example` y no representa un servicio real. Los estilos de ambos componentes se importan desde `src/styles/index.css`, con adaptaciones para pantallas pequeñas. Hero, MovieCard y MovieList siguen pendientes.
