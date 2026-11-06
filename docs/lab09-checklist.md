# Checklist de auditoría — Laboratorio 09

Fecha: 6 de noviembre de 2026 (America/Lima). Fuente: `GLAB-S09-MMONTGOMERY-2026-02.docx`, procedimiento completo y rúbrica. Rama inicial de etapa 8: `main`, árbol limpio. La revisión posterior de carpetas partió de los documentos de etapa 8 sin commit y los conservó. Alcance de esa revisión: organización de componentes e imports y documentación, sin cambios de comportamiento.

**Verificado**: comprobado en código o ejecución real. **Parcial**: implementación existente con requisito o evidencia pendiente. **Pendiente**: sin evidencia suficiente. **No aplicable**: norma de otra tecnología. Los nombres de capturas propuestos en el informe no representan archivos existentes.

## Los 12 pasos

| Paso | Requisito | Evidencia disponible | Estado y pendiente |
| --- | --- | --- | --- |
| 1 | Revisar Node, crear React/Vite, instalar y levantar | Node v24.15.0, npm 11.12.1; package.json, lockfile, configuración Vite; instalación registrada en etapa 1; arranque HTTP 200 en auditoría | **Verificado** técnicamente; captura de terminal pendiente, figura 1 |
| 2 | Limpiar plantilla y conservar entradas funcionales | index.html, main.jsx, App.jsx; sin contador ni logos de Vite | **Verificado**; App evolucionó a la composición final |
| 3 | Separar componentes, datos y estilos; arquitectura CSS | src/components con una carpeta por componente, src/data, src/styles; variables, base, layout y estilos por componente | **Verificado** en la guía disponible; material CSS complementario pendiente de cotejo si se proporciona |
| 4 | Ocho películas con título, imagen, sinopsis, clasificación, valoración y horarios | movies.js; ocho IDs únicos y campos completos, 24 horarios; ocho afiches HTTP 200 | **Verificado**, datos ficticios explícitos |
| 5 | Header con nombre y navegación; comprobar en pantalla antes de seguir | Header.jsx, enlaces con destinos presentes, HTML renderizado | **Parcial**: sin prueba visual ni evidencia del orden histórico de comprobación en pantalla; figura 2 pendiente |
| 6 | Footer con contacto e información | Footer.jsx, dirección y correo ficticios, derechos y año | **Verificado** en código y HTML; figura 5 pendiente |
| 7 | Hero recibe película por props | App selecciona movies[0] y pasa movie; Hero no importa datos | **Verificado**; figura 2 pendiente |
| 8 | MovieCard recibe película y muestra afiche, título, valoración y horarios | MovieCard.jsx, también clasificación; ocho tarjetas y 24 horarios cotejados | **Verificado**; figuras 3 y 4 pendientes |
| 9 | MovieList usa map y key por película | movies.map y MovieCard con key={movie.id} | **Verificado**, sin índice como clave |
| 10 | Componer App y comprobar toda la cartelera en navegador | Header, Hero, MovieList y Footer; React DOM Server y HTTP | **Parcial**: servidor y SSR no sustituyen revisión visual; figuras 2–6 pendientes |
| 11 | Provocar y registrar class, raíces adyacentes y falta de key | [Registro de etapa 7](evidence/jsx-errors.md), líneas temporales 5, 14 y 10, mensajes reales y soluciones | **Verificado** documentalmente y errores corregidos; capturas originales no disponibles |
| 12 | Subir repositorio y entregar capturas, código y recorte de componentes en Canvas | Remoto origin configurado, historial y documentos locales | **Pendiente**: verificar remoto, completar capturas y constancia Canvas; sin commit/push en esta etapa |

## Rúbrica: cuatro criterios de cinco puntos

| Criterio | Máximo | Descriptor excelente resumido | Evidencia y situación |
| --- | --- | --- | --- |
| Crear y levantar React/Vite | 5 | Creación, dependencias y servidor funcionando | Configuración y HTTP comprobados; captura pendiente. La autonomía del estudiante la evalúa el docente |
| Componentes funcionales JSX y composición | 5 | Componentes pequeños con una responsabilidad, pantalla solicitada | Cinco componentes en carpetas individuales y App; revisión visual pendiente |
| Props del padre a hijos | 5 | Props necesarias e hijos independientes del origen | App → Hero (movie), App → MovieList (movies), MovieList → MovieCard (movie); sin importar el archivo de datos en hijos |
| Repositorio e interfaz con observaciones | 5 | Estructura explicada y dependencias declaradas | README, informe y errores; faltan capturas, autoría, comprobación remota y entrega |

