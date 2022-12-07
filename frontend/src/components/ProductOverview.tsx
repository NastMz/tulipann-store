import {AiOutlineClose, BiCheck, TbShieldCheck} from "react-icons/all";
import {Product} from "../models";
import {getRateMean, getTotalCustomerCount} from "../utils";
import {Stars} from "./Stars";
import {addProductToCart} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts} from "../redux/selector";
import {store} from "../redux/store";
import {ProductImageSelector} from "./ProductImageSelector";
import {useEffect, useState} from "react";

interface ProductOverviewProps {
    product: Product
}

export const ProductOverview = (props: ProductOverviewProps) => {

    const [isInCart, setIsInCart] = useState<boolean>(false);

    const rate = getRateMean(props.product);

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    const addToCart = (id: number) => {
        let product = products.filter((product) => product.id === id)[0];
        dispatch(addProductToCart(product));
    }

    const setInCart = () => {
        if (store.getState().cart.list.filter(product => product.id === props.product.id).length > 0) {
            setIsInCart(true);
        }
    };

    useEffect(() => {
        setInCart();
    }, []);

    store.subscribe(() => {
        setInCart();
    });

    return (
        <div
            className={``}
        >
            <div
                className={`bg-white w-full h-fit flex flex-col-reverse lg:flex-row p-12 gap-10`}
            >
                <div className={"flex-grow flex flex-col gap-2"}>
                    <div className={"flex"}>
                        <h1 className={"text-xl md:text-4xl font-bold"}>{props.product.name}</h1>
                    </div>
                    <div className={"mt-2 flex gap-4 items-center"}>
                        <span className={"font-medium text-lg"}>${props.product.price}</span>
                        <div className={"h-2/3 w-[1px] content-{''} bg-gray-300"}/>
                        <Stars rate={rate} size={18}/>
                        <span
                            className={"text-sm text-gray-400 font-medium"}>{getTotalCustomerCount(props.product)} reseñas</span>
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
                                ? '' : 'pointer-events-none bg-gray-300'} ${isInCart ? 'pointer-events-none bg-gray-200' : ''}`}
                            onClick={() => addToCart(props.product.id)}
                        >
                            {
                                isInCart
                                    ? 'Ya está en la bolsa'
                                    : 'Añadir a la bolsa'
                            }
                        </span>
                    </div>
                    <div className={"flex items-cen´´ter justify-center gap-2 mt-2"}>
                        <TbShieldCheck size={30} color={"#D1D5DBFF"}/>
                        <span className={"text-gray-400 font-medium"}>Calidad garantizada</span>
                    </div>
                </div>
                <ProductImageSelector
                    images={props.product.images}
                    className={"w-full h-96 lg:w-1/2"}
                />
            </div>
        </div>
    )
}