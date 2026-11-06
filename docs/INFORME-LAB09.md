# Informe académico — Laboratorio 09: ReactJS

## 1. Datos generales

| Campo | Información |
| --- | --- |
| Curso | Desarrollo de Aplicaciones Empresariales |
| Proyecto | Cinema Espiritu: cartelera con React y Vite |
| Docente indicado en la guía | Michael Montgomery Rosell |
| Sección indicada en la guía | 4-C24-A; confirmar que corresponde al equipo |
| Estudiante(s) | **PENDIENTE: nombres y apellidos oficiales** |
| Fecha de auditoría | 6 de noviembre de 2026, America/Lima |
| Fecha y plazo de entrega | **PENDIENTE: confirmar en Canvas** |
| Remoto configurado localmente | `https://github.com/SebastianEspiritu/lab09-react-cine-espiritu.git` |
| Publicación | Contenido y accesibilidad remotos no verificados en esta auditoría |

Fuente revisada: `GLAB-S09-MMONTGOMERY-2026-02.docx`, capacidades, normas, metodología, 12 pasos y rúbrica de cuatro criterios. Este informe diferencia hechos comprobados y pendientes; no certifica una calificación ni una entrega realizada.

## 2. Objetivos

Crear y ejecutar React con Vite; componer una interfaz con componentes funcionales y JSX; comunicar datos mediante props; representar colecciones usando map y claves estables; reproducir y corregir tres errores típicos; documentar estructura, resultados y casos de prueba.

## 3. Fundamento aplicado

JSX describe la interfaz dentro de componentes de React. App centraliza el acceso a los datos y compone piezas con responsabilidades distintas. Hero recibe una película; MovieList recibe la colección y MovieCard recibe cada película. Los hijos no conocen el archivo de origen.

MovieList transforma el arreglo con map y usa key={movie.id} para identificar cada tarjeta. MovieCard combina identificador y hora para identificar los horarios. No se emplean índices como claves. La propiedad key es una indicación para React y no se recibe como una prop normal del componente.

El CSS se organiza en variables, base, distribución y reglas de cada componente. El HTML semántico, el texto alternativo, los títulos y el foco visible ofrecen una base de accesibilidad que debe completarse con revisión visual y de teclado.

## 4. Entorno y metodología

Entorno comprobado: Windows, Git, Node v24.15.0, npm 11.12.1, React 19.3.1 y Vite 8.3.6. Rama main y árbol limpio al iniciar la auditoría. La instalación pertenece a la etapa 1 y no se repitió en esta revisión.

Se trabajó por etapas: inicialización, datos y estilos, Header/Footer, Hero, MovieCard, MovieList, errores JSX y auditoría documental. El historial local contiene commits previos; esta auditoría no ejecutó commit ni push. No se atribuyen aportes individuales sin confirmación del equipo.

| Integrante | Aporte real | Evidencia de participación |
| --- | --- | --- |
| **PENDIENTE: nombre completo** | **PENDIENTE: describir** | **PENDIENTE: referencia verificable** |

Completar una fila por integrante. El repaso del aula virtual, la continuidad con laboratorios anteriores, las reglas de seguridad física y el cierre de sesiones deben confirmarse por los estudiantes: no se verifican desde este repositorio.

## 5. Desarrollo y evidencias

Los extractos remiten al código real. Los archivos de captura propuestos **no existen todavía**. Guardarlos en `docs/evidence/screenshots/` cuando se obtengan e insertar cada figura en el punto indicado. No reemplazar una captura pendiente por un resultado supuesto.

### 5.1. Inicialización y ejecución

**Alumno responsable: PENDIENTE.** Se generó React con JavaScript y JSX en la raíz mediante Vite, se instalaron las dependencias y se retiró la plantilla de demostración. Permanecen index.html, src/main.jsx y App.jsx como puntos de entrada y composición.

Registro histórico del procedimiento:

```powershell
node --version
npm --version
npm create vite@latest . -- --template react --no-interactive
npm install
npm run dev
```

No volver a ejecutar el comando de creación sobre este proyecto. Para usarlo actualmente basta instalar dependencias y ejecutar npm run dev. Abrir la URL que muestra Vite; el puerto habitual es 5173. En la auditoría se levantó un servidor en un puerto disponible y se recibió HTTP 200.

