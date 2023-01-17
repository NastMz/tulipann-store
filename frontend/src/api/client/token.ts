import {apiRequest} from "../request";

/**
 * Validates if the JWT token in the local storage has expired.
 *
 * @returns {boolean} - True if the token has expired, false otherwise.
 */
export function isTokenExpired() {
    const jwt = localStorage.getItem("access_token");
    if (jwt === null) {
        return true;
    }

    // Split the token into two parts: the header and the payload
    const [header, payload] = jwt.split(".");

    // Decode the base64-encoded header and payload
    const headerData = JSON.parse(Buffer.from(header, "base64").toString());
    const payloadData = JSON.parse(Buffer.from(payload, "base64").toString());

    // Check if the current time is past the token's expiration time
    const currentTime = Math.round(new Date().getTime() / 1000);
    return currentTime > payloadData.exp;
}

/**
 * Sends a refresh token request to the server with the given refresh token.
 *
 * @param {string} refreshToken - Refresh token for the refresh request.
 * @returns {Promise<string>} - A promise that resolves with the new JWT token if the request is successful, or rejects with an error message if the request fails.
 */
export async function refreshAccessToken(refreshToken: string): Promise<string> {
    try {
        // Send a POST request to the '/api/refresh' endpoint with the refresh token
        const { data } = await apiRequest("POST", "/api/refresh", { refresh_token: refreshToken }, false);
        if (data.success) {
            // Return the new JWT token
            return data.token;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        throw error;
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
        const { data } = await apiRequest("POST", "/api/exchange", { id_token: idToken }, false);
        if (data.success) {
            // Return the access token and refresh token from the server response
            return { accessToken: data.access_token, refreshToken: data.refresh_token };
        } else {
            return { accessToken: "", refreshToken: "" };
        }
    } catch (error) {
        return { accessToken: "", refreshToken: "" };
    }
}



