import {CheckoutForm, CheckoutResume} from "../components";
import {routes} from "../routes/routes";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {cleanCart} from "../redux/actions";

interface Order {
    products: Array<any>,
    subtotal: number,
    shipping: number,
    taxes: number,
    total: number
}

interface OrderInformation {
    contact: any,
    payment: any,
    address: any
}

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
            dispatch(cleanCart());
            navigate(routes.order.path, {state: {order: order, info: orderInfo}});
        }
    }, [isOrdered]);

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
            className={"h-screen grid grid-cols-2 gap-24 px-16 py-8 mb-12 overflow-hidden"}
        >
            <CheckoutResume
                setOrder={setOrder}
            />
            <CheckoutForm
                setInfo={setOrderInfo} sendOrder={setIsOrdered}
            />
        </motion.div>
    )
}