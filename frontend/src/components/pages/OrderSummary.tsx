import {motion} from "framer-motion"
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import {routes} from "../../config/routes";
import {OrderSummaryCard} from "../ui";
import {BsArrowRightShort, BsFillCreditCard2FrontFill} from "react-icons/bs";
import {selectDepartments, selectOrders, selectProducts} from "../../redux/selector";
import {useSelector} from "react-redux";
import {getAmount} from "../../utils/orderUtils";
import {LoaderModal} from "../common";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

let isLoading = true;

/**
 * OrderSummary component.
 *
 * This component displays an order summary after a successful payment.
 *
 * @returns {ReactNode} The rendered component.
 */
export const OrderSummary = () => {

    const queryClient = useQueryClient();

    queryClient.invalidateQueries(['apiOrders']).then(() => {
        isLoading = false;
    });

    const {orderId} = useParams();

    const location = useLocation();

    const orders = useSelector(selectOrders);
    const order = orders.filter((order) => order.id === orderId)[0];

    if (isLoading) {
        return (
            <LoaderModal isOpen={isLoading}/>
        )
    } else if (orderId === undefined || order === undefined || order.details === undefined) {
        return (
            <Navigate to={routes.catalog.path}/>
        )
    } else {

        const productsFromStore = useSelector(selectProducts);

        let products = productsFromStore.filter((product) => order.products.some((orderProduct) => orderProduct.productId === product.id));

        products = products.map((product) => {
            return {
                ...product,
                count: order.products.filter((orderProduct) => orderProduct.productId === product.id)[0].quantity
            }
        });

        const departments = useSelector(selectDepartments);
        const department = departments.filter((department) => department.id === order.shippingAddress.departmentId)[0].name;

        return (
            <motion.div
                initial={{width: 0}}
                animate={{width: '100%'}}
                exit={{width: 0}}
                className={"min-h-screen h-fit overflow-hidden w-full grid grid-cols-1 md:grid-cols-4"}
            >
                <div className={'bg-gradient-to-bl from-red-500 to-red-800 h-16 md:h-full w-full'}/>
                <div className={"px-6 lg:px-16 py-8 col-span-3"}>
                    {
                        order.details.state_pol[0] === '4' ?
                            <div className={"mb-8 flex flex-col"}>
                                <span className={"text-sm font-medium text-red-500"}>Pago exitoso</span>
                                <h2 className={"text-5xl font-bold"}>Gracias por ordenar</h2>
                                <p className={"mt-3"}>Agradecemos su pedido, actualmente lo estamos procesando. Asi que
                                    porfavor
                                    espera, ¡podrás ver la confirmación en tu lista de pedidos muy pronto!</p>
                            </div>
                            : <div className={"mb-8 flex flex-col"}>
                                <span className={"text-sm font-medium text-red-500"}>Pago fallido</span>
                                <h2 className={"text-5xl font-bold"}>Tu pago fue rechazado</h2>
                                <p className={"mt-3"}>Lamentamos mucho que su pago haya sido rechazado. Por favor, acepte
                                    nuestras más sinceras disculpas por cualquier inconveniente que esto haya causado</p>
                            </div>
                    }
                    <div className={""}>
                        <div className={"text-sm font-medium flex flex-col gap-1 mb-4"}>
                            <span>Número de orden</span>
                            <span className={"text-sm font-medium text-red-500"}>{orderId}</span>
                        </div>
                        <div
                            className={"grid w-full divide-y divide-solid divide-gray-200 h-4/5 overflow-y-auto h-96"}>
                            {
                                products.map((product: any) => (
                                    <OrderSummaryCard
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.images[0]}
                                        count={product.count}
                                        key={product.id}
                                        className={"h-24"}
                                    />
                                ))
                            }
                        </div>
                        <div className={"h-full text-sm flex flex-col gap-2 divide-y divide-solid divide-gray-200"}>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"flex justify-between font-medium pt-2"}>
                                    <span className={"text-gray-500"}>Subtotal</span>
                                    <span className={""}>${getAmount(order.products)}</span>
                                </div>
                                <div className={"flex justify-between font-medium"}>
                                    <span className={"text-gray-500"}>Envio</span>
                                    <span className={""}>${order.shippingValue}</span>
                                </div>
                            </div>
                            <div className={"flex justify-between py-2 font-medium text-base"}>
                                <span className={""}>Total</span>
                                <span className={""}>${order.details.value}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-between items-start text-sm py-8"}>
                        <div className={"flex flex-col gap-2"}>
                            <span className={"font-medium"}>Dirección de entrega</span>
                            <div className={"text-gray-400 flex flex-col"}>
                                <span>{order.shippingAddress.address}</span>
                                <span>{order.shippingAddress.neighborhood}</span>
                                <span>{department}</span>
                                <span>{order.shippingAddress.zipCode}</span>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <span className={"font-medium"}>Información de pago</span>
                            <div className={"flex gap-2"}>
                                <BsFillCreditCard2FrontFill size={20}/>
                                <div className={"flex flex-col"}>
                                    <span>{order.details.payment_method_name}</span>
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

};