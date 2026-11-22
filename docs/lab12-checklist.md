# Checklist — Laboratorio 12

Alumno: Sebastián Espíritu · Sección 4-C24-B · Rama `lab12`

## Los 13 pasos de la guía

| Paso | Requisito | Dónde se cumple | Estado |
| --- | --- | --- | --- |
| 1 | API + `django-cors-headers`, en apps instaladas, middleware tras el de seguridad, origen de React autorizado | `backend/config/settings.py`, `backend/.env.example` | Cumplido |
| 2 | Comprobar la API en el navegador y anotar las direcciones | Informe 3.1 (tabla de direcciones) | Cumplido (falta la captura 01) |
| 3 | Copiar el proyecto del Lab 11 e instalar Axios | Rama `lab12` desde `lab11`; `axios` en `package.json` | Cumplido |
| 4 | Módulo cliente con dirección base única y listar/crear/eliminar | `src/lib/httpClient.js`, `src/lib/moviesApi.js` | Cumplido |
| 5 | Listado con estado de datos, carga y error; `get` en `useEffect` | `src/hooks/useMovies.js`, `MoviesPage` | Cumplido |
| 6 | Esqueleto, tabla y error con reintento | `TableSkeleton`, `.movies-table`, `ErrorMessage` | Cumplido |
| 7 | Botón que hace `delete` y refresca la lista | `MoviesPage.handleDelete` → `refresh()` | Cumplido |
| 8 | Formulario controlado, `preventDefault`, `post` y navegación | `MovieFormPage` | Cumplido |
| 9 | Provocar y documentar el error de CORS | Informe 3.7 | Falta la captura 07 |
| 10 | Error de validación de la API mostrado en la interfaz | `FormField` + `toApiError`; informe 3.8 | Falta la captura 08 |
| 11 | Servidor apagado → estado de error, no pantalla en blanco | Informe 3.9 | Falta la captura 09 |
| 12 | Tabla de la pantalla y capturas de los dos errores | Informe sección 4 | Falta pegar las capturas |
| 13 | Subir los dos proyectos y el entregable | `backend/` + raíz en la rama `lab12` | Push y entrega del Word |

## Rúbrica

| Criterio | Puntos | Evidencia |
| --- | --- | --- |
| CORS con los orígenes justos, sin comodín | 5 | `CORS_ALLOWED_ORIGINS` desde `.env` con solo `localhost:5173` y `127.0.0.1:5173`; pruebas de origen permitido, rechazado y preflight |
| Listar, crear y eliminar con Axios; la interfaz refleja el cambio sin recargar | 5 | `moviesApi.js`; tras crear se navega a la lista; tras borrar, `refresh()` |
| Tres estados distinguibles a simple vista; error específico | 5 | Esqueleto gris, tabla, recuadro rojo con el motivo real (servidor/CORS, 400, 404, 5xx) |
| Repositorio con cliente y servidor; cómo levantar cada lado y qué origen espera | 5 | README → "Lab 12" (tabla de orígenes y dos terminales) |
