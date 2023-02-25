import {OrderStatus} from "../../models/interfaces/Order";

/**
 * Interface for the props of the StatusChart component.
 *
 * @interface StatusChartProps
 * @property {OrderStatus} orderStatus - The status of the order.
 */
interface StatusChartProps {
    orderStatus: OrderStatus;
}

/**
 * StatusChart component.
 *
 * This component is responsible for displaying the status chart of the order.
 *
 * @returns {JSX.Element} StatusChart component.
 */
export const StatusChart = (props: StatusChartProps) => {

    return (
        <div className={'flex flex-col gap-4'}>
            <span className={'font-bold'}>Estado de la orden: <span className={'font-base'}>{props.orderStatus.name}</span></span>
            {/* The bar chart */}
            <div className="flex-grow h-4 bg-gray-100 rounded-lg content-[' ']">
                <div
                    className={`h-4 rounded-lg content-[' '] bg-red-500 relative`}
                    style={{
                        width: `${props.orderStatus.percentage}%`,
                    }}
                />
            </div>
        </div>
    )
}