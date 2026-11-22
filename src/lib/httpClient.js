import axios from 'axios'

// The API base URL lives here and nowhere else. Change it with VITE_API_URL.
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/+$/, '')

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: { Accept: 'application/json' },
})

// Error the components receive: a readable message, the HTTP status (if any)
// and the validation messages the API sent for each field.
export class ApiError extends Error {
  constructor(message, { status = null, fieldErrors = {}, cause } = {}) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

function toMessages(value) {
  if (Array.isArray(value)) return value.map(String).join(' ')
  if (value && typeof value === 'object') return Object.values(value).map(toMessages).join(' ')
  return String(value)
}

// Turns any Axios failure into an ApiError. `fieldNames` translates the API
// field names (snake_case) into the names the form uses.
export function toApiError(error, fieldNames = {}) {
  if (error instanceof ApiError) return error

  const { response } = error

  if (!response) {
    if (error.code === 'ECONNABORTED') {
      return new ApiError(`The API at ${API_BASE_URL} took too long to answer.`, { cause: error })
    }
    // The browser hides the reason: the server may be down or CORS blocked the answer.
    return new ApiError(
      `Can't reach the API at ${API_BASE_URL}. Check that the Django server is running and that it allows this origin (${window.location.origin}) through CORS.`,
      { cause: error },
    )
  }

  const { status, data } = response

  if (status === 400 && data && typeof data === 'object') {
    const fieldErrors = {}
    const general = []
    for (const [apiField, messages] of Object.entries(data)) {
      if (apiField === 'non_field_errors' || apiField === 'detail') {
        general.push(toMessages(messages))
      } else {
        fieldErrors[fieldNames[apiField] ?? apiField] = toMessages(messages)
      }
    }
    const message = general.length > 0
      ? general.join(' ')
      : 'The API rejected the data (400 Bad Request). Check the highlighted fields.'
    return new ApiError(message, { status, fieldErrors, cause: error })
  }

  if (status === 404) {
    return new ApiError('The API could not find that record (404). It may have been deleted already.', { status, cause: error })
  }

  if (status >= 500) {
    return new ApiError(`The API failed while answering (${status}). Check the Django console.`, { status, cause: error })
  }

  return new ApiError(`The API answered with an unexpected status (${status}).`, { status, cause: error })
}

export default httpClient
