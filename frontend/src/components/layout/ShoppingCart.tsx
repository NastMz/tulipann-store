import {useEffect, useRef, useState} from "react";
import {store} from "../../redux/store";
import {ShoppingCartCard} from "./ShoppingCartCard";
import {decreaseCount, increaseCount, removeFromCart} from "../../redux/actions";
import {BiShoppingBag} from "react-icons/bi";
import {AnimatePresence, motion} from "framer-motion";
import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import {ShoppingCartMobile} from "./ShoppingCartMobile";

/**
 * Interface for the ShoppingCart component props.
 *
 * @interface ShoppingCartProps
 * @property {string} [className] - Class name(s) to apply to the root element.
 */
interface ShoppingCartProps {
    className?: string
}

/**
 * ShoppingCart component.
 *
 * This component displays a shopping cart icon with a counter and a dropdown menu with the list of items in the cart.
 *
 * @param {ShoppingCartProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ShoppingCart = (props: ShoppingCartProps) => {
    // Ref for cart
    const cartRef = useRef<any>(null);
    const cartMobileRef = useRef<any>(null);
    const cartBtnRef = useRef<any>(null);

    // State for show or hide the cart
    const [isShowingCart, setIsShowingCart] = useState<boolean>(false);
    // State for count the cart products
    const [productsCartCount, setProductsCartCount] = useState<number>(0);

    // SHOPPING CART

    // Hide cart on click in other component
    const hideCart = (e: MouseEvent) => {
        if (
            cartMobileRef.current &&
            !cartMobileRef.current.contains(e.target) &&
            cartRef.current &&
            !cartRef.current.contains(e.target) &&
            cartBtnRef.current &&
            !cartBtnRef.current.contains(e.target)
        ) {
            setIsShowingCart(false);
        }
    };

    // Activate or deactivate hide cart event listener
    useEffect(() => {
        if (isShowingCart) {
            document.addEventListener("mousedown", hideCart);
        } else {
            document.removeEventListener("mousedown", hideCart);
        }
    }, [isShowingCart]);

    // Toggle cart visible status
    const toggleCart = () => {
        setIsShowingCart(!isShowingCart);
    };

    // Cart Products Logic

    const [cart, setCart] = useState<Array<any>>([]);
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        setCart(store.getState().cart.list);
        setSubtotal(store.getState().cart.subtotal);
    }, [store.getState().cart.list, store.getState().cart.subtotal]);

    const increaseProductCount = (id: string) => {
        store.dispatch(increaseCount(id));
    };

    const decreaseProductCount = (id: string) => {
        store.dispatch(decreaseCount(id));
    };

    const removeProduct = (id: string) => {
        store.dispatch(removeFromCart(id));
    };

    useEffect(() => {
        setProductsCartCount(cart.length);
    }, [cart]);

    store.subscribe(() => {
        setCart(store.getState().cart.list);
        setSubtotal(store.getState().cart.subtotal);
    });

    return (
        <div className={"flex items-center lg:block relative h-full"}>
            {/*Shopping Cart BTN*/}
            <div
                className={"flex gap-1 lg:gap-2 items-center justify-center cursor-pointer hover:text-red-600"}
                onClick={() => toggleCart()}
                ref={cartBtnRef}
            >
                <BiShoppingBag className={'text-2xl lg:text-xl'}/>
                <span className={"text-lg lg:text-xl text-black"}>{productsCartCount}</span>
            </div>

            {/*Shopping Cart*/}
            <div
                ref={cartRef}
                className={"hidden lg:block"}
            >
                <AnimatePresence>
                    {
                        isShowingCart && (
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                                className={`text-black absolute z-10 right-0 top-11 overflow-y-hidden transform origin-top-right border bg-white border-gray-200 rounded-xl shadow-xl`}
                            >
                                <div className={`px-2 w-96 h-fi t${props.className}`}>
                                    <h4 className="px-5 py-3 font-medium text-lg">Bolsa</h4>
                                    <div
                                        className={`px-5 h-80 overflow-y-auto`}
                                    >
                                        {
                                            cart.length > 0
                                                ? <div className={"flex flex-col divide-y divide-solid divide-gray-200"}>
                                                    {
                                                        cart.map((product) => (
                                                            <ShoppingCartCard
                                                                id={product.id}
                                                                name={product.name}
                                                                price={product.price}
                                                                image={product.images[0]}
                                                                count={product.count}
                                                                increaseFunction={increaseProductCount}
                                                                decreaseFunction={decreaseProductCount}
                                                                removeProductFromCart={removeProduct}
                                                                key={product.id}
                                                                className={``}
                                                            />
                                                        ))
                                                    }
                                                </div>

                                                :
                                                <div
                                                    className={"flex flex-col items-center justify-center gap-6 text-gray-200 h-full"}>
                                                    <BiShoppingBag size={80}/>
                                                    <span className={"text-xl"}>No hay productos en la bolsa</span>
                                                </div>
                                        }
                                    </div>
                                    <div className={"flex justify-between px-4 pt-4 font-medium text-lg"}>
                                        <span className={""}>Total</span>
                                        <span className={""}>${subtotal}</span>
                                    </div>
                                    <div
                                        className={"w-full h-fit my-4 flex justify-center"}
                                    >
                                        <Link
                                            to={routes.checkout.path}
                                            className={`mx-auto w-fit bg-red-500 text-white px-10 py-2 rounded-md hover:bg-red-400 font-medium ${cart.length > 0
                                                ? '' : 'pointer-events-none bg-gray-300'}`}
                                            onClick={() => toggleCart()}
                                        >
                                            Ir a Pagar
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>

            {/*Mobile Shopping Cart*/}
            <div
                ref={cartMobileRef}
                className={'block lg:hidden h-screen'}
            >
                <ShoppingCartMobile
                    isShowingCart={isShowingCart}
                    toggleCart={toggleCart}
                    subtotal={subtotal}
                    cart={cart}
                    increaseProductCount={increaseProductCount}
                    decreaseProductCount={decreaseProductCount}
                    removeProduct={removeProduct}
                />
            </div>
        </div>
    )
}