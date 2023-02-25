import {Link} from "react-router-dom";
import {routes} from "../../config/routes";

/**
 * LoginOptions component.
 *
 * This component displays a header with links to the login and registration pages.
 *
 * @returns {ReactNode} The rendered component.
 */
export const LoginOptions = () => {
    return (
        <>
            {/* Desktop layout */}
            <div className="hidden lg:flex gap-2 items-center">
                    <Link to={routes.login.path} className={"hover:text-red-600"}>Iniciar Sesión</Link>
                    <span className={"text-base text-gray-200 font-light"}>|</span>
                    <Link to={routes.register.path} className={"hover:text-red-600"}>Crear Cuenta</Link>
            </div>

            {/* Mobile layout */}
            <div className="flex flex-col gap-4 items-center text-xl pt-4 border-t border-gray-200 px-8 lg:hidden">
                <div className="text-left w-full">
                    <Link to={routes.login.path} className="hover:text-red-600">
                        Iniciar sesión
                    </Link>
                </div>
                <div className="text-left w-full">
                    <Link to={routes.register.path} className="hover:text-red-600">
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </>
    );
};

