import { useState } from "react";
import FormField from "./FormField";
import { MIN_NAME_LENGTH, SUGGESTED_CATEGORIES } from "../constants";

const EMPTY_PRODUCT = {
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
};

/**
 * Validates the form values.
 * @param {object} values - Current form values (all strings).
 * @returns {object} Map field → error message (empty when everything is valid).
 */
function validate(values) {
    const errors = {};

    if (values.name.trim().length < MIN_NAME_LENGTH) {
        errors.name = `O nome precisa ter pelo menos ${MIN_NAME_LENGTH} letras.`;
    }
    if (!values.category.trim()) {
        errors.category = "Informe a categoria.";
    }
    if (!(Number(values.price) > 0)) {
        errors.price = "O preço deve ser maior que zero.";
    }
    if (!Number.isInteger(Number(values.stock)) || Number(values.stock) < 0 || values.stock === "") {
        errors.stock = "O estoque deve ser um número inteiro (0 ou mais).";
    }

    return errors;
}

/**
 * Converts the text values of the form into the shape the API expects.
 * @param {object} values
 * @returns {object} Product with numeric price and stock.
 */
function toProduct(values) {
    return {
        name: values.name.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
        image: values.image.trim(),
    };
}

/**
 * Create/edit product form.
 * @param {{initialValues?: object, submitLabel?: string, isSubmitting?: boolean,
 *   onSubmit: (product: object) => void}} props
 */
function ProductForm({ initialValues, submitLabel = "Salvar", isSubmitting = false, onSubmit }) {
    const [values, setValues] = useState({ ...EMPTY_PRODUCT, ...initialValues });
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
            onSubmit(toProduct(values));
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormField id="name" label="Nome" value={values.name} onChange={handleChange} error={errors.name} />

            <FormField
                id="description"
                as="textarea"
                rows={3}
                label="Descrição"
                value={values.description}
                onChange={handleChange}
            />

            <div className="row">
                <div className="col-md-6">
                    <FormField
                        id="category"
                        label="Categoria"
                        list="category-options"
                        value={values.category}
                        onChange={handleChange}
                        error={errors.category}
                    />
                    <datalist id="category-options">
                        {SUGGESTED_CATEGORIES.map((category) => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>
                </div>

                <div className="col-md-3">
                    <FormField
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        label="Preço (R$)"
                        value={values.price}
                        onChange={handleChange}
                        error={errors.price}
                    />
                </div>

                <div className="col-md-3">
                    <FormField
                        id="stock"
                        type="number"
                        min="0"
                        label="Estoque"
                        value={values.stock}
                        onChange={handleChange}
                        error={errors.stock}
                    />
                </div>
            </div>

            <FormField
                id="image"
                type="url"
                label="URL da imagem (opcional)"
                value={values.image}
                onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : submitLabel}
            </button>
        </form>
    );
}

export default ProductForm;
