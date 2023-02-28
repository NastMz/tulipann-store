import Logo from '../../assets/images/LogoTulipannV2.svg';
import {routes} from "../../config/routes";
import {SidebarCard} from "./SidebarCard";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AiOutlineClose, FaUserCircle, GiHamburgerMenu} from "react-icons/all";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

function getRoutes() {
    let array = [];
    for (const [, value] of Object.entries(routes)) {
        array.push(value);
    }
    return array;
}

const routesArray = getRoutes();

interface SidebarMobileProps {
    className?: string
}

export const SidebarMobile = (props: SidebarMobileProps) => {

    const location = useLocation();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate(routes.login.path);
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={'block lg:hidden'}>
            <div
                className={'cursor-pointer hover:text-gray-200'}
                onClick={() => setIsOpen(true)}
            >
                <GiHamburgerMenu className={'text-4xl'}/>
            </div>
            <div
                className={`fixed inset-0 h-screen  w-full z-20 flex justify-center items-center ${isOpen ? '' : 'pointer-events-none'}`}
            >
                <div
                    className={`fixed inset-0 bg-black h-screen  w-full ${isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                />
                <AnimatePresence>
                    {
                        isOpen && (
                            <motion.div
                                initial={{width: 0}}
                                animate={{width: '85%'}}
                                exit={{width: 0}}
                                className={`h-screen text-black fixed z-10 left-0 top-0 bottom-0 transform origin-left bg-white overflow-hidden text-black pb-12`}
                            >
                                <div className={'w-full px-4 pt-4 pb-3 flex justify-between items-center'}>
                                    <AiOutlineClose
                                        size={25}
                                        className={"cursor-pointer text-gray-400 hover:text-red-500"}
                                        onClick={() => setIsOpen(false)}
                                    />
                                </div>
                                <aside
                                    className={`w-full h-full flex flex-col border-r border-gray-200 ${props.className}`}>
                                    <Link to={routes.home.path} className={'w-full h-fit px-12 mb-4 flex-shrink flex justify-center'}>
                                        <img src={Logo} alt={Logo} className={'h-[60px] object-fill'}/>
                                    </Link>
                                    <div className={'flex-grow px-2 w-full overflow-y-scroll flex flex-col gap-2'}>
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
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}