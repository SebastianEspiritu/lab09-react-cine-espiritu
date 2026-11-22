# Informe — Laboratorio 12: Servicios web (Django + React con Axios)

## 1. Datos generales

| Campo | Información |
| --- | --- |
| Curso | Desarrollo de Aplicaciones Empresariales |
| Sección | 4-C24-B |
| Docente | Michael Montgomery Rosell |
| Alumno | Sebastián Espíritu |
| Proyecto | Cinema Espiritu (continuación del Lab 11) |
| Repositorio | https://github.com/SebastianEspiritu/lab09-react-cine-espiritu (rama `lab12`) |

## 2. Capacidades trabajadas

- Habilitar el consumo de la API de Django desde otro origen configurando CORS.
- Consumir los servicios web desde React con Axios: listar, crear y eliminar.
- Resolver en la interfaz los tres estados de una petición: carga, datos y error.

## 3. Desarrollo

Desarrollos: **Sebastián Espíritu**.

> **Capturas.** Cada apartado indica la captura que va en el entregable. Se guardan en `docs/evidence/lab12/` con el nombre sugerido.

### 3.1. API de Django y CORS (pasos 1 y 2)

Este repositorio no tenía la API del laboratorio 8, así que se creó en `backend/` una API de películas con Django REST Framework. Sus campos son los mismos que el adaptador del Lab 11 ya esperaba (`movie_id`, `name`, `overview`, `poster_file`, `age_rating`, `score`, `show_times`, `release_date`).

Se instaló `django-cors-headers`, se declaró en `INSTALLED_APPS` y su middleware se colocó **justo después** de `SecurityMiddleware`:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
    'rest_framework',
    'movies',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

# Only the React dev server origins listed in .env may call the API.
CORS_ALLOWED_ORIGINS = env_list('CORS_ALLOWED_ORIGINS')
```

```dotenv
# backend/.env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Se autorizan **solo** los dos orígenes del servidor de Vite. No se usa `CORS_ALLOW_ALL_ORIGINS` (el comodín). Los orígenes, la clave secreta y el modo DEBUG salen de `.env`, así que cada entorno puede tener los suyos sin tocar `settings.py`.

Direcciones de la API:

| Recurso | Dirección |
| --- | --- |
| Raíz de la API | `http://127.0.0.1:8000/api/` |
| Listar / crear | `http://127.0.0.1:8000/api/movies/` |
| Eliminar | `http://127.0.0.1:8000/api/movies/{id}/` |

**Captura `01-api-root.png`:** `http://127.0.0.1:8000/api/movies/` abierta en el navegador con el JSON de las 8 películas.

### 3.2. Proyecto de React y Axios (paso 3)

Se partió de la rama `lab11` y se creó la rama `lab12`. Se instalaron Axios y React Router:

```powershell
git checkout lab11
git checkout -b lab12
npm install axios react-router-dom
```

### 3.3. Módulo de cliente de la API (paso 4)

```js
// src/lib/httpClient.js
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/+$/, '')

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: { Accept: 'application/json' },
})
```

```js
// src/lib/moviesApi.js
const MOVIES_PATH = '/movies/'

export async function listMovies({ signal } = {}) {
  const { data } = await httpClient.get(MOVIES_PATH, { signal })
  return data.map(adaptMovie)
}

export async function createMovie(movie) {
  const { data } = await httpClient.post(MOVIES_PATH, toRawMovie(movie))
  return adaptMovie(data)
}

export async function deleteMovie(movieId) {
  await httpClient.delete(`${MOVIES_PATH}${encodeURIComponent(movieId)}/`)
}
```

(Se muestra simplificado: cada función envuelve el error con `toApiError()`.)

La dirección base está en un solo sitio. Ningún componente escribe una URL: solo llaman a `listMovies`, `createMovie` y `deleteMovie`. `toApiError()` convierte cualquier fallo de Axios en un `ApiError` con un mensaje claro y, si la respuesta es 400, con el mensaje de cada campo.

### 3.4. Página de listado con sus tres estados (pasos 5 y 6)

```js
// src/hooks/useMovies.js
const [result, setResult] = useState({ status: 'loading', movies: [], error: null, isRefreshing: false })

useEffect(() => {
  const controller = new AbortController()

  listMovies({ signal: controller.signal })
    .then((movies) => setResult({ status: 'ready', movies, error: null, isRefreshing: false }))
    .catch((error) => {
      if (controller.signal.aborted) return
      setResult({ status: 'error', movies: [], error, isRefreshing: false })
    })

  return () => controller.abort()
}, [requestId])
```

