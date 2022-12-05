import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import {AiOutlineClose, GiHamburgerMenu} from "react-icons/all";
import {NavbarMenuMobileCard} from "./NavbarMenuMobileCard";
import {Link} from "react-router-dom";

interface NavbarMenuMobileProps {
    items: Array<any>,
    className?: string
}

export const NavbarMenuMobile = (props: NavbarMenuMobileProps) => {

    // State for show or hide the nav menu
    const [isShowingNavMenu, setIsShowingNavMenu] = useState<boolean>(false);

    // State for know the actual selected nav option
    const [navOption, setNavOption] = useState<number>(0);

    // Toggle nav menu visible status
    const toggleNavMenu = () => {
        setIsShowingNavMenu(!isShowingNavMenu);
    };

    return (
        <div className={"flex items-center relative h-full "}>
            {/*Nav menu BTN*/}
            <div
                className={"flex gap-1 lg:gap-2 items-center justify-center cursor-pointer hover:text-red-600"}
                onClick={() => toggleNavMenu()}
            >
                <GiHamburgerMenu className={'text-2xl lg:text-xl'}/>
            </div>

            {/*Nav menu*/}
            <div
                className={`fixed inset-0 h-screen  w-full z-20 flex justify-center items-center ${isShowingNavMenu ? '' : 'pointer-events-none'}`}
            >
                <div
                    className={`fixed inset-0 bg-black h-screen  w-full ${isShowingNavMenu ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
                    onClick={() => toggleNavMenu()}
                />
                <AnimatePresence>
                    {
                        isShowingNavMenu && (
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
                                        onClick={() => toggleNavMenu()}
                                    />
                                </div>
                                <div className={'h-full overflow-y-scroll pb-12'}>
                                    {/*Nav menu options*/}
                                    <div className={'px-8'}>
                                    <div className={"w-full flex lg:gap-8 gap-2 items-center pb-1 overflow-x-auto"}>
                                        {props.items.map((item: any, index: number) => (
                                            <div
                                                className={`min-w-fit cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2 ${navOption === index ? 'text-red-600 border-b-2 border-red-600' : ''}`}
                                                onClick={() => setNavOption(index)}
                                                key={item.name}
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                    </div>

                                    {/*Nav menu*/}
                                    <AnimatePresence mode={'wait'}>
                                        <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 0.2}}
                                            key={navOption}
                                        >
                                            <div className={'grid md:grid-cols-2 gap-6 py-8 overflow-hidden px-6'}>
                                                {
                                                    props.items[navOption].options.map((item: any) => (
                                                        <NavbarMenuMobileCard
                                                            img={item.img}
                                                            title={item.title}
                                                            subtitle={item.subtitle}
                                                            to={item.to}
                                                            className={`h-64`}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/*Login Menu*/}
                                    <div className={"flex flex-col gap-4 items-center text-xl pt-4 border-t border-gray-200 px-8"}>
                                        <div className={"text-left w-full"}>
                                            <Link to={"/login"} className={"hover:text-red-600"}>Iniciar sesión</Link>
                                        </div>
                                        <div className={"text-left w-full"}>
                                            <Link to={"/register"} className={"hover:text-red-600"}>Crear cuenta</Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>

        </div>
    )
}