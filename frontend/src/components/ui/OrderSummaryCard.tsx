import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import {OptimizedImage} from "../common";
import {Image} from "../../models/interfaces";

interface OrderSummaryCardProps {
    id: number,
    name: string,
    price: number,
    image: Image,
    count: number,
    className?: string
}

export const OrderSummaryCard = (props: OrderSummaryCardProps) => {

    return (
        <div className={`relative flex gap-4 py-4 w-full ${props.className} text-black`}>
            <div className={"h-full w-20 lg:w-40 overflow-hidden rounded-xl"}>
                <OptimizedImage image={props.image}/>
            </div>
            <div className={"col-span-2 flex flex-col py-1 justify-between w-full pr-2"}>
                <div className={"flex justify-between items-start gap-2 w-full"}>
                    <div className={"w-2/3 flex flex-col gap-2 items-start"}>
                        <Link to={`${routes.product.path}/${props.id}`} className={""}>
                            <p className={"truncate text-md md:text-xl w-full"}>{props.name}</p>
                        </Link>
                        <span className={"text-md"}>x {props.count}</span>
                    </div>
                    <span className={"font-medium text-lg"}>${props.price*props.count}</span>
                </div>
            </div>
        </div>
    )
}