**Figura 1 — PENDIENTE. Insertar aquí** captura real de terminal con versiones y servidor listo. Archivo propuesto: `evidence/screenshots/01-environment-dev.png`. Mostrar la URL de Vite.

Resultado: el servidor atiende solicitudes. Caso de prueba: raíz HTTP 200. Límite: no demuestra la apariencia en navegador.

### 5.2. Datos y organización CSS

**Alumno responsable: PENDIENTE.** src/data/movies.js contiene ocho películas ficticias con id, title, image, synopsis, classification, rating y showtimes. Los afiches SVG locales están en public/images/movies.

| Película | Clasificación | Valoración /10 | Horarios |
| --- | --- | --- | --- |
| Beyond Orion | PG-13 | 8.4 | 14:00, 17:00, 20:00 |
| The Last Lighthouse | PG | 7.8 | 13:30, 16:00, 18:30 |
| Midnight Train | PG-13 | 8.1 | 16:30, 19:00, 21:30 |
| Paper Wings | G | 7.6 | 12:00, 14:30, 17:00 |
| Desert Echoes | PG-13 | 8.0 | 15:00, 18:00, 21:00 |
| The Hidden Garden | G | 7.9 | 12:30, 15:00, 17:30 |
| City of Rhythm | PG | 8.2 | 14:00, 16:30, 19:00 |
| After the Storm | PG-13 | 7.7 | 15:30, 18:30, 21:00 |

Los horarios son de 24 horas y las clasificaciones son ilustrativas. styles/index.css importa variables, base, layout y estilos de cada componente. La cuadrícula usa auto-fit y minmax para adaptar las columnas.

Resultado: ocho registros completos, 24 horarios y ocho imágenes HTTP 200. Caso de prueba: cotejar cada tarjeta renderizada con su registro. La sinopsis de la destacada también se verificó en Hero.

### 5.3. Header, Footer y Hero

**Alumno responsable: PENDIENTE.** Header presenta marca y navegación. Footer contiene dirección y correo declarados ficticios, retorno al inicio y derechos. Hero recibe movie y muestra sus campos sin importar movies.js.

Código de composición dentro del fragmento de App, después de seleccionar `const featuredMovie = movies[0]`:

```jsx
<Header />
<main className="container main-content" id="main-content" tabIndex={-1}>
  <Hero movie={featuredMovie} />
  <MovieList movies={movies} />
</main>
<Footer />
```

Es un extracto, no un archivo independiente: App envuelve estos elementos con un fragmento JSX. Código completo en src/App.jsx, src/components/Header/Header.jsx, src/components/Footer/Footer.jsx y src/components/Hero/Hero.jsx.

**Figura 2 — PENDIENTE. Insertar aquí** captura real del navegador con Header y Hero: `evidence/screenshots/02-header-hero.png`. Deben verse marca, navegación y datos de Beyond Orion.

**Figura 5 — PENDIENTE. Insertar aquí** captura real del Footer: `evidence/screenshots/05-footer.png`. Debe mostrar contacto ficticio, ubicación, derechos y enlace de retorno.

Resultado: componentes y destinos internos presentes en HTML. Pruebas manuales pendientes: activar enlaces, usar Tab y salto al contenido y revisar el foco. No existe evidencia de haber comprobado Header en pantalla antes de construir los componentes siguientes.

### 5.4. MovieCard y MovieList

**Alumno responsable: PENDIENTE.** App pasa el arreglo completo mediante `<MovieList movies={movies} />`. MovieList reutiliza MovieCard:

```jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}
```

MovieCard recibe movie, muestra afiche, título, clasificación, valoración y horarios. No duplica datos ni simula reservas. Los horarios se representan así:

```jsx
{showtimes.map((showtime) => (
  <li key={`${id}-${showtime}`}>
    <time dateTime={showtime}>{showtime}</time>
  </li>
))}
```

Código completo: src/components/MovieList/MovieList.jsx y src/components/MovieCard/MovieCard.jsx. useId evita IDs duplicados en las etiquetas de las tarjetas.

**Figura 3 — PENDIENTE. Insertar aquí** captura completa y legible del navegador con las ocho películas: `evidence/screenshots/03-catalog-desktop.png`. Si requiere varias imágenes, numerarlas 03a y 03b y explicar su continuidad.

