import {Feature} from './Feature';

/**
 * Interface for ProductSpecs model
 *
 * @interface ProductSpecs
 * @property {string} summary - Summary of the product specifications.
 * @property {Feature[]} features - Options of the product.
 */
export interface ProductSpecs {
  summary: string;
  features: Feature[];
}
