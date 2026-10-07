import { useState } from "react";
import FormField from "./FormField";
import { MIN_NAME_LENGTH } from "../constants";
import { isValidCpf, isValidEmail, isValidPhone, isValidZipCode } from "../utils/validators";

const EMPTY_CLIENT = {
    name: "",
    email: "",
    cpf: "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    city: "",
    state: "",
};

const STATE_LENGTH = 2; // UF, e.g. "SP"

/**
 * Validates the form values.
 * @param {object} values - Current form values.
 * @returns {object} Map field → error message (empty when everything is valid).
 */
function validate(values) {
    const errors = {};

    if (values.name.trim().length < MIN_NAME_LENGTH) {
        errors.name = `O nome precisa ter pelo menos ${MIN_NAME_LENGTH} letras.`;
    }
    if (!isValidEmail(values.email)) errors.email = "Informe um e-mail válido.";
    if (!isValidCpf(values.cpf)) errors.cpf = "CPF inválido.";
    if (!isValidPhone(values.phone)) errors.phone = "Telefone inválido. Use DDD + número.";
    if (!isValidZipCode(values.zipCode)) errors.zipCode = "CEP inválido. Use 8 números.";
    if (!values.street.trim()) errors.street = "Informe a rua.";
    if (!values.number.trim()) errors.number = "Informe o número.";
    if (!values.city.trim()) errors.city = "Informe a cidade.";
    if (values.state.trim().length !== STATE_LENGTH) errors.state = "Use a sigla (ex.: SP).";

    return errors;
}

/**
 * Create/edit client form.
 * @param {{initialValues?: object, submitLabel?: string, isSubmitting?: boolean,
 *   onSubmit: (client: object) => void}} props
 */
function ClientForm({ initialValues, submitLabel = "Salvar", isSubmitting = false, onSubmit }) {
    const [values, setValues] = useState({ ...EMPTY_CLIENT, ...initialValues });
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const foundErrors = validate(values);
        setErrors(foundErrors);

        if (Object.keys(foundErrors).length === 0) {
            onSubmit({ ...values, state: values.state.trim().toUpperCase() });
        }
    }

    // Shortcut: every field uses the same props, only id/label/error change.
    function field(id, label, extraProps = {}) {
        return (
            <FormField
                id={id}
                label={label}
                value={values[id]}
                onChange={handleChange}
                error={errors[id]}
                {...extraProps}
            />
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {field("name", "Nome completo", { autoComplete: "name" })}

            <div className="row">
                <div className="col-md-6">{field("email", "E-mail", { type: "email", autoComplete: "email" })}</div>
                <div className="col-md-3">{field("cpf", "CPF", { inputMode: "numeric" })}</div>
                <div className="col-md-3">{field("phone", "Telefone", { type: "tel", autoComplete: "tel" })}</div>
            </div>

            <h2 className="h5 mt-3 mb-3">Endereço</h2>

            <div className="row">
                <div className="col-md-3">{field("zipCode", "CEP", { inputMode: "numeric", autoComplete: "postal-code" })}</div>
                <div className="col-md-7">{field("street", "Rua", { autoComplete: "address-line1" })}</div>
                <div className="col-md-2">{field("number", "Número")}</div>
            </div>

            <div className="row">
                <div className="col-md-8">{field("city", "Cidade")}</div>
                <div className="col-md-4">{field("state", "Estado (UF)", { maxLength: STATE_LENGTH })}</div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : submitLabel}
            </button>
        </form>
    );
}

export default ClientForm;