```jsx
// src/pages/MoviesPage/MoviesPage.jsx
{status === 'loading' && <TableSkeleton rows={6} columns={6} label="Loading movies" />}
{status === 'error' && (
  <ErrorMessage title="We couldn't load the movies" error={error} onRetry={reload} />
)}
{status === 'ready' && movies.length > 0 && <table className="movies-table">…</table>}
```

La petición `GET` sale dentro de `useEffect` al montar la página. Si el usuario se va antes de que llegue la respuesta, el `AbortController` la cancela y no se actualiza un componente que ya no existe. La página de inicio usa el mismo hook para la cartelera.

**Capturas:** `02-loading.png` (esqueleto), `03-table.png` (tabla con datos) y `04-error.png` (error con Try again).

### 3.5. Borrado (paso 7)

```jsx
async function handleDelete(movie) {
  setDeletingId(movie.id)
  try {
    await deleteMovie(movie.id)
    onMovieDeleted(movie.id)
    onNotify(`🗑 “${movie.title}” was deleted`, 'info')
    refresh() // pide la lista otra vez sin quitar la tabla
  } catch (requestError) {
    setDeleteError({ title: movie.title, error: requestError })
  } finally {
    setDeletingId(null)
    setConfirmingId(null)
  }
}
```

**Delete** pide confirmación en la misma fila (**Confirm / Cancel**). Al terminar el `DELETE`, la lista se vuelve a pedir y la tabla se actualiza **sin recargar la página**. Si la película era favorita, se quita del contador de la cabecera.

**Captura `05-delete.png`:** fila con Confirm/Cancel y, luego, la tabla con una película menos y el aviso.

### 3.6. Formulario de alta (paso 8)

```jsx
function handleChange(event) {
  const { name, value } = event.target
  setValues((current) => ({ ...current, [name]: value }))
}

async function handleSubmit(event) {
  event.preventDefault() // the browser must not reload the page
  setIsSaving(true)
  try {
    const created = await createMovie(values)
    onNotify(`★ “${created.title}” was added`, 'success')
    navigate('/manage')
  } catch (error) {
    setFieldErrors(error.fieldErrors ?? {})
    setFormError(error)
    setIsSaving(false)
  }
}
```

Todas las entradas son controladas (`value` + `onChange`). `onSubmit` evita el envío del navegador, hace el `POST` con el cuerpo y, al terminar, navega al listado con `useNavigate`. El formulario usa `noValidate` a propósito: quien valida es la API, y sus mensajes se muestran junto a cada campo.

**Captura `06-form.png`:** formulario lleno y, después, la nueva película en la tabla.

### 3.7. Error de CORS provocado (paso 9)

1. En `backend/.env` se cambió `CORS_ALLOWED_ORIGINS` por `http://localhost:3000` (un origen distinto) y se reinició `runserver`.
2. Al recargar `http://localhost:5173/manage`, la consola del navegador mostró:

   ```text
   Access to XMLHttpRequest at 'http://127.0.0.1:8000/api/movies/' from origin 'http://localhost:5173'
   has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
   ```

3. En la pestaña **Network** la petición aparece marcada como **CORS error**, aunque en la terminal de Django se ve que respondió `200`: el servidor contestó, pero el navegador no deja que React lea la respuesta. Axios la recibe como error de red (sin `response`), así que la pantalla muestra el estado de error.
4. Se volvió a poner `http://localhost:5173,http://127.0.0.1:5173`, se reinició el servidor y la tabla cargó otra vez.

**Lectura:** CORS no lo aplica Django sino el navegador. Django responde, pero sin la cabecera `Access-Control-Allow-Origin` para ese origen el navegador bloquea la lectura. Por eso desde Postman o abriendo la URL directamente sí se ven los datos.

**Captura `07-cors-error.png`:** consola con el mensaje de CORS y la pantalla en estado de error.

### 3.8. Error de validación desde el formulario (paso 10)

Se envió el formulario con **Title** vacío. La API respondió `400 Bad Request`:

```json
{ "name": ["This field may not be blank."] }
```

`toApiError()` traduce `name` → `title` y el mensaje aparece en rojo bajo el campo, con el aviso general *"The movie was not saved…"*. Al escribir en el campo, el mensaje desaparece. También se probó una puntuación de `150` (*"Ensure this value is less than or equal to 100."*) y un horario `25:00` (mensaje del validador del modelo).

