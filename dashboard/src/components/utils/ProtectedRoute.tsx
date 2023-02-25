import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Modal} from "../common";
import {validateSession} from "../../api/client";

/**
 * Interface for ProtectedRoute component props
 *
 * @interface ProtectedRouteProps
 * @property {React.ReactNode} children - Children elements to be rendered within the protected route.
 */
interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute component.
 *
 * This component displays its children elements within a protected route, checking for authentication before rendering.
 * If the user is not authenticated, it displays a login modal.
 *
 * @param {ProtectedRouteProps} props - Properties for the ProtectedRoute component.
 * @returns {JSX.Element} A React element representing the ProtectedRoute component.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    // State to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // State to track whether the login modal is open
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState<'error' | 'warning' | 'info' | 'success'>('error');

    // Check for authentication when the component mounts
    useEffect(() => {
        const checkAuthentication = async () => {
            // Validate the user's session
            const isLoggedIn = await validateSession();

            if (isLoggedIn) {
                setIsAuthenticated(isLoggedIn);
            } else {
                setErrorMessage('Debes iniciar sesión para poder acceder a esta página');
                setType('error');
                setIsModalOpen(true);
            }
        };

        checkAuthentication();

    }, []);

    const navigate = useNavigate();

    const handleErrorMessage = () => {
        setErrorMessage('');
        navigate('/login');
    };

    const handleCancelClick = () => {
        setErrorMessage('');
        navigate(-1);
    };

    return (
        <>
            {isModalOpen && (
                <Modal
                    title="Error"
                    message={errorMessage || 'Mensaje normal'}
                    buttonText="Iniciar Sesión"
                    isOpen={!!errorMessage}
                    onClose={() => handleCancelClick()}
                    onButtonClick={() => handleErrorMessage()}
                    type={type}
                />
            )}
            {isAuthenticated && children}
        </>
    );
};
