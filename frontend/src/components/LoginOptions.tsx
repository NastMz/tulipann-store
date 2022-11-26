import {Link} from "react-router-dom";
import {routes} from "../routes/routes";

export const LoginOptions = () => {
    return (
        <header className="bg-slate-800 flex justify-end items-center text-sm py-1 px-5">
            <ul className={"flex gap-4 text-white"}>
                <Link to={routes.login.path}>Iniciar Sesión</Link>
                <Link to={routes.register.path}>Crear Cuenta</Link>
            </ul>
        </header>
    )
}
