# Laboratorio 09 - Cinema Espiritu

Proyecto de React y Vite desarrollado por etapas. La etapa 4 incorpora Hero mediante props, conservando Header, Footer y la navegación.

## Ejecución

```sh
npm install
npm run dev
```

Abrir la URL indicada por Vite en la terminal. Para compilar: `npm run build`. Para revisar el código: `npm run lint`.

## Organización

- `src/components/Header.jsx`: identidad visual, enlace para saltar al contenido y navegación interna.
- `src/components/Footer.jsx`: contacto y ubicación ficticios, con derechos de autor y año dinámico.
- `src/data/movies.js`: ocho películas ficticias con `id`, `title`, `image`, `synopsis`, `classification`, `rating` y `showtimes`.
- `src/styles/index.css`: entrada de CSS que importa variables, estilos base y distribución general, en ese orden.
- `src/styles/variables.css`: colores, tipografía, espaciado y dimensiones compartidas.
- `src/styles/base.css`: reglas globales y accesibilidad del foco.
- `src/styles/layout.css`: altura de la aplicación y contenedor adaptable.
- `public/images/movies/`: ocho afiches SVG originales y locales, sin dependencias de servicios externos.

## Datos de demostración

Los títulos, sinopsis, clasificaciones, valoraciones y horarios son ficticios. Las valoraciones usan una escala de 0 a 10; los horarios usan el formato de 24 horas. Cada pel?cula tiene un identificador estable para usarlo como clave al implementar la lista. Las imágenes respetan la ruta base configurada en Vite.

Header y Footer se integran en App junto a una sección principal temporal. Los enlaces internos apuntan a destinos existentes: inicio, cartelera y contacto. El correo usa el dominio reservado `.example` y no representa un servicio real. Los estilos de ambos componentes se importan desde `src/styles/index.css`, con adaptaciones para pantallas pequeñas. MovieCard y MovieList siguen pendientes.

## Etapa 4: Hero mediante props

`App.jsx` importa `movies.js`, selecciona `movies[0]` como `featuredMovie` y lo pasa con `<Hero movie={featuredMovie} />`. Hero recibe una sola prop `movie` y utiliza `image`, `title`, `synopsis`, `classification` y `rating`. No importa los datos ni duplica la información de la película.

El banner usa un encabezado principal, texto alternativo en el afiche y una lista de descripciones para clasificación y valoración. El título de la sección temporal pasa a ser `h2`. `src/styles/hero.css` adapta el banner de dos columnas a una columna en pantallas pequeñas. El enlace del banner apunta a `#now-showing`, conservando los destinos de navegación existentes. No se agregaron dependencias.
