import {ProductSpecs} from './ProductSpecs';
import {Image} from './Image';

/**
 * Interface for Product model
 *
 * @interface Product
 * @property {string} id - ID of the product.
 * @property {string} name - Name of the product.
 * @property {number} price - Price of the product.
 * @property {string} description - Description of the product.
 * @property {ProductSpecs} specification - Specifications of the product.
 * @property {number} stock - Stock of the product.
 * @property {Array<Image>} images - Images of the product.
 * @property {string} categoryId - ID of the id of the product.
 * @property {Array<string>} subcategories - IDs of the subcategories of the product.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  specification: ProductSpecs;
  stock: number;
  images: Image[];
  categoryId: string;
  subcategories: Array<any>;
}

/**
 * Interface for NewProduct model.
 *
 * @interface NewProduct
 * @property {string} name - Name of the product.
 * @property {number} price - Price of the product.
 * @property {string} description - Description of the product.
 * @property {ProductSpecs} specification - Specifications of the product.
 * @property {number} stock - Stock of the product.
 * @property {Array<Image>} images - Images of the product.
 * @property {string} categoryId - ID of the id of the product.
 * @property {Array<string>} subcategories - IDs of the subcategories of the product.
 */
export interface NewProduct {
  name: string;
  price: number;
  description: string;
  specification: any;
  stock: number;
  images: Image[];
  categoryId: string;
  subcategories: Array<any>;
}

/**
 * Interface for UpdateProduct model.
 *
 * @interface UpdateProduct
 * @property {string} name - Name of the product.
 * @property {number} price - Price of the product.
 * @property {string} description - Description of the product.
 * @property {ProductSpecs} specification - Specifications of the product.
 * @property {number} stock - Stock of the product.
 * @property {Array<Image>} images - Images of the product.
 * @property {string} categoryId - ID of the id of the product.
 * @property {Array<string>} subcategories - IDs of the subcategories of the product.
 */
export interface UpdateProduct extends NewProduct {

}