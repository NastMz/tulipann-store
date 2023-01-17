/**
 * Interface for Subcategory model
 *
 * @interface Subcategory
 * @property {string} id - ID of the subcategory.
 * @property {string} name - Name of the subcategory.
 * @property {number} categoryId - ID of the categoryId of the subcategory.
 */
export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}
