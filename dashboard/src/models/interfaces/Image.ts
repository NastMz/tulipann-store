/**
 * Interface for Image model
 *
 * @interface Image
 * @property {string} src - Source URL of the image.
 * @property {string} hash - Blurhash of the image.
 */
export interface Image {
  src: string;
  hash: string;
}
