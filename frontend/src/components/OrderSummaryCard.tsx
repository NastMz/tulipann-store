import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/all";
import {Link} from "react-router-dom";
import {routes} from "../routes/routes";
import {Image} from "./Image";

interface OrderSummaryCardProps {
    id: number,
    name: string,
    color?: string,
    price: number,
    image: string,
    count: number,
    className?: string
}

export const OrderSummaryCard = (props: OrderSummaryCardProps) => {

    return (
        <div className={`relative grid grid-cols-3 gap-4 py-4 w-full ${props.className} text-black`}>
            <div className={"h-full w-full overflow-hidden rounded-lg"}>
                <Image src={props.image}/>
            </div>
            <div className={"col-span-2 flex flex-col py-1 justify-between w-full"}>
                <div className={"flex justify-between items-start gap-2 w-full"}>
                    <div className={"w-2/3"}>
                        <Link to={`${routes.product.path}/${props.id}`} className={"w-full"}>
                            <p className={"truncate text-xl w-full"}>{props.name}</p>
                        </Link>
                        <span className={"text-sm"}>{props.color}</span>
                    </div>
                    <span className={"font-medium text-lg"}>${props.price}</span>
                </div>
            </div>
        </div>
    )
}