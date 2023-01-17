import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {NavbarMenu} from "./NavbarMenu";
import Logo from "../../assets/images/LogoTulipannV2.svg";
import {navbarOptions} from "../../config/options";
import {routes} from "../../config/routes";
import {ShoppingCart} from "./ShoppingCart";
import {SearchBar} from "./SearchBar";
import {AnimatePresence, motion} from "framer-motion";
import {NavbarMenuMobile} from "./NavbarMenuMobile";
import {LoginOptions} from "./LoginOptions";
import {index} from "typedoc/dist/lib/output/themes/default/partials";

/**
 * Navbar component.
 *
 * This component displays the main navigation bar for the website.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Navbar = () => {
    // Refs used to control the navbar interaction
    const navbarRef = useRef<any>(null);
    const navbarMenuRef = useRef<any>(null);

    // State for show or hide the nav menu
    const [isShowingNavMenu, setIsShowingNavMenu] = useState<boolean>(false);

    // State for know the actual selected nav option
    const [navOption, setNavOption] = useState<number>(-1);

    // State for control if the navbar is fixed to top screen
    const [isSticky, setIsSticky] = useState<boolean>(false);

    // Event listener to set fixed position to navbar
    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function used for reset the state when close the menu
    const resetNavMenuState = () => {
        setIsShowingNavMenu(false);
        setTimeout(() => {
            setNavOption(-1);
        }, 350);
    };

    // Function used to show the nav menu when an option is clicked
    const toggleNavMenu = (index: number) => {
        if (isShowingNavMenu && navOption === index) {
            resetNavMenuState();
        } else {
            setNavOption(index);
            setIsShowingNavMenu(true);
        }
    };

    // Function used to show or hide the navbar menu the user click outside
    const hideMenu = (e: MouseEvent) => {
        if (
            navbarMenuRef.current &&
            !navbarMenuRef.current.contains(e.target) &&
            navbarRef.current &&
            !navbarRef.current.contains(e.target)
        ) {
            resetNavMenuState();
        }
    };

    // Function used to close the navbar menu when the user click one of the options
    const closeMenu = () => {
        resetNavMenuState();
    }

    // Add or remove the event listener to hide the navbar menu when the user click outside
    useEffect(() => {
        if (isShowingNavMenu) {
            document.addEventListener("mousedown", hideMenu);
        } else {
            document.removeEventListener("mousedown", hideMenu);
        }
    }, [isShowingNavMenu]);


    return (
        <nav
            className={`${isSticky ? 'fixed shadow-md' : 'relative border-b border-gray-100'} top-0 left-0 right-0 bg-white bg-opacity-90 z-40`}>

            <div className={'hidden lg:block'}>
                {/*Navbar*/}
                <div
                    className={"flex justify-between items-center h-16 px-5 font-medium text-sm"}
                >
                    <div className={"flex gap-8 items-center"}>

                        {/*LOGO*/}
                        <Link to={routes.home.path} className={"w-44"}>
                            <img src={Logo} alt={Logo} className={`h-full w-full object-cover`}/>
                        </Link>

                        {/*Navbar options*/}
                        <div className={""} ref={navbarRef}>
                            <div className={"flex lg:gap-8 md:gap-2 justify-center items-center"}>
                                <Link
                                    className={`min-w-fit cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2`}
                                    to={routes.home.path}
                                >
                                    Inicio
                                </Link>
                                {navbarOptions.map((item: any, index: number) => (
                                    <div
                                        className={`cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2 ${navOption === index ? 'text-red-600 border-b-2 border-red-600' : ''}`}
                                        onClick={() => toggleNavMenu(index)}
                                        key={index}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className={"flex lg:gap-12 md:gap-6 items-center"}>

                        {/*Login Menu*/}
                        <LoginOptions/>

                        <div className={"flex gap-6 items-center text-gray-500 h-full"}>

                            <SearchBar/>

                            <ShoppingCart/>

                        </div>
                    </div>
                </div>

                {/*Navbar Menu*/}
                <AnimatePresence>
                    {
                        isShowingNavMenu && (
                            <motion.div
                                initial={{height: 0}}
                                animate={{height: 'fit-content',}}
                                exit={{height: 0}}
                                className={`bg-white absolute w-full overflow-hidden shadow-xl z-10`}
                                ref={navbarMenuRef}
                            >
                                <AnimatePresence mode={'wait'}>
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        key={navOption}
                                    >
                                        <NavbarMenu
                                            items={navOption > -1 ? navbarOptions[navOption].options : []}
                                            className={"top-0 left-0 border-t border-gray-100"}
                                            closeMenu={closeMenu}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>

            {/*Navbar Mobile*/}
            <div className={'block lg:hidden'}>
                <div
                    className={"relative flex justify-between items-center h-16 px-5 font-medium text-sm"}
                >
                    <div className={"flex justify-between items-center gap-3 h-full"}>
                        <NavbarMenuMobile
                            items={navbarOptions}
                        />
                    </div>
                    {/*LOGO*/}
                    <Link to={routes.home.path} className={"h-full w-full flex items-center justify-center"}>
                        <img src={Logo} alt={Logo} className={`h-8 object-cover`}/>
                    </Link>
                    <div className={"flex justify-between items-center gap-3 h-full"}>
                        <SearchBar/>
                        <ShoppingCart/>
                    </div>
                </div>
            </div>
        </nav>
    )
}
