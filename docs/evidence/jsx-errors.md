# Evidencias de errores JSX y React — Laboratorio 09

Fecha: 6 de noviembre de 2026 (America/Lima).

Se revisaron el paso 11 del procedimiento y la rúbrica original. Estado inicial: rama main y árbol de trabajo limpio. Los tres casos se provocaron por separado en MovieList.jsx; cada modificación se restauró antes de iniciar la siguiente.

Entorno: Node v24.15.0, React 19.3.1, Vite 8.3.6.

Método: para A y C se cargó App con Vite en desarrollo (ssrLoadModule) y se renderizó con React DOM Server (renderToStaticMarkup), capturando console.error/console.warn y formateando los argumentos originales. Se retiraron los códigos ANSI de color y los espacios al final de las líneas para facilitar la lectura del diagnóstico. Para B se ejecutó la compilación real con la API build de Vite (write: false), capturando el diagnóstico del compilador. Son mensajes reales de terminal, no capturas de consola del navegador. Las líneas corresponden a cada reproducción; React no necesariamente incluye una línea en su advertencia.

En B, el return tenía la sección original seguida de un párrafo al mismo nivel. Extracto abreviado:

```jsx
return (
  <section className="movie-list" id="now-showing" tabIndex={-1} aria-labelledby="now-showing-title">
    {/* Contenido original de MovieList sin cambios */}
  </section>
  <p>Temporary adjacent root</p>
)
```

El comentario en este extracto solo abrevia la documentación; no se insertó en el archivo probado.

## A. class en lugar de className

- Archivo: `src/components/MovieList/MovieList.jsx` (en la primera reproducción el componente aún estaba en `src/components/MovieList.jsx`; por eso el mensaje de Vite muestra esa ruta).
- Línea durante la reproducción: **5** (archivo modificado temporalmente).

Código incorrecto:

```jsx
<section class="movie-list" id="now-showing" tabIndex={-1} aria-labelledby="now-showing-title">
```

Mensaje real capturado:

```text
Invalid DOM property `class`. Did you mean `className`?
```

Explicación: JSX acepta este atributo al compilar, pero React en desarrollo advierte que la propiedad DOM debe llamarse className. Es una advertencia, no un fallo de compilación.

Solución aplicada: Usar className="movie-list" en el elemento section.

Resultado: archivo restaurado exactamente al original y renderizado posterior sin advertencias.

## B. Dos elementos JSX raíz adyacentes

- Archivo: `src/components/MovieList/MovieList.jsx` (en la primera reproducción el componente aún estaba en `src/components/MovieList.jsx`; por eso el mensaje de Vite muestra esa ruta).
- Línea durante la reproducción: **14** (archivo modificado temporalmente).

Código incorrecto:

```jsx
    <p>Temporary adjacent root</p>
```

Mensaje real capturado:

```text
Build failed with 1 error:

[builtin:vite-transform] Adjacent JSX elements must be wrapped in an enclosing tag.
    ╭─[ src/components/MovieList.jsx:14:5 ]
    │
 14 │     <p>Temporary adjacent root</p>
    │     ┬
    │     ╰──
    │
    │ Help: Did you want a JSX fragment `<>...</>`?
────╯

```

Explicación: El return contiene section y p como expresiones JSX adyacentes sin un contenedor único. El analizador de JSX rechaza el archivo y detiene la compilación.

Solución aplicada: Envolver ambos elementos en un fragmento <>...</> o en un contenedor semántico. En este experimento se elimina el párrafo temporal y se restaura la sección única original.

Resultado: archivo restaurado exactamente al original y renderizado posterior sin advertencias.

## C. Omitir key en map()

- Archivo: `src/components/MovieList/MovieList.jsx` (en la primera reproducción el componente aún estaba en `src/components/MovieList.jsx`; por eso el mensaje de Vite muestra esa ruta).
- Línea durante la reproducción: **10** (archivo modificado temporalmente).

Código incorrecto:

```jsx
          <MovieCard movie={movie} />
```

Mensaje real capturado:

```text
Each child in a list should have a unique "key" prop.

Check the render method of `MovieList`. See https://react.dev/link/warning-keys for more information.
```

Explicación: React necesita una key estable para identificar cada elemento entre renderizados. La lista se dibuja, pero React en desarrollo emite una advertencia. key se coloca en MovieCard, el elemento retornado directamente por map, y no se pasa al componente como una prop normal.

Solución aplicada: Restaurar <MovieCard key={movie.id} movie={movie} />. No usar el índice del arreglo.

Resultado: archivo restaurado exactamente al original y renderizado posterior sin advertencias.

## Verificación en el navegador (Chrome)

Los casos A y C se repitieron cargando la aplicación en Google Chrome y leyendo la consola del navegador; el caso B se repitió compilando. Mensajes obtenidos:

| Caso | Dónde aparece | Mensaje |
| --- | --- | --- |
| A. `class` | Consola del navegador (error de React) | Invalid DOM property `class`. Did you mean `className`? |
| B. Dos raíces | Compilación (la página no llega a generarse) | Error de sintaxis JSX en `MovieList.jsx:14`: dos elementos adyacentes sin contenedor |
| C. Sin `key` | Consola del navegador (error de React) | Each child in a list should have a unique "key" prop. Check the render method of `MovieList`. |

Conclusión: A y C no impiden que la página se vea, pero React los marca en la consola; B detiene la compilación. Tras restaurar `className`, la raíz única y `key={movie.id}`, la consola queda sin errores.

## Verificación final

Con el código corregido se dibujan ocho tarjetas y 24 horarios que coinciden con `movies.js`, y la consola del navegador no muestra errores ni advertencias de React.
