/**
 * Logs out the user by deleting the JWT token and refresh token from the local storage and redirecting the user to the login page.
 */
export function logout() {
    // Delete the JWT token and refresh token from the local storage
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirect the user to the login page
    window.location.href = "/login";
}
