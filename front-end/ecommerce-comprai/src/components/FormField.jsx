/**
 * Label + input + error message, with the accessibility attributes wired up.
 * Any extra prop (type, min, maxLength, ...) goes straight to the input.
 * @param {{id: string, label: string, error?: string,
 *   as?: "input"|"textarea"}} props
 */
function FormField({ id, label, error, as: Component = "input", ...inputProps }) {
    const errorId = `${id}-error`;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>

            <Component
                id={id}
                name={id}
                className={`form-control ${error ? "is-invalid" : ""}`}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                {...inputProps}
            />

            {error && (
                <div id={errorId} className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
}

export default FormField;
