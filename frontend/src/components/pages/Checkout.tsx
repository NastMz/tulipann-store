import {CheckoutForm, CheckoutResume} from "../ui";
import {routes} from "../../config/routes";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {emptyCart} from "../../redux/actions";
import {store} from "../../redux/store";

/**
 * Interface for Order object.
 *
 * @interface Order
 * @property {Array<any>} products - List of products in the order.
 * @property {number} subtotal - Subtotal for the order.
 * @property {number} shipping - Shipping cost for the order.
 * @property {number} taxes - Tax amount for the order.
 * @property {number} total - Total cost for the order.
 */
interface Order {
    products: Array<any>,
    subtotal: number,
    shipping: number,
    taxes: number,
    total: number
}

/**
 * Interface for Order object.
 *
 * @interface Order
 * @property {Array<any>} products - List of products in the order.
 * @property {number} subtotal - Subtotal for the order.
 * @property {number} shipping - Shipping cost for the order.
 * @property {number} taxes - Tax amount for the order.
 * @property {number} total - Total cost for the order.
 */
interface OrderInformation {
    contact: any,
    payment: any,
    address: any
}

/**
 * Checkout component.
 *
 * This component displays the checkout form and summary for placing an order.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order>({
        products: [],
        subtotal: 0,
        shipping: 0,
        taxes: 0,
        total: 0
    });

    const [orderInfo, setOrderInfo] = useState<OrderInformation>({
        contact: undefined,
        payment: undefined,
        address: undefined
    });

    const [isOrdered, setIsOrdered] = useState<boolean>(false);

    useEffect(() => {
        if (isOrdered) {
            dispatch(emptyCart());
            navigate(routes.order.path, { state: { order, info: orderInfo } });
        }
    }, [isOrdered]);

    if (store.getState().cart.list.length > 0) {
        return (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: window.innerWidth }}
                className="h-fit lg:h-screen w-full max-w-full grid lg:grid-cols-2 gap-8 lg:gap-24 px-4 lg:px-16 py-8 lg:mb-12 overflow-hidden"
            >
                <CheckoutResume setOrder={setOrder} />
                <CheckoutForm setInfo={setOrderInfo} sendOrder={setIsOrdered} />
            </motion.div>
        );
    }
    return <Navigate to={routes.catalog.path} />;
};