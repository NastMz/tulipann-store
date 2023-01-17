import { Image } from './Image';

/**
 * Interface for Category model
 *
 * @interface Category
 * @property {string} id - ID of the categoryId.
 * @property {string} name - Name of the categoryId.
 * @property {Image} img - Image of the categoryId.
 */
export interface Category {
  id: string;
  name: string;
  img: Image;
}
