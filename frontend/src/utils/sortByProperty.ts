/**
 * Sorts an array by a given property name in ascending or descending order.
 *
 * @template T
 * @param {T[]} array - The array to sort.
 * @param {keyof T} propName - The name of the property to sort by.
 * @param {'ASC' | 'DESC'} order - The sort order ('ASC' for ascending, 'DESC' for descending).
 * @returns {void}
 */
export const sortByProperty = <T>(array: T[], propName: keyof T, order: "ASC" | "DESC"): void => {
  array.sort((a, b) => (a[propName] > b[propName] ? 1 : -1) * (order === "ASC" ? 1 : -1));
};

