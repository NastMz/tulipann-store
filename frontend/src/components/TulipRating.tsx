/** A rating drawn as five tulip buds instead of stars. */
export function TulipRating({ value, count, small }: { value: number; count?: number; small?: boolean }) {
  const rounded = Math.round(value);
  return (
    <span className={small ? "tulips tulips--small" : "tulips"} title={`${value.toFixed(1)} de 5`}>
      <span className="visually-hidden">
        {value.toFixed(1)} de 5{count !== undefined ? `, ${count} notas` : ""}
      </span>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 16 20" aria-hidden="true" className={n <= rounded ? "bud is-on" : "bud"}>
          <path d="M8 19 V11" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 12 C3.5 12 2.5 7 3 2.5 C5 4 6 4 8 1 C10 4 11 4 13 2.5 C13.5 7 12.5 12 8 12 Z" />
        </svg>
      ))}
      {count !== undefined && <span className="tulips__count num">({count})</span>}
    </span>
  );
}

export function TulipRatingInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <span className="tulips tulips--input" role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} de 5`}
          onClick={() => onChange(n)}
        >
          <svg viewBox="0 0 16 20" aria-hidden="true" className={n <= value ? "bud is-on" : "bud"}>
            <path d="M8 19 V11" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 12 C3.5 12 2.5 7 3 2.5 C5 4 6 4 8 1 C10 4 11 4 13 2.5 C13.5 7 12.5 12 8 12 Z" />
          </svg>
        </button>
      ))}
    </span>
  );
}
