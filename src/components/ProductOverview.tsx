import {AiFillStar, AiOutlineClose, BiCheck} from "react-icons/all";
import {Product} from "../models";
import {getRateMean, getTotalCustomerCount} from "../utils";
import {Stars} from "./utils/Stars";

interface ProductOverviewProps {
    product: Product
}

export const ProductOverview = (props: ProductOverviewProps) => {

    const rate = getRateMean(props.product);

    return (
        <div
            className={``}
        >
            <div
                className={`bg-white w-full h-fit flex p-12 gap-10`}
            >
                <div className={"flex-grow flex flex-col gap-2"}>
                    <div className={"flex"}>
                        <h1 className={"text-xl md:text-4xl font-bold"}>{props.product.name}</h1>
                    </div>
                    <div className={"mt-2 flex gap-4 items-center"}>
                        <span className={"font-medium text-lg"}>${props.product.price}</span>
                        <div className={"h-2/3 w-[1px] content-{''} bg-gray-300"}/>
                        <Stars rate={rate} size={18}/>
                        <span className={"text-sm text-gray-400 font-medium"}>{getTotalCustomerCount(props.product)} reseñas</span>
                    </div>
                    <div className={"flex gap-1 items-center py-2"}>
                        {
                            props.product.stock > 0
                                ? (
                                    <>
                                        <BiCheck size={20} color={"#4ade80"}/>
                                        <span
                                            className={"text-sm text-gray-400 font-medium"}>En stock y listo para enviar</span>
                                    </>
                                )
                                : (
                                    <>
                                        <AiOutlineClose size={20} color={"#ef4444"}/>
                                        <span className={"text-sm text-gray-400 font-medium"}>Agotado</span>
                                    </>
                                )
                        }
                    </div>
                    <p className={"text-sm font-medium flex-grow "}>
                        {props.product.description}
                    </p>
                    <div className={"flex items-center mt-4"}>
                        <span
                            className={`bg-red-500 hover:bg-red-400 text-center p-3 text-white font-medium cursor-pointer flex-grow rounded-lg ${props.product.stock > 0
                                ? '' : 'pointer-events-none bg-gray-300'}`}>
                            Añadir a la bolsa
                        </span>
                    </div>
                </div>
                <div className={"overflow-hidden w-full h-full md:w-1/2"}>
                    <img src={props.product.img} alt="" className={`h-full w-full object-cover rounded-sm`}/>
                </div>
            </div>
        </div>
    )
}