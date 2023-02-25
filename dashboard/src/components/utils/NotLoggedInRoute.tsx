import React, {useEffect, useState} from "react";
import {Navigate} from 'react-router-dom';
import {validateSession} from "../../api/client";
import {routes} from "../../config/routes";

/**
 * Interface for NotLoggedInRoute component props
 *
 * @interface NotLoggedInRouteProps
 * @property {React.ReactNode} children - Children elements to be rendered within the not logged in route.
 */
interface NotLoggedInRouteProps {
    children: React.ReactNode;
}

/**
 * NotLoggedInRoute component.
 *
 * This component displays its children elements within a not logged in route, checking for authentication before rendering.
 * If the user is authenticated, it redirects to the home page.
 *
 * @param {NotLoggedInRouteProps} props - Properties for the NotLoggedInRoute component.
 * @returns {JSX.Element} A React element representing the NotLoggedInRoute component.
 */
export const NotLoggedInRoute: React.FC<NotLoggedInRouteProps> = ({children}) => {
    // State to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for authentication when the component mounts
    useEffect(() => {
        const checkAuthentication = async () => {
            // Validate the user's session
            const isLoggedIn = await validateSession();

            if (isLoggedIn) {
                setIsAuthenticated(isLoggedIn);
            }
        };

        checkAuthentication();

    }, []);

    return (
        <>
            {!isAuthenticated ? children : <Navigate to={routes.home.path}/>}
        </>
    );
};
