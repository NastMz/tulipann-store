import { apiRequest } from "../request";
import { exchangeIdTokenForTokens } from "./token";

/**
 * Sends a login request to the server with the given email and password.
 *
 * @param {string} email - Email for the login.
 * @param {string} password - Password for the login.
 * @returns {Promise<void>} - A promise that resolves when the login request is successful.
 */
export async function login(email: string, password: string) {
    try {
        // Send a POST request to the '/api/login' endpoint with the email and password
        const { data } = await apiRequest("POST", "/api/login", { email, password }, false);
        if (data.success) {
            // Get the id token from the server response
            const idToken = data.token;

            // Exchange the id token for an access token and refresh token
            const { accessToken, refreshToken } = await exchangeIdTokenForTokens(idToken);

            // Save the id token, access token, and refresh token in the local storage
            localStorage.setItem("id_token", idToken);
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

        } else {
            // If the login was not successful, throw an error
            throw new Error(data.error);
        }
    } catch (error) {
        // Re-throw the error
        throw error;
    }
}
