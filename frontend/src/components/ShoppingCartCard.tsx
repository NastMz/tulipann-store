import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/all";
import {Link} from "react-router-dom";
import {routes} from "../config";
import {OptimizedImage} from "./OptimizedImage";
import {Image} from "../models";

interface ShoppingCartCardProps {
    id: number,
    name: string,
    color?: string,
    price: number,
    image: Image,
    count: number,
    increaseFunction: Function,
    decreaseFunction: Function,
    removeProductFromCart: Function,
    className?: string
}

export const ShoppingCartCard = (props: ShoppingCartCardProps) => {

    return (
        <div className={`relative grid grid-cols-3 gap-6 py-4 w-full ${props.className} text-black`}>
            <div className={"h-full w-full min-w-[80px] overflow-hidden rounded-xl"}>
                <OptimizedImage image={props.image}/>
            </div>
            <div className={"flex flex-col py-1 justify-between col-span-2"}>
                <div className={"flex justify-between items-start gap-4 w-full"}>
                    <div className={"truncate"}>
                        <Link to={`${routes.product.path}/${props.id}`} className={"w-full truncate"}>
                            <p className={"truncate text-xl w-full"}>{props.name}</p>
                        </Link>
                    </div>
                    <div>
                        <span className={"font-medium text-lg float-right"}>${props.price}</span>
                    </div>
                </div>
                <div className={"flex justify-between items-center"}>
                    <div className={"flex gap-3 items-center justify-end"}>
                        <AiOutlineMinusCircle
                            size={20}
                            className={`text-gray-400 ${props.count > 1 ? 'hover:text-red-500 cursor-pointer' : ' text-gray-200 pointer-events-none'}`}
                            onClick={() => props.decreaseFunction(props.id)}
                        />
                        <span>{props.count}</span>
                        <AiOutlinePlusCircle
                            size={20}
                            className={`text-gray-400 hover:text-red-500 cursor-pointer`}
                            onClick={() => props.increaseFunction(props.id)}
                        />
                    </div>
                    <div
                        className={"w-fit text-red-500 text-sm cursor-pointer font-medium"}
                        onClick={() => props.removeProductFromCart(props.id)}
                    >
                        Eliminar
                    </div>
                </div>
            </div>
        </div>
    )
}