/**
 * Interface for Commentary model
 *
 * @interface Commentary
 * @property {string} id - ID of the commentary.
 * @property {1 | 2 | 3 | 4 | 5} rate - Rate of the commentary.
 * @property {string} UserId - ID of the user who left the commentary.
 * @property {string} text - Text of the commentary.
 * @property {string} productId - ID of the product to which the commentary refers.
 */
export interface Commentary {
    id: string;
    rate: 1 | 2 | 3 | 4 | 5;
    UserId: string;
    text: string;
    productId: string;
}