**Figura 4 — PENDIENTE. Insertar aquí** detalle de una tarjeta con todos sus campos y tres horarios: `evidence/screenshots/04-movie-card.png`.

Resultado: ocho article y 24 time con valores esperados, sin advertencias durante el renderizado. Caso de prueba: comparar las ocho instancias con movies.js, sin claves basadas en índices.

### 5.5. Diseño adaptable y estructura

**Alumno responsable: PENDIENTE.** Header/Footer reorganizan su distribución en pantallas pequeñas; Hero pasa a una columna y la cuadrícula adapta sus columnas. Se revisaron estas reglas en código, sin certificar su apariencia ni una conformidad integral de accesibilidad.

**Figura 6 — PENDIENTE. Insertar aquí** captura del navegador en ancho móvil con el tamaño real indicado: `evidence/screenshots/06-mobile.png`. Comprobar legibilidad y ausencia de desbordamiento horizontal.

**Figura 7 — PENDIENTE. Insertar aquí** captura del explorador del editor mostrando componentes, datos, estilos, imágenes y documentos: `evidence/screenshots/07-project-tree.png`.

**Figura 8 — PENDIENTE. Insertar aquí** captura real de la interfaz con recortes o anotaciones que identifiquen Header, Hero, MovieList/MovieCard y Footer: `evidence/screenshots/08-component-breakdown.png`. Rotular como imagen anotada, no captura sin modificar.

Observación resuelta en la revisión posterior: «Normas empleadas» indica exactamente: «Código JavaScript según el estándar de ReactJS: componentes en PascalCase, hooks con el prefijo `use` y una carpeta por componente». Al figurar como norma sin indicación de opcionalidad, se aplica como requisito. Se movieron los cinco componentes a Header/, Footer/, Hero/, MovieCard/ y MovieList/ dentro de src/components, actualizando los imports de App y MovieList. Los archivos JSX conservan su nombre. El CSS permanece en src/styles y no se cambiaron datos ni interfaz. La fuente menciona una arquitectura CSS sin detallar sus archivos: no se afirma haber cotejado una guía complementaria no adjunta.

### 5.6. Errores JSX y React

**Alumno responsable: PENDIENTE.** Los tres casos se reprodujeron y corrigieron por separado en etapa 7. [El registro completo](evidence/jsx-errors.md) contiene versión, método, archivo, línea temporal, código, mensaje real y solución.

| Caso | Ubicación temporal | Mensaje real principal | Solución |
| --- | --- | --- | --- |
| class | MovieList.jsx:5 | Invalid DOM property `class`. Did you mean `className`? | Restaurar className |
| Dos raíces | MovieList.jsx:14:5 | Adjacent JSX elements must be wrapped in an enclosing tag. | Restaurar raíz única; un fragmento también permite agrupar |
| Sin key | MovieList.jsx:10 | Each child in a list should have a unique "key" prop. | Restaurar key={movie.id} |

A/C son advertencias capturadas con React DOM Server en desarrollo. B es un fallo del compilador Vite. Son mensajes reales de terminal, no capturas del navegador. En etapa 8 se revisó el registro sin provocar nuevamente los errores. Las rutas y líneas de la tabla corresponden a la reproducción original; tras reorganizar carpetas, el archivo está en src/components/MovieList/MovieList.jsx. Los mensajes históricos no se alteraron.

**Figura 9 — PENDIENTE. Insertar aquí** captura auténtica del registro o terminal si está disponible: `evidence/screenshots/09-jsx-errors.png`. Si se captura el Markdown, rotular «registro documental de etapa 7», nunca «consola original». Si no hay captura original, mantener que la evidencia es textual; no atribuir mensajes a un navegador no utilizado.

### 5.7. Validación final

**Alumno responsable: PENDIENTE.** Se ejecutaron build, lint y revisión de diferencias. El servidor respondió HTTP 200 y los ocho afiches se solicitaron individualmente. Para verificar contenido se cargó App con Vite y se renderizó con React DOM Server; no equivale a inspección visual.

**Figura 10 — PENDIENTE. Insertar aquí** captura de una ejecución real de npm run build, npm run lint y git diff --check: `evidence/screenshots/10-final-checks.png`. Mostrar comandos y finalización. Los dos últimos pueden no producir salida si no detectan problemas.

## 6. Casos de prueba y resultados

