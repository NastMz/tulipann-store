import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import {OptimizedImage} from "../common";
import {Image} from "../../models/interfaces";

/**
 * Interface for ShoppingCartCard component props.
 *
 * @interface ShoppingCartCardProps
 * @property {string} id - ID of the product.
 * @property {string} name - Name of the product.
 * @property {string} [color] - Color of the product.
 * @property {number} price - Price of the product.
 * @property {Image} image - Image of the product.
 * @property {number} count - Number of units of the product in the cart.
 * @property {(id: number) => void} increaseFunction - Function to increase the count of the product in the cart.
 * @property {(id: number) => void} decreaseFunction - Function to decrease the count of the product in the cart.
 * @property {(id: number) => void} removeProductFromCart - Function to remove the product from the cart.
 * @property {string} [className] - Class name for the card container.
 */

interface ShoppingCartCardProps {
    id: string,
    name: string,
    color?: string,
    price: number,
    image: Image,
    count: number,
    increaseFunction: (id: string) => void,
    decreaseFunction: (id: string) => void,
    removeProductFromCart: (id: string) => void,
    className?: string
}

/**
 * ShoppingCartCard component.
 *
 * This component displays a card for a product in the shopping cart, with its name, image, price,
 * and a count of how many units of the product are in the cart. It also includes buttons to increase
 * or decrease the count, and a button to remove the product from the cart.
 *
 * @param {ShoppingCartCardProps} props - Props for the component.
 * @returns {React.ReactNode} The rendered component.
 */
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