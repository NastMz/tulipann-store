import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {NavbarMenuMobileCard} from "./NavbarMenuMobileCard";
import {LoginOptions} from "./LoginOptions";
import {Image} from "../../models/interfaces";
import {index} from "typedoc/dist/lib/output/themes/default/partials";
import {routes} from "../../config/routes";
import { Link } from "react-router-dom";

/**
 * Interface for a navigation item in the NavbarMenu component.
 *
 * @interface NavItem
 * @property {Image} img - Image to display for the navigation item.
 * @property {string} title - Title of the navigation item.
 * @property {string} subtitle - Subtitle of the navigation item.
 * @property {string} to - URL to navigate to when the item is clicked.
 */
interface NavItem {
    img: Image;
    title: string;
    subtitle: string;
    to: string;
}

/**
 * Interface for NavbarOption
 *
 * @interface NavOption
 * @property {string} name - Name of the navbar option.
 * @property {Array<NavItem>} options - Array of navbar option items.
 */
interface NavOption {
    name: string;
    options: NavItem[];
}

/**
 * Interface for NavbarMenuMobile component props
 *
 * @interface NavbarMenuMobileProps
 * @property {Array<{ img: Image, to: string, title: string, subtitle: string }>} items - Array of objects representing the items to display in the menu.
 * @property {string} [className] - Optional CSS class name for the menu.
 */
interface NavbarMenuMobileProps {
    items: Array<NavOption>,
    className?: string
}

/**
 * NavbarMenuMobile component.
 *
 * This component displays a mobile-friendly navigation menu with expandable submenus.
 *
 * @param {NavbarMenuMobileProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
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
                                            <Link
                                                className={`min-w-fit cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2`}
                                                to={routes.home.path}
                                            >
                                                Inicio
                                            </Link>
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
                                                            closeMenu={toggleNavMenu}
                                                            key={item.title}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/*Login Menu*/}
                                    <LoginOptions/>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}