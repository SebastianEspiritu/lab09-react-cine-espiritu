import { useId, useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx'
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton.jsx'
import PremieresCarousel from '../PremieresCarousel/PremieresCarousel.jsx'
import Button from '../Button/Button.jsx'
import usePremieres from '../../hooks/usePremieres.js'

// Only this section needs the premieres, so their state lives here and not in App.
function PremieresSection() {
  const { status, premieres, error, reload } = usePremieres()
  const [simulateError, setSimulateError] = useState(false)
  const checkboxId = useId()

  return (
    <section className="premieres" id="coming-soon" aria-labelledby="coming-soon-title" aria-busy={status === 'loading'}>
      <div className="premieres-header">
        <div>
          <p className="section-label">Premieres</p>
          <h2 id="coming-soon-title">Coming soon</h2>
        </div>
        <div className="premieres-tools">
          <label className="checkbox-field" htmlFor={checkboxId}>
            <input
              id={checkboxId}
              type="checkbox"
              checked={simulateError}
              onChange={(event) => setSimulateError(event.target.checked)}
            />
            Simulate network error
          </label>
          <Button variant="ghost" onClick={() => reload({ shouldFail: simulateError })} disabled={status === 'loading'}>
            Reload premieres
          </Button>
        </div>
      </div>

      {status === 'loading' && <LoadingSkeleton count={3} label="Loading premieres" />}
      {status === 'error' && (
        <ErrorMessage
          title="We couldn't load the premieres"
          error={error}
          onRetry={() => reload({ shouldFail: simulateError })}
        />
      )}
      {status === 'ready' && <PremieresCarousel premieres={premieres} />}
    </section>
  )
}

export default PremieresSection
