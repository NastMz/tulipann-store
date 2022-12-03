import Logo from '../assets/images/LogoTulipannV2.svg';
import {routes} from "../routes/routes";
import {SidebarCard} from "./SidebarCard";
import {Link, useLocation} from "react-router-dom";
import {FaUserCircle} from "react-icons/all";

function getRoutes() {
    let array = [];
    for (const [key, value] of Object.entries(routes)) {
        array.push(value);
    }
    console.log(array);
    return array;
}

const routesArray = getRoutes();

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {

    const location = useLocation();

    return (
        <aside className={`w-64 h-full flex flex-col border-r border-gray-200 ${props.className}`}>
            <Link to={routes.home.path} className={'w-full h-fit p-8 flex-shrink'}>
                <img src={Logo} alt={Logo} className={'h-full w-full object-fill'}/>
            </Link>
            <div className={'flex-grow px-2 w-full overflow-y-scroll gap-1'}>
                {
                    routesArray.map((route) => (
                        <SidebarCard to={route.path} icon={route.icon} name={route.name}
                                     isActive={location.pathname === route.path} key={Math.random()}/>
                    ))
                }
            </div>
            <div className={'w-full flex-shrink flex gap-2 items-center p-6 font-medium text-md border-t border-gray-200'}>
                <FaUserCircle className={'text-4xl'}/>
                <div className={'flex flex-col'}>
                    <span>Administrador</span>
                    <span className={"text-gray-400 font-base text-sm"}>Cerrar Sesión</span>
                </div>
            </div>
        </aside>
    )
}