No se asigna nota ni se declara 20/20. Los pendientes impiden considerar finalizada la entrega académica.

## Normas y metodología

| Requisito | Evidencia o límite | Estado |
| --- | --- | --- |
| Componentes PascalCase y hooks use | Header, Footer, Hero, MovieCard, MovieList; useId | Verificado |
| Una carpeta por componente | Header/Header.jsx, Footer/Footer.jsx, Hero/Hero.jsx, MovieCard/MovieCard.jsx y MovieList/MovieList.jsx dentro de src/components | Verificado; App y MovieList importan las rutas nuevas |
| Código, variables y comentarios en inglés; entregables en español | Código de src y documentos revisados | Verificado |
| Arquitectura CSS de guía | Variables, base, layout y archivos por componente | Parcial frente a posible material complementario no adjunto |
| Normas Python/Django | Aplicación exclusivamente React/Vite | No aplicable a esta app |
| Node 20+, Windows y herramientas | Node 24, npm, Git y ejecución Windows comprobados | Verificado para ejecución; VS Code y Python no comprobados |
| Repaso previo de aula y continuidad del proyecto | No hay evidencia del campus ni proyecto previo | Pendiente de confirmación del estudiante |
| Equipo y aportes individuales | Nombres y reparto no proporcionados | Pendiente; completar tabla del informe |
| Nombre, desarrollo, captura, código, explicación y pruebas | Secciones 5.1–5.7 del informe y tabla de pruebas | Parcial; nombres y capturas pendientes |
| Captura de estructura en editor y recorte de componentes | Figuras 7 y 8 del informe | Pendiente |
| Seguridad física y cierre de sesiones | Acciones presenciales no verificables desde el repositorio | Pendiente de cumplimiento presencial |
| Dependencias declaradas y exclusiones | package.json, package-lock.json, .gitignore | Verificado; sin nuevas dependencias |

## Comprobaciones de auditoría

| Prueba | Resultado real |
| --- | --- |
| npm run build | Correcto; Vite 8.3.6, 22 módulos transformados |
| npm run lint | Sin advertencias ni errores |
| git diff --check | Sin errores |
| App con Vite y React DOM Server | Ocho tarjetas, 24 horarios, datos coincidentes y sin advertencias React |
| Solicitar ocho afiches al servidor | Ocho HTTP 200, tipo image/svg+xml |
| Integridad de datos | IDs únicos, sinopsis presentes, valoraciones 0–10 y horarios HH:mm únicos por película |
| Estructura del HTML | IDs únicos, destinos internos presentes y Header/Hero/Footer conservados |
| Registro de errores | Tres casos con archivo, línea, código, mensaje y solución; SSR para A/C y compilación para B |
| Escritorio, móvil, interacción y teclado en navegador | Pendiente |

Vite requirió permisos ampliados por el bloqueo spawn EPERM del entorno restringido. No se modificó su configuración ni se provocaron errores nuevos. La comprobación de renderizado fue puntual, sin agregar paquetes ni scripts a la app.

## Resolución de la observación de carpetas

Texto exacto de «Normas empleadas»: «Código JavaScript según el estándar de ReactJS: componentes en PascalCase, hooks con el prefijo `use` y una carpeta por componente».

Se interpreta como requisito porque la guía lo incluye entre sus normas, sin calificarlo como opcional. Se resolvió moviendo los cinco componentes a carpetas individuales y actualizando imports. Los estilos permanecen en src/styles, que ya separa responsabilidades. Las rutas y líneas del registro de errores de etapa 7 son históricas y se conservan; la ubicación actual de MovieList es src/components/MovieList/MovieList.jsx. Las capturas continúan pendientes.

Verificación posterior al cambio: build correcto (22 módulos), lint sin advertencias y git diff --check sin errores. Renderizado de App con las nuevas rutas: Header, Hero y Footer presentes, ocho tarjetas con datos esperados y 24 horarios, sin advertencias de React. La compilación produjo los mismos nombres de archivos CSS/JS que antes de la reorganización. No se generaron capturas ni se realizó commit o push.
