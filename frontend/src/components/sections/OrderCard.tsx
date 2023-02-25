import {Order} from "../../models/interfaces";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {BsTruck} from "react-icons/bs";
import {getAmount} from "../../utils/orderUtils";
import {StatusChart} from "./StatusChart";
import {useSelector} from "react-redux";
import {selectDepartments, selectOrderStatus} from "../../redux/selector";
import {OrderPayUButton} from "../utils";
import {useState} from "react";
import {OrderProductsModal} from "./OrderProductsModal";

/**
 * Interface for the props of the OrderCard component.
 *
 * @interface OrderCardProps
 * @property {Order} order - The order to display.
 */
interface OrderCardProps {
    order: Order
}

/**
 * OrderCard component.
 *
 * This component is responsible for displaying a single order.
 *
 * @param {OrderCardProps} props - Props for the component.
 * @returns {JSX.Element} OrderCard component.
 */
export const OrderCard = (props: OrderCardProps) => {
    const departments = useSelector(selectDepartments);
    const department = departments.filter((department) => department.id === props.order.shippingAddress.departmentId)[0].name;

    const orderStatus = useSelector(selectOrderStatus);

    const status = orderStatus.filter((orderStatus) => orderStatus.id === props.order.stateId)[0];

    // State to show or hide the credits
    const [showHelp, setShowHelp] = useState(false);

    // State to show or hide the products.
    const [showProducts, setShowProducts] = useState(false);

    let shippingValue = 'Pago Contraentrega';

    if (props.order.online) {
        if (props.order.shippingValue) {
            shippingValue = `$${props.order.shippingValue}`;
        } else {
            shippingValue = 'Confirmación Pendiente';
        }
    }

    let paymentMethod = 'Efectivo';
    if (props.order.online) {
        if (props.order.details?.payment_method_name) {
            paymentMethod = props.order.details.payment_method_name;
        } else {
            paymentMethod = 'Pago Pendiente';
        }
    }

    return (
        <div className={'py-12 px-2 lg:px-8 flex flex-col gap-6'}>
            <div className={'flex flex-col lg:flex-row gap-6'}>
                <div className={`flex justify-center w-full lg:w-fit`}>
                    <BsTruck size={80}/>
                </div>
                <div className={'flex flex-col gap-1'}>
                    <span className={'font-bold'}>Orden #</span>
                    <span>{props.order.id}</span>
                    <span className={'font-bold'}>Valor</span>
                    <span>${props.order.details?.value ?? getAmount(props.order.products)}</span>
                    <span className={'font-bold'}>Valor envio: </span>
                    <span>{shippingValue}</span>
                    <span className={'font-bold'}>Metodo de pago: </span>
                    <span>{paymentMethod}</span>
                </div>
                <div className={'flex flex-col gap-1 lg:ml-12'}>
                    <span className={'font-bold'}>Dirección de Entrega</span>
                    <span>{props.order.shippingAddress.address}</span>
                    <span>{props.order.shippingAddress.neighborhood}</span>
                    <span>{department}</span>
                    <span>{props.order.shippingAddress.zipCode}</span>
                </div>
                {
                    props.order.shippingValue && status.percentage === 0 && (
                        <div className={'relative p-2'}>
                            <OrderPayUButton order={props.order}/>
                            <span
                                className={'absolute top-0 right-0'}
                                onMouseEnter={() => setShowHelp(true)}
                                onMouseLeave={() => setShowHelp(false)}
                            >
                                <AiOutlineQuestionCircle size={20} className={'hover:text-red-500'}/>
                                <div
                                    className={`absolute right-0 flex flex-col shadow-md h-fit w-[200px] bg-white opacity-100 p-2 rounded-md ${showHelp ? 'block' : 'hidden'}`}
                                >
                                    <span className={'font-bold'}>¿Qué es esto?</span>
                                    <span>Este botón te dirige a la pasarela de pagos para que puedas finalizar la compra.</span>
                                </div>
                            </span>
                        </div>
                    )
                }
            </div>
            <StatusChart orderStatus={status}/>
            <div className={'flex justify-end m-2'}>
                <span
                    className={'font-bold text-red-500 cursor-pointer'}
                    onClick={() => setShowProducts(true)}
                >
                    Ver Productos
                </span>
            </div>
            <OrderProductsModal
                order={props.order}
                isOpen={showProducts}
                onClose={() => setShowProducts(false)}
            />
        </div>
    )
}