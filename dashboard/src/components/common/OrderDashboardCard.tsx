import {formatPrice} from "../../utils";

/**
 * Interface for OrderDashboardCard props.
 *
 * @param {string} orderId - The order id.
 * @param {number} amount - The amount of the order.
 * @param {string} className - The class name for the component.
 */
export interface OrderDashboardCardProps {
    orderId: string;
    amount: number;
    className?: string;
}

/**
 * OrderDashboardCard component.
 *
 * This component is used to render a card on the dashboard with the order information.
 *
 * @param {OrderDashboardCardProps} props - The props for the component.
 * @returns {JSX.Element} - The component.
 */
export const OrderDashboardCard = ({orderId, amount, className}: OrderDashboardCardProps) => {
    return (
        <div className={`text-sm p-2 ${className}`}>
                <div className={"font-medium flex flex-col gap-1"}>
                    <span>Número de orden:</span>
                    <span className={"text-sm font-medium text-red-500"}>{orderId}</span>
                </div>
                <div className={"font-medium flex gap-1 mt-1"}>
                    <span>Subtotal:</span>
                    <span className={"text-sm font-medium text-red-500"}>{formatPrice(amount)}</span>
                </div>
        </div>
    )
}