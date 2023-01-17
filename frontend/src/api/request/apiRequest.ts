import axios from "axios";

/**
 * Sends an API request with the given method, URL and data.
 *
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method - HTTP method for the request.
 * @param {string} url - URL for the request.
 * @param {any} [data] - Data to be sent in the request (optional).
 * @param {boolean} useAuth - Whether to use the JWT token for authentication (Default true).
 * @returns {Promise<any>} Response data.
 */
export async function apiRequest(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: any,
    useAuth = true,
    contentType: "application/json" | "multipart/form-data" | "application/x-www-form-urlencoded" = "application/json"
): Promise<any> {
    // Check if the JWT token has expired
    let jwt = "";
    if (localStorage.getItem("jwt")) {
        jwt = localStorage.getItem("jwt")!;
        const { exp } = JSON.parse(Buffer.from(jwt.split(".")[1], "base64").toString());
        if (Date.now() >= exp * 1000) {
            // Refresh the JWT token
            const refreshToken = localStorage.getItem("refresh_token")!;
            const refreshData = await axios.post("/api/refresh-token", {refreshToken});
            if (refreshData.data.success) {
                jwt = refreshData.data.token;
                localStorage.setItem("jwt", jwt); // Updates the JWT token in the local storage
            } else {
                // If the refresh token has expired or is invalid, delete the token and redirect the user to the login page
                localStorage.removeItem("jwt");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return;
            }
        }
    }

    // Set the options for the request
    const options: any = {
        method,
        url,
        data,
        headers: {
            "Content-Type": contentType,
        },
    };

    // Add the JWT token to the headers if authentication is enabled
    if (useAuth) {
        if (jwt) {
            options.headers.Authorization = `Bearer ${jwt}`;
        } else {
        // If there is no JWT token, redirect the user o the login page
            window.location.href = "/login";
            return;
        }
    }
    // Send the request and return the response data
    const response = await axios(options);
    return response.data;
}
