import rawPremieres from '../data/premieres.js'

// Simulated network request. Resolves with the raw premieres after `delay` ms,
// or rejects with a descriptive error when `shouldFail` is true.
export function fetchPremieres({ shouldFail = false, delay = 1500 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('The premieres service did not respond (simulated network error).'))
        return
      }
      resolve(rawPremieres)
    }, delay)
  })
}

// Lets the error state be shown on purpose by opening the page with ?fail=1
export function failRequestedInUrl() {
  return new URLSearchParams(window.location.search).get('fail') === '1'
}
