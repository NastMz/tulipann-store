import {useSelector} from "react-redux";
import {selectOrders} from "../../redux/selector";
import {BsTruck} from "react-icons/bs";
import {OrderCard} from "./OrderCard";

/**
 * OrderTable component.
 *
 * This component is responsible for displaying a table of orders.
 *
 * @returns {JSX.Element} OrderTable component.
 */
export const OrderTable = (props: { className?: string; }) => {

    const orders = useSelector(selectOrders);

    return (
        <div
            className={`flex flex-col ${props.className}`}
        >
            {
                orders.length > 0
                    ? <div className={'divide-y divide-solid overflow-y-auto px-3 py-4 h-full border border-gray-200 rounded-lg'}>
                        {
                            orders.map((order) => {
                                return (
                                    <OrderCard order={order} key={order.id}/>
                                )
                            })
                        }
                    </div>
                    : <div className={"flex flex-col items-center justify-center gap-6 text-gray-200 h-80"}>
                        <BsTruck size={90}/>
                        <span className={"text-2xl"}>No tienes ordenes</span>
                    </div>
            }
        </div>
    )
}