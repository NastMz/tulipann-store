import { Image } from './Image';

/**
 * Interface for Category model
 *
 * @interface Category
 * @property {string} id - ID of the id.
 * @property {string} name - Name of the id.
 * @property {Image} image - Image of the id.
 */
export interface Category {
  id: string;
  name: string;
  image: Image;
}
