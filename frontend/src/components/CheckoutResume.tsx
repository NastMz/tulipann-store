import {useEffect, useState} from "react";
import {store} from "../redux/store";
import {useDispatch} from "react-redux";
import {decreaseProductCartCount, increaseProductCartCount, removeProductFromCart} from "../redux/actions";
import {ShoppingCartCard} from "./ShoppingCartCard";
import {Navigate} from "react-router-dom";
import {routes} from "../routes/routes";

interface CheckoutResumeProps {
    setOrder: Function,
    className?: string
}

export const CheckoutResume = (props: CheckoutResumeProps) => {

    const dispatch = useDispatch();

    const [order, setOrder] = useState<Array<any>>([]);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [taxes, setTaxes] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setOrder(store.getState().cart.list);
        setSubtotal(store.getState().cart.subtotal);
    }, []);

    const increaseProduct = (id: number) => {
        dispatch(increaseProductCartCount(id));
    }

    const decreaseProduct = (id: number) => {
        dispatch(decreaseProductCartCount(id));
    }

    const remove = (id: number) => {
        dispatch(removeProductFromCart(id));
    }

    store.subscribe(() => {
        setOrder(store.getState().cart.list);
        setSubtotal(store.getState().cart.subtotal);
    });

    useEffect(() => {
        setShipping(Math.round(subtotal * 0.05));
        setTaxes(Math.round(subtotal * 0.19));
    }, [subtotal]);

    useEffect(() => {
        setTotal(subtotal + taxes + shipping);
    }, [taxes]);

    useEffect(() => {
        props.setOrder({
            products: order,
            subtotal: subtotal,
            shipping: shipping,
            taxes: taxes,
            total: total
        });
    }, [total]);

    if (store.getState().cart.list.length > 0) {
        return (
            <div className={`h-full w-full flex gap-4 flex-col ${props.className}`}>
                <div
                    className={`h-96 overflow-y-scroll`}
                >
                    <div className={"grid px-4 w-full divide-y divide-solid divide-gray-200"}>
                        {
                            order.map((product) => (
                                <ShoppingCartCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.images[0]}
                                    count={product.count}
                                    increaseFunction={increaseProduct}
                                    decreaseFunction={decreaseProduct}
                                    removeProductFromCart={remove}
                                    key={product.id}
                                    className={`h-24`}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className={"flex-shrink text-sm flex flex-col gap-2 divide-y divide-solid divide-gray-200"}>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex justify-between px-4 font-medium"}>
                            <span className={"text-gray-500"}>Subtotal</span>
                            <span className={""}>${subtotal}</span>
                        </div>
                        <div className={"flex justify-between px-4 font-medium"}>
                            <span className={"text-gray-500"}>Impuestos</span>
                            <span className={""}>${taxes}</span>
                        </div>
                        <div className={"flex justify-between px-4 font-medium"}>
                            <span className={"text-gray-500"}>Envio</span>
                            <span className={""}>${shipping}</span>
                        </div>
                    </div>
                    <div className={"flex justify-between px-4 py-2 font-medium"}>
                        <span className={""}>Total</span>
                        <span className={""}>${total}</span>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Navigate to={routes.catalog.path}/>
        );
    }
}