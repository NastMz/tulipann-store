import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/selector";
import {logout} from "../../api/client";
import {resetUser} from "../../redux/actions";
import {MdKeyboardArrowDown} from "react-icons/md";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {BiLogOut, BiUserCircle, BsTruck, IoSettingsOutline} from "react-icons/all";

/**
 * LoggedInMenu component.
 *
 * This component displays a header with links to the user profile and logout.
 *
 * @returns {ReactNode} The rendered component.
 */
export const LoggedInMenu = () => {

    const dispatch = useDispatch();

    // Ref for menu
    const menuRef = useRef<any>(null);
    const menuBtnRef = useRef<any>(null);

    // Get the user from Redux store
    const user = useSelector(selectUser);

    // Show the user menu
    const [isShowingProfileMenu, setIsShowingProfileMenu] = useState(false);

    // Hide menu on click in other component
    const hideMenu = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target) &&
            menuBtnRef.current &&
            !menuBtnRef.current.contains(e.target)
        ) {
            setIsShowingProfileMenu(false);
        }
    };

    // Activate or deactivate hide cart event listener
    useEffect(() => {
        if (isShowingProfileMenu) {
            document.addEventListener("mousedown", hideMenu);
        } else {
            document.removeEventListener("mousedown", hideMenu);
        }
    }, [isShowingProfileMenu]);

    // Handle logout
    const closeSession = () => {
        dispatch(resetUser);
        logout();
    }

    return (
        <>
            {/* Desktop layout */}
            <div className="hidden lg:flex gap-2 items-center relative h-full"
            >
                <div
                    className={`hover:text-red-500 flex gap-1 items-center justify-center h-full cursor-pointer ${isShowingProfileMenu ? 'text-red-500' : ''}`}
                    onClick={() => setIsShowingProfileMenu(!isShowingProfileMenu)}
                    ref={menuBtnRef}
                >
                    <BiUserCircle className={'text-xl'}/>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                    <motion.div
                        animate={{ rotate: isShowingProfileMenu ? 180 : 0 }}
                        exit={{ rotate: isShowingProfileMenu ? 0 : 180 }}
                    >
                    <MdKeyboardArrowDown className={'text-xl'}/>
                    </motion.div>
                </div>
                <AnimatePresence>
                    {
                        isShowingProfileMenu && (
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                                ref={menuRef}
                                className={`text-gray-500 absolute h-fit z-10 right-0 top-11 overflow-hidden w-48 py-4 px-6 border bg-white border-gray-200 rounded-md shadow-2xl transform origin-top`}
                            >
                                <ul className={"flex flex-col divide-y divide-solid"}>
                                    <li className={'hover:text-red-500 py-2'}><Link to={routes.profile.path} className={'flex gap-1 items-center justify-center'}><IoSettingsOutline className={'text-xl'}/> <span>Mi perfil</span></Link></li>
                                    <li className={'hover:text-red-500 py-2'}><Link to={routes.orderHistory.path} className={'flex gap-1 items-center justify-center'}><BsTruck className={'text-xl'}/> <span>Mis ordenes</span></Link></li>
                                    <li className={'hover:text-red-500 cursor-pointer flex gap-1 items-center py-2 justify-center'} onClick={() => closeSession()}><BiLogOut className={'text-xl'}/> <span>Cerrar sesión</span></li>
                                </ul>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>

            {/* Mobile layout */}
            <div className="flex flex-col gap-4 items-center text-xl pt-4 border-t border-gray-200 px-8 lg:hidden">
                <ul className={"flex flex-col items-start gap-4 w-full"}>
                    <li className={'hover:text-red-500'}><Link to={routes.profile.path} className={'flex gap-1 items-center justify-center'}><IoSettingsOutline className={'text-xl'}/> <span>Mi perfil</span></Link></li>
                    <li className={'hover:text-red-500'}><Link to={routes.orderHistory.path} className={'flex gap-1 items-center justify-center'}><BsTruck className={'text-xl'}/> <span>Mis ordenes</span></Link></li>
                    <li className={'hover:text-red-500 cursor-pointer flex gap-1 items-center justify-center'} onClick={() => closeSession()}><BiLogOut className={'text-xl'}/> <span>Cerrar sesión</span></li>
                </ul>
            </div>
        </>
    );
};