| ID | Procedimiento | Resultado real de auditoría |
| --- | --- | --- |
| P01 | Revisar rama y estado inicial | main, limpio |
| P02 | npm run build | Correcto; Vite 8.3.6, 22 módulos transformados |
| P03 | npm run lint | Sin advertencias ni errores |
| P04 | git diff --check | Sin errores |
| P05 | Iniciar Vite y solicitar raíz | HTTP 200; servidor de auditoría detenido al finalizar |
| P06 | Renderizar App y contar tarjetas | Ocho |
| P07 | Comparar afiche, título, clasificación y valoración | Coinciden con movies.js |
| P08 | Comparar texto y atributos de horarios | 24 horarios, tres por película |
| P09 | Solicitar ocho afiches | Ocho HTTP 200, image/svg+xml |
| P10 | Revisar integridad de datos | IDs únicos, sinopsis presentes, valoraciones 0–10 y horarios HH:mm únicos por película |
| P11 | Comparar sinopsis destacada | Presente en Hero |
| P12 | IDs y enlaces internos | Sin duplicados; destinos presentes |
| P13 | Capturar advertencias durante renderizado | Ninguna de React |
| P14 | Revisar registro de errores | Tres casos con soluciones, código correcto restaurado |
| P15 | Navegador, móvil y teclado | **PENDIENTE** |
| P16 | Capturas, remoto y entrega Canvas | **PENDIENTE** |

No existe npm test. Las verificaciones de renderizado fueron puntuales, sin nuevos paquetes ni scripts permanentes. No se reinstaló ni ejecutó npm audit; no se certifica seguridad actual de dependencias. Vite requirió permisos ampliados por spawn EPERM del entorno restringido, sin cambios en la configuración de la app.

Tras reorganizar las carpetas se repitieron build, lint y git diff --check con resultados correctos. También se renderizó App con las nuevas rutas: Header, Hero, Footer, ocho tarjetas con datos esperados y 24 horarios, sin advertencias de React. No se tomó ninguna captura ni se verificó visualmente el navegador en esa revisión.

## 7. Evaluación frente a la rúbrica

| Criterio | Máximo | Evidencia | Pendiente o límite |
| --- | --- | --- | --- |
| Crear y levantar React/Vite | 5 | Dependencias, configuración y servidor HTTP | Captura y valoración docente de autonomía |
| Componentes JSX y composición | 5 | Cinco componentes con responsabilidades separadas, carpetas individuales y App | Revisión visual pendiente |
| Props de padre a hijos | 5 | movie y movies, datos centralizados, hijos sin importar fuente | Evaluación docente de adecuación al descriptor |
| Repositorio y observaciones | 5 | README, checklist, informe, errores y dependencias declaradas | Autoría, capturas, remoto comprobado y entrega |

La meta es aspirar a 20 puntos cumpliendo los cuatro criterios. No se asignan puntos obtenidos ni se garantiza nota. El [checklist](lab09-checklist.md) relaciona los 12 pasos, normas y pendientes.

## 8. Conclusiones

La aplicación separa datos y presentación mediante componentes y props. MovieList reutiliza MovieCard para ocho registros y ambos recorridos de map conservan claves estables. El contenido y los recursos locales se comprobaron sin modificar la funcionalidad.

Los errores de atributo DOM y claves producen advertencias de React, mientras que las raíces JSX adyacentes impiden compilar. Se registraron los síntomas y soluciones y se restauró el código correcto antes de continuar.

Build, lint y revisión de diferencias son correctos. Esto no completa la entrega: faltan revisión visual, capturas, datos del equipo y constancia de publicación y Canvas. La norma de carpetas por componente se resolvió en la revisión posterior, sin cambios de comportamiento.

## 9. Acciones antes de entregar

1. Completar integrantes, aportes, sección confirmada y plazo real.
2. Revisar escritorio, móvil, teclado y consola del navegador, registrando hallazgos reales.
3. Obtener las figuras 1–10 en los puntos exactos de 5.1–5.7. Mantener PENDIENTE hasta insertar cada evidencia.
4. Cotejar material CSS complementario si se proporciona; la organización en carpetas por componente ya fue corregida.
5. Repetir comprobaciones después de cualquier cambio y actualizar documentos.
6. Con autorización del usuario, gestionar commit/push; verificar el remoto y entregar en Canvas con constancia. Estas acciones no se realizaron en esta auditoría.
