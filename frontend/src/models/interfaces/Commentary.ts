/**
 * Interface for Commentary model
 *
 * @interface Commentary
 * @property {string} id - ID of the commentary.
 * @property {1 | 2 | 3 | 4 | 5} rate - Rating given by the user.
 * @property {number} userId - ID of the user who left the commentary.
 * @property {string} userName - Name of the user who left the commentary.
 * @property {string} commentary - Text of the commentary.
 */
export interface Commentary {
  id: string;
  rate: 1 | 2 | 3 | 4 | 5;
  userId: number;
  userName: string;
  commentary: string;
}
