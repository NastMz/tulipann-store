import Logo from '../../assets/images/LogoTulipannV2.svg';
import {routes} from "../../config/routes/routes";
import {SidebarCard} from "./SidebarCard";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaUserCircle} from "react-icons/all";

function getRoutes() {
    let array = [];
    for (const [key, value] of Object.entries(routes)) {
        array.push(value);
    }
    return array;
}

const routesArray = getRoutes();

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {

    const location = useLocation();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate(routes.login.path);
    }

    return (
        <aside className={`w-full h-full flex flex-col border-r border-gray-200 ${props.className}`}>
            <Link to={routes.home.path} className={'w-full h-fit p-8 flex-shrink'}>
                <img src={Logo} alt={Logo} className={'h-full w-full object-fill'}/>
            </Link>
            <div className={'flex-grow px-2 w-full overflow-y-scroll flex flex-col gap-1'}>
                {
                    routesArray.map((route) => {
                        if (route.path !== routes.login.path) {
                            return (
                                <SidebarCard
                                    to={route.path}
                                    icon={route.icon}
                                    name={route.name}
                                    isActive={location.pathname === route.path}
                                    key={Math.random()}
                                />
                            )
                        }
                    })
                }
            </div>
            <div
                className={'w-full flex-shrink flex gap-2 items-center p-6 font-medium text-md border-t border-gray-200'}>
                <FaUserCircle className={'text-4xl'}/>
                <div className={'flex flex-col'}>
                    <span>Administrador</span>
                    <button
                        className={"text-gray-400 font-base text-sm hover:text-gray-500 text-left"}
                        onClick={() => handleLogout()}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </aside>
    )
}