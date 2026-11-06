# Laboratorio 09 — Cinema Espiritu

Cartelera académica con React, JSX y Vite: una película destacada y ocho películas con afiches, clasificaciones, valoraciones y horarios. Los datos y afiches SVG son ficticios; no se implementan reservas ni servicios externos.

## Requisitos e instalación

Git, Node.js y npm. La guía solicita Node 20 o superior; además debe utilizarse una versión compatible con las dependencias del proyecto. Entorno comprobado: **Node v24.15.0 y npm 11.12.1**.

Desde la raíz del repositorio:

```powershell
npm install
```

Para una instalación reproducible con el archivo de bloqueo existente, se puede usar `npm ci` en lugar de `npm install`. No se reinstalaron dependencias durante la auditoría. `package.json` declara los paquetes y `package-lock.json` fija sus versiones. `.gitignore` excluye `node_modules/` y `dist/`.

## Ejecución y compilación

```powershell
npm run dev
```

Abrir la URL indicada por Vite, normalmente `http://localhost:5173/`. Si el puerto está ocupado, usar el que indique la terminal. Detener con `Ctrl+C`.

```powershell
npm run build
npm run preview
```

`build` genera `dist/`; `preview` permite servir esa compilación localmente. Abrir la URL indicada por el segundo comando. La auditoría ejecutó build y el servidor de desarrollo, no preview.

## Componentes y datos

| Archivo | Responsabilidad | Props |
| --- | --- | --- |
| `src/App.jsx` | Importar datos, seleccionar `movies[0]` y componer la página | Ninguna |
| `src/components/Header/Header.jsx` | Identidad visual y navegación | Ninguna |
| `src/components/Hero/Hero.jsx` | Banner con afiche, título, sinopsis, clasificación y valoración | `movie` |
| `src/components/MovieList/MovieList.jsx` | Título y cuadrícula de tarjetas | `movies` |
| `src/components/MovieCard/MovieCard.jsx` | Afiche, título, clasificación, valoración y horarios | `movie` |
| `src/components/Footer/Footer.jsx` | Contacto y ubicación ficticios, derechos de autor | Ninguna |

App pasa `<Hero movie={featuredMovie} />` y `<MovieList movies={movies} />`. MovieList usa `movies.map()` y `<MovieCard key={movie.id} movie={movie} />`. Los hijos no importan `movies.js` ni conocen el origen de los datos. Los horarios se recorren con claves `${id}-${showtime}`; son únicos por película. `key` es una indicación para React y no una prop de MovieCard.

## Estructura

```text
public/images/movies/      Ocho afiches SVG locales
src/
  components/
    Header/Header.jsx
    Footer/Footer.jsx
    Hero/Hero.jsx
    MovieCard/MovieCard.jsx
    MovieList/MovieList.jsx
  data/movies.js          Fuente única de las ocho películas
  styles/
    index.css            Entrada de estilos
    variables.css        Colores, tipografía y espaciado
    base.css             Reglas globales y foco visible
    layout.css           Contenedor y distribución
    header.css           Encabezado
    footer.css           Pie
    hero.css             Banner adaptable
    movie-card.css       Tarjeta y horarios
    movie-list.css       Cuadrícula adaptable
  App.jsx
  main.jsx
docs/
  lab09-checklist.md      Auditoría de guía y rúbrica
  INFORME-LAB09.md        Informe y ubicaciones de capturas pendientes
  evidence/jsx-errors.md Mensajes reales de los tres errores
```

Cada película contiene `id`, `title`, `image`, `synopsis`, `classification`, `rating` y `showtimes`. Valoraciones: 0–10. Horarios: formato de 24 horas. Imágenes: rutas locales con `import.meta.env.BASE_URL`. El correo `.example` y la dirección del Footer son ficticios.

La navegación apunta a `#home`, `#now-showing` y `#contact`; existe un salto a `#main-content`. Se usan HTML semántico, texto alternativo, títulos jerárquicos, `useId` y foco visible. La cuadrícula ajusta sus columnas al ancho disponible; su apariencia y uso con teclado deben confirmarse en navegador.

## Pruebas y resultados

```powershell
npm run build
npm run lint
git diff --check
```

Auditoría del **6 de noviembre de 2026**, en `main`, con Git limpio al comenzar:

| Prueba ejecutada | Resultado |
| --- | --- |
| Compilación Vite 8.3.6 | Correcta; 22 módulos transformados |
| Lint con Oxlint | Sin advertencias ni errores |
| `git diff --check` | Sin errores |
| Servidor de desarrollo Vite | HTTP 200 en la raíz |
| App renderizada con React DOM Server mediante Vite | Ocho tarjetas y 24 horarios coincidentes con los datos, sin advertencias de React |
| Ocho afiches solicitados al servidor | HTTP 200 y tipo `image/svg+xml` |
| Integridad y estructura | IDs únicos, campos completos, horarios válidos y destinos internos presentes |

El renderizado de servidor no comprueba disposición visual, hidratación, comportamiento del navegador ni accesibilidad completa. Las pruebas de renderizado fueron ejecuciones puntuales, sin nuevos paquetes ni un script permanente. No hay un comando `npm test` configurado.

En la etapa 7 se reprodujeron por separado `class` en lugar de `className`, dos raíces JSX y ausencia de `key`, restaurando el código tras cada caso. Los [mensajes reales y soluciones](docs/evidence/jsx-errors.md) se capturaron en terminal: A/C con React en desarrollo y B con el compilador Vite. No son capturas de navegador. En la etapa 8 se revisó el registro, sin volver a introducir errores.

Vite requirió permisos ampliados por `spawn EPERM` en el entorno restringido; no se cambió la configuración de la aplicación. No se ejecutó una auditoría de vulnerabilidades actual en esta etapa.

## Documentación y pendientes

- [Checklist de los 12 pasos y la rúbrica](docs/lab09-checklist.md).
- [Informe académico y ubicaciones exactas de capturas](docs/INFORME-LAB09.md).
- [Errores JSX y soluciones](docs/evidence/jsx-errors.md).

Quedan pendientes las capturas reales y la revisión visual en escritorio y móvil. En «Normas empleadas», la guía establece: «Código JavaScript según el estándar de ReactJS: componentes en PascalCase, hooks con el prefijo `use` y una carpeta por componente». Se aplica como norma: cada componente tiene ahora una carpeta individual dentro de `src/components/`, con los imports de App y MovieList actualizados. Los estilos siguen centralizados por responsabilidad en `src/styles/`. La fuente menciona una arquitectura CSS sin detallar sus archivos; cualquier material complementario requiere cotejo cuando esté disponible.

Completar integrantes, aportes y datos de entrega en el informe. Existe un remoto `origin`, pero no se consultó GitHub ni se verificó su contenido. La publicación y la entrega Canvas no se dan por realizadas. La etapa 8 modificó solamente documentación; la revisión posterior resolvió la organización en carpetas mediante movimientos e imports, sin cambiar la interfaz ni los datos. No se hizo commit ni push. La calificación corresponde al docente y no se garantiza 20/20.
