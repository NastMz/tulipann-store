import {apiRequest} from "../request";
import * as CryptoJS from "crypto-js";

/**
 * Validates if the JWT token in the local storage has expired.
 *
 * @returns {boolean} - True if the token has expired, false otherwise.
 */
export function isTokenExpired() {
    let encryptedAccessToken = localStorage.getItem("access_token")!;
    if (!encryptedAccessToken) {
        encryptedAccessToken = sessionStorage.getItem("access_token")!;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedAccessToken, import.meta.env.VITE_SECRET_KEY);
    let jwt = CryptoJS.enc.Utf8.stringify(bytes);

    if (!jwt) {
        return true;
    }

    try {
        // Decode the JWT
        const [header, payload, signature] = jwt.split(".");
        const decodedPayload = JSON.parse(atob(payload));

        // Get the expiry date
        const exp = decodedPayload.exp;
        const expiryDate = new Date(exp * 1000);

        // Check if the current time is past the token's expiration time
        const currentTime = new Date();

        return currentTime > expiryDate;
    } catch (error) {
        return true;
    }
}


/**
 * Sends a request to the server to exchange the given id token for an access token and refresh token.
 *
 * @param {string} idToken - The id token to exchange.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} - A promise that resolves with the access token and refresh token.
 */
export async function exchangeIdTokenForTokens(idToken: string) {
    try {
        // Send a POST request to the '/api/exchange' endpoint with the id token
        const response = await apiRequest("POST", "auth/token/get/", {id_token: idToken}, false);
        if (response.data) {
            // Return the access token and refresh token from the server response
            return {accessToken: response.data.access_token, refreshToken: response.data.refresh_token};
        } else {
            return {accessToken: "", refreshToken: ""};
        }
    } catch (error) {
        return {accessToken: "", refreshToken: ""};
    }
}



