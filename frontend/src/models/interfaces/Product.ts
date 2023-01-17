import { Commentary } from './Commentary';
import { ProductSpecs } from './ProductSpecs';
import { Image } from './Image';

/**
 * Interface for Product model
 *
 * @interface Product
 * @property {string} id - ID of the product.
 * @property {string} name - Name of the product.
 * @property {number} price - Price of the product.
 * @property {string} description - Description of the product.
 * @property {ProductSpecs} specs - Specifications of the product.
 * @property {number} stock - Stock of the product.
 * @property {Array<Image>} images - Images of the product.
 * @property {Commentary[]} feedback - Feedback of the product.
 * @property {number} categoryId - ID of the categoryId of the product.
 * @property {Array<number>} subcategoriesIds - IDs of the subcategoriesIds of the product.
 * @property {number} [rate] - Average rate of the product.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  specs: ProductSpecs;
  stock: number;
  images: Image[];
  feedback: Commentary[];
  categoryId: string;
  subcategoriesIds: string[];
  rate?: number;
}
