/**
 * Get all errors from an object.
 *
 * @param {string[] | object} errors - The array of errors.
 * @returns {string} - The string of errors.
 */
export function getErrors(errors: any): string {
    if (Array.isArray(errors)) {
        let stringErrors: string[] = errors;
        return stringErrors.length > 1 ? stringErrors.join(".\n") : stringErrors[0] || "";
    }
    if (typeof errors === "object") {
        let objectErrors: object = errors;
        let errorStrings = Object.values(objectErrors).reduce((acc, val) => {
            return Array.isArray(val) ? acc.concat(val) : acc;
        }, []) as string[];
        return errorStrings.length > 1 ? errorStrings.join(".\n") : errorStrings[0] || "";
    }
    return "Ocurrió un error inesperado.";
}

