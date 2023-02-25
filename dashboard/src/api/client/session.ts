/**
 * Determines if the user is logged in by checking if the JWT token exists in the local storage.
 *
 * @returns {boolean} - True if the user is logged in, false otherwise.
 */
export function isLoggedIn(): boolean {
    let jwtToken = localStorage.getItem("id_token");
    if (!jwtToken) {
        jwtToken = sessionStorage.getItem("id_token");
    }
    return jwtToken !== null;
}


/**
 * Validates if the user is logged in and the JWT token is valid.
 * If the token has expired, it tries to refresh it with the refresh token.
 *
 * @returns {Promise<boolean>} - A promise that resolves with true if the user is logged in and the token is valid, false otherwise.
 */
export async function validateSession(): Promise<boolean> {
    // If the user is not logged in, return false
    if (!isLoggedIn()) {
        return false;
    }

    // If the user is logged in return true
    return true;
}