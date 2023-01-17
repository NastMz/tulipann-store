import { Image } from './Image';

/**
 * Interface for Feature model
 *
 * @interface Feature
 * @property {string} id - ID of the feature.
 * @property {string} name - Name of the feature.
 * @property {string} title - Title of the feature.
 * @property {string} description - Description of the feature.
 * @property {Image} image - Image of the feature.
 */
export interface Feature {
  id: string;
  name: string;
  title: string;
  description: string;
  image: Image;
}
