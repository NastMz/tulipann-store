import {motion} from "framer-motion"
import {Link, Navigate, useLocation} from "react-router-dom";
import {routes} from "../routes/routes";
import {OrderSummaryCard} from "../components";
import {BsArrowRightShort, FaCcVisa} from "react-icons/all";
import {useEffect} from "react";

export const OrderSummary = () => {

    const location = useLocation();

    const {order, info} = location.state;

    useEffect(() => {
        window.history.replaceState({}, document.title)
    }, []);

    if (location.state === null) {
        return (
            <Navigate to={routes.catalog.path}/>
        )
    } else {
        return (
            <motion.div
                initial={{width: 0}}
                animate={{width: '100%'}}
                exit={{width: 0, transition: {duration: 0.3}}}
                className={"min-h-screen h-fit flex overflow-hidden w-full"}
            >
                <div className={"flex-grow w-1/3 bg-gradient-to-b from-red-500 to-red-700"}/>
                <div className={"w-2/3 px-16 py-8"}>
                    <div className={"mb-8 flex flex-col"}>
                        <span className={"text-sm font-medium text-red-500"}>Pago exitoso</span>
                        <h2 className={"text-5xl font-bold"}>Gracias por ordenar</h2>
                        <p className={"mt-3"}>Agradecemos su pedido, actualmente lo estamos procesando. Asi que porfavor
                            espera, ¡te envíaremos la confirmación muy pronto!</p>
                    </div>
                    <div className={""}>
                        <div className={"text-sm font-medium flex flex-col gap-1 mb-4"}>
                            <span>Número de orden</span>
                            <span className={"text-sm font-medium text-red-500"}>00000000000</span>
                        </div>
                        <div
                            className={"grid px-4 w-full divide-y divide-solid divide-gray-200 h-4/5 overflow-y-scroll border-t border-b border-gray-200 max-h-96"}>
                            {
                                order.products.map((product: any) => (
                                    <OrderSummaryCard
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.images[0]}
                                        count={product.count}
                                        key={Math.random()}
                                        className={"h-24"}
                                    />
                                ))
                            }
                        </div>
                        <div className={"h-full text-sm flex flex-col gap-2 divide-y divide-solid divide-gray-200"}>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"flex justify-between font-medium pt-2"}>
                                    <span className={"text-gray-500"}>Subtotal</span>
                                    <span className={""}>${order.subtotal}</span>
                                </div>
                                <div className={"flex justify-between font-medium"}>
                                    <span className={"text-gray-500"}>Impuestos</span>
                                    <span className={""}>${order.taxes}</span>
                                </div>
                                <div className={"flex justify-between font-medium"}>
                                    <span className={"text-gray-500"}>Envio</span>
                                    <span className={""}>${order.shipping}</span>
                                </div>
                            </div>
                            <div className={"flex justify-between py-2 font-medium text-base"}>
                                <span className={""}>Total</span>
                                <span className={""}>${order.total}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-between items-center text-sm py-8"}>
                        <div className={"flex flex-col gap-2"}>
                            <span className={"font-medium"}>Dirección de entrega</span>
                            <div className={"text-gray-400 flex flex-col"}>
                                <span>Jhon Doe</span>
                                <span>Av. Siempre Viva 123</span>
                                <span>Springfield</span>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <span className={"font-medium"}>Información de pago</span>
                            <div className={"flex gap-2"}>
                                <FaCcVisa size={20}/>
                                <div className={"flex flex-col"}>
                                    <span>********4242</span>
                                    <span className={"text-gray-400"}>Expira 12/21</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={`${routes.catalog.path}`}
                          className={"font-medium text-sm text-red-600 flex justify-end items-center"}>
                        <span>Continuar comprando</span> <BsArrowRightShort size={20}/>
                    </Link>
                </div>
            </motion.div>
        )
    }
}