import {BiSearch} from "react-icons/all";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import hero from "../assets/images/hero.jpg";
import {NavbarMenu} from "./NavbarMenu";
import Logo from "../assets/images/LogoTulipannV2.svg";
import {routes} from "../routes/routes";
import {ShoppingCart} from "./ShoppingCart";

export const Navbar = () => {

    // Options of the navbar
    const data = [
        [
            {
                img: hero,
                title: "lorem",
                to: "#"
            },
            {
                img: hero,
                title: "lorem",
                to: "#"
            },
            {
                img: hero,
                title: "lorem",
                to: "#"
            },
            {
                img: hero,
                title: "lorem",
                to: "#"
            },
        ],
        [
            {
                img: hero,
                title: "ipsum",
                to: "#"
            },
            {
                img: hero,
                title: "ipsum",
                to: "#"
            },
            {
                img: hero,
                title: "ipsum",
                to: "#"
            },
            {
                img: hero,
                title: "ipsum",
                to: "#"
            },
        ],
        [
            {
                img: hero,
                title: "dolor",
                to: "#"
            },
            {
                img: hero,
                title: "dolor",
                to: "#"
            },
            {
                img: hero,
                title: "dolor",
                to: "#"
            },
            {
                img: hero,
                title: "dolor",
                to: "#"
            },
        ],
        [
            {
                img: hero,
                title: "sit",
                to: "#"
            },
            {
                img: hero,
                title: "sit",
                to: "#"
            },
            {
                img: hero,
                title: "sit",
                to: "#"
            },
            {
                img: hero,
                title: "sit",
                to: "#"
            },
        ]
    ];

    // Refs used to control the navbar interaction
    const navbarRef = useRef<any>(null);
    const navbarMenuRef = useRef<any>(null);

    // State for show or hide the nav menu
    const [isShowingNavMenu, setIsShowingNavMenu] = useState<boolean>(false);

    // State for know the actual selected nav option
    const [navOption, setNavOption] = useState<number>(-1);

    // State for control if the navbar is fixed to top screen
    const [isSticky, setIsSticky] = useState<boolean>(false);

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
        if (navbarMenuRef.current && !navbarMenuRef.current.contains(e.target) && navbarRef.current && !navbarRef.current.contains(e.target)) {
            resetNavMenuState();
        }
    }

    // Add or remove the event listener to hide the navbar menu when the user click outside
    useEffect(() => {
        if (isShowingNavMenu) {
            document.addEventListener('mousedown', hideMenu);
        } else {
            document.removeEventListener('mousedown', hideMenu);
        }
    }, [isShowingNavMenu]);


    // Event listener to set fixed position to navbar
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    });


    return (
        <nav
            className={`${isSticky ? 'fixed shadow-md' : 'relative border-b border-gray-100'} top-0 left-0 right-0 bg-white bg-opacity-90 z-50`}>

            {/*Navbar*/}
            <div
                className={"flex justify-between items-center h-16 px-5 font-medium text-sm"}>
                <div className={"flex gap-8 items-center"}>

                    {/*LOGO*/}
                    <Link to={routes.home.path} className={"w-44"}>
                        <img src={Logo} alt={Logo} className={"h-full w-full object-fill"}/>
                    </Link>

                    {/*Navbar options*/}
                    <div className={""} ref={navbarRef}>
                        <ul className={"flex lg:gap-8 md:gap-2 justify-center items-center"}>
                            {data.map((item: any, index: number) => (
                                <div
                                    className={`cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2 ${navOption === index ? 'text-red-600 border-b-2 border-red-600' : ''}`}
                                    onClick={() => toggleNavMenu(index)}
                                    key={Math.random()}
                                >
                                    Opcion
                                </div>
                            ))}
                        </ul>
                    </div>

                </div>
                <div>
                    <div className={"flex lg:gap-12 md:gap-6 items-center"}>

                        {/*Login Menu*/}
                        <div className={"flex gap-2 items-center"}>
                            <div className={""}>
                                <Link to={"/login"} className={"hover:text-red-600"}>Iniciar sesión</Link>
                            </div>
                            <span className={"text-base text-gray-200 font-light"}>|</span>
                            <div className={""}>
                                <Link to={"/register"} className={"hover:text-red-600"}>Crear cuenta</Link>
                            </div>
                        </div>

                        <div className={"flex gap-6 items-center text-gray-500 h-full"}>

                            {/*Search Btn*/}
                            <div className={"cursor-pointer hover:text-red-600"}>
                                <BiSearch size={25}/>
                            </div>

                            <ShoppingCart/>

                        </div>
                    </div>
                </div>
            </div>

            {/*Navbar Menu*/}
            <div
                className={`bg-white absolute w-full transition-all ease-in-out ${isShowingNavMenu ? "h-80" : "h-0"} duration-300 overflow-hidden shadow-xl z-10`}
                ref={navbarMenuRef}
            >
                <NavbarMenu
                    items={navOption > -1 ? data[navOption] : []}
                    className={"top-0 left-0 border-t border-gray-100"}
                />
            </div>
        </nav>
    )
}
