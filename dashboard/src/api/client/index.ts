/**
 * Exports of functions for interacting with the client.
 *
 * @module client
 * @exports {function} login - Function to log in the user.
 * @exports {function} logout - Function to log out the user.
 * @exports {function} isLoggedIn - Function to validate if the user is logged in.
 * @exports {function} isTokenExpired - Function to validate if JWT token has expired.
 * @exports {function} validateSession - Function to validate if the user is logged in and the JWT token is valid.
 */

export { login } from "./login";
export { logout } from "./logout";
export {isLoggedIn, validateSession } from "./session";
export {isTokenExpired} from "./token";
