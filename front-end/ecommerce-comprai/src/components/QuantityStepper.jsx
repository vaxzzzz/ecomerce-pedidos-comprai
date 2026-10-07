/**
 * Quantity selector with "-" and "+" buttons.
 * Buttons are used instead of a typed number so the value can never be
 * invalid (below the minimum or above the stock).
 * @param {{label: string, value: number, min: number, max: number,
 *   onChange: (newValue: number) => void}} props
 */
function QuantityStepper({ label, value, min, max, onChange }) {
    return (
        <div className="input-group quantity-stepper" role="group" aria-label={label}>
            <button
                type="button"
                className="btn btn-outline-secondary"
                aria-label={`Diminuir quantidade: ${label}`}
                disabled={value <= min}
                onClick={() => onChange(value - 1)}
            >
                <i className="bi bi-dash" aria-hidden="true"></i>
            </button>

            <output className="input-group-text justify-content-center quantity-value" aria-live="polite">
                {value}
            </output>

            <button
                type="button"
                className="btn btn-outline-secondary"
                aria-label={`Aumentar quantidade: ${label}`}
                disabled={value >= max}
                onClick={() => onChange(value + 1)}
            >
                <i className="bi bi-plus" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default QuantityStepper;
