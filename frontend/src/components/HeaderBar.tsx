import {Link} from "react-router-dom";

export const HeaderBar = () => {
    return (
        <header className="bg-slate-800 flex justify-end items-center text-sm py-1 px-5">
            <ul className={"flex gap-4 text-white"}>
                <Link to={"/singup"}>Iniciar Sesión</Link>
                <Link to={"/singin"}>Crear Cuenta</Link>
            </ul>
        </header>
    )
}
