import {Image} from './Image';

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

/**
 * Interface for NewCategory model.
 *
 * @interface NewCategory
 * @property {string} name - Name of the new categoryId.
 * @property {Image} image - Image of the new categoryId.
 */
export interface NewCategory {
    name: string;
    image: Image;
}

/**
 * Interface for UpdateCategory model.
 *
 * @interface UpdateCategory
 * @property {string} name - Name of the updated categoryId.
 * @property {Image} image - Image of the updated categoryId.
 */
export interface UpdateCategory {
    name: string;
    image: Image;
}