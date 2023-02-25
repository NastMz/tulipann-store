/**
 * Interface for User model
 *
 * @interface User
 * @property {string} id - ID of the user.
 * @property {string} firstName - First featureName of the user.
 * @property {string} lastName - Last featureName of the user.
 * @property {string} email - Email of the user.
 * @property {string} phone - Phone number of the user.
 * @property {string} department - Department of the user.
 * @property {string} cityId - City of the user.
 * @property {string} address - Address of the user.
 */
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    departmentId: string;
    cityId: string;
    address: string;
}