**Captura `08-validation.png`:** formulario con el mensaje de la API bajo Title y la petición 400 en Network.

### 3.9. Servidor apagado (paso 11)

Con la app abierta en `/manage` se detuvo Django (`Ctrl+C`) y se pulsó **Reload**. La pantalla mostró el estado de error, no una pantalla en blanco:

> We couldn't load the movies — Can't reach the API at http://127.0.0.1:8000/api. Check that the Django server is running and that it allows this origin (http://localhost:5173) through CORS.

Al levantar de nuevo el servidor y pulsar **Try again**, la tabla volvió a cargar. La página de inicio hace lo mismo con la cartelera, y los estrenos del Lab 11 siguen funcionando porque no dependen de la API.

**Captura `09-server-down.png`.**

## 4. Tabla de la pantalla (paso 12)

| Pantalla | Petición al entrar | Carga | Datos | Error |
| --- | --- | --- | --- | --- |
| `/manage` (Manage movies) | `GET /api/movies/` | Filas grises con la forma de la tabla | Tabla: afiche, título e id, clasificación, ★ puntuación, horarios, Delete | Recuadro rojo con el motivo, la dirección de la API y **Try again** |
| `/` (inicio) | `GET /api/movies/` | Tarjetas grises "Loading movie listings…" | Banner con la primera película, buscador y cartelera | Recuadro rojo con **Try again**; los estrenos siguen visibles |
| `/manage/new` (formulario) | Ninguna; `POST /api/movies/` al guardar | Botón "Saving…" desactivado | Navega al listado y muestra el aviso "was added" | Aviso general + mensaje de la API bajo cada campo |

## 5. Casos de prueba

| N.º | Caso | Pasos | Resultado esperado |
| --- | --- | --- | --- |
| 1 | Listar | Entrar a `/manage` | Esqueleto y luego 8 filas |
| 2 | Crear | Add movie → llenar → Save | Vuelve a la lista con la nueva fila y aviso verde |
| 3 | Eliminar | Delete → Confirm | La fila desaparece sin recargar; aviso "was deleted" |
| 4 | Título vacío | Save sin título | 400; "This field may not be blank." bajo Title |
| 5 | Puntuación 150 | Score = 150 | 400; "Ensure this value is less than or equal to 100." |
| 6 | Horario inválido | Showtimes = 25:00 | 400; mensaje del formato de 24 horas |
| 7 | CORS | Quitar el origen en `.env` | Bloqueo en consola + estado de error |
| 8 | Servidor apagado | `Ctrl+C` en Django + Reload | Estado de error, no pantalla en blanco |
| 9 | Reintento | Encender Django + Try again | Vuelve la tabla |
| 10 | Favorita borrada | Marcar favorita, borrarla en Manage | El contador de la cabecera baja |
| 11 | Pruebas del backend | `python manage.py test movies` | 8 pruebas OK (listar, crear, validaciones, borrar, CORS permitido, CORS rechazado, preflight) |

## 6. Observaciones

- **Cómo levantar los dos lados:** API con `python manage.py runserver` en `http://127.0.0.1:8000` y React con `npm run dev` en `http://localhost:5173`. Pasos completos en el README.
- **Qué origen espera cada uno:** la API solo acepta `http://localhost:5173` y `http://127.0.0.1:5173`. React llama a `http://127.0.0.1:8000/api` (configurable con `VITE_API_URL`). Vite usa `strictPort` para que el puerto no cambie solo a 5174, que no está autorizado.
- Ningún secreto está en el repositorio: `backend/.env` está en `.gitignore` y se entrega `backend/.env.example`.
- Las favoritas usan una nueva clave de `localStorage` (`…:favorites:v2`), porque los ids ahora son los de la base de datos y no los del Lab 11.

## 7. Conclusiones

1. CORS es una regla del navegador: el servidor debe declarar explícitamente qué orígenes pueden leer sus respuestas, y conviene listar solo los necesarios en vez de usar el comodín.
2. Centralizar la dirección base y las peticiones en un módulo de cliente deja a los componentes sin URLs y permite cambiar de servidor desde una sola variable.
3. Toda petición tiene tres estados (carga, datos y error). Mostrarlos explícitamente evita pantallas en blanco cuando la red o el servidor fallan.
4. Dejar la validación en la API y mostrar sus mensajes junto a cada campo mantiene una sola fuente de reglas para todos los clientes.
