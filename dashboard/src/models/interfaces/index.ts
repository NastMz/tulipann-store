/**
 * Exports types representing different types of data in the app.
 *
 * @module interfaces
 * @exports {object} Product - A type representing a product in the app.
 * @exports {object} NewProduct - A type representing a new product in the app.
 * @exports {object} UpdateProduct - A type representing a updated product in the app.
 * @exports {object} Category - A type representing a id of products in the app.
 * @exports {object} UpdateCategory - A type representing a updated categoryId in the app.
 * @exports {object} NewCategory - A type representing a new categoryId in the app.
 * @exports {object} Article - A type representing an article in the app.
 * @exports {object} Commentary - A type representing a customer commentary on a product in the app.
 * @exports {object} Feature - A type representing a feature of a product in the app.
 * @exports {object} NewFeature - A type representing a new feature of a product in the app.
 * @exports {object} ProductSpecs - A type representing the technical specifications of a product in the app.
 * @exports {object} Image - A type representing an image in the app.
 * @exports {object} Subcategory - A type representing a subcategory of products in the app.
 * @exports {object} User - A type representing a user in the app.
 * @exports {object} Order - A type representing an order in the app.
 * @exports {object} NewOrder - A type representing a new order in the app.
 * @exports {object} Department - A type representing a departmentId in the app.
 * @exports {object} City - A type representing a cityId in the app.
 */

export type {Product, NewProduct, UpdateProduct} from './Product';
export type {Category, UpdateCategory, NewCategory} from './Category';
export type {Article} from './Article';
export type {Commentary} from './Commentary';
export type {Feature, NewFeature} from './Feature';
export type {ProductSpecs} from './ProductSpecs';
export type {Image} from './Image';
export type {Subcategory, UpdateSubcategory, NewSubcategory} from './Subcategory';
export type {User} from './User';
export type {Order, NewOrder} from './Order';
export type {Department} from './Department';
export type {City} from './City';