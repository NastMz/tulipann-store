/**
 * Returns the name of a property of an object as a string.
 *
 * @template T
 * @param {Extract<keyof T, any>} name - The name of the property.
 * @returns {string} The name of the property as a string.
 */
export function nameOf<T>(name: keyof T) {
    return name;
}