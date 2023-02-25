import {AiOutlineClose} from "react-icons/ai";
import {BiCheck} from "react-icons/bi";
import {TbShieldCheck} from "react-icons/tb";
import {Product} from "../../models/interfaces";
import {getRateMean, getTotalCustomerCount} from "../../utils";
import {Stars} from "../common";
import {addToCart} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {store} from "../../redux/store";
import {ProductGallery} from "../sections";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateSession} from "../../api/client";
import {Modal} from "../common";

interface ProductOverviewProps {
    product: Product
}

export const ProductOverview = (props: ProductOverviewProps) => {

    const [isInCart, setIsInCart] = useState<boolean>(false);

    const rate = getRateMean(props.product);

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState<'error' | 'warning' | 'info' | 'success'>('error');

    const navigate = useNavigate();
    const handleErrorMessage = () => {
        setErrorMessage('');
        navigate('/login');
    };
    const handleAddToCart = async (product: Product) => {
        // Validate the user's session
        const isLoggedIn = await validateSession();

        if (isLoggedIn) {
            // Add the product to the cart
            dispatch(addToCart(product));
        } else {
            setErrorMessage('Por favor inicia sesión para agregar productos al carrito');
            setType('error');
        }
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
        <>
        <div
            className={``}
        >
            <div
                className={`bg-white w-full min-h-fit flex flex-col-reverse lg:flex-row p-12 gap-10`}
            >
                <div className={"flex-grow flex flex-col gap-2 w-full lg:w-1/2"}>
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
                            onClick={() => handleAddToCart(props.product)}
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
                <ProductGallery
                    images={props.product.images}
                    className={"w-full h-96 lg:w-1/2"}
                />
            </div>
        </div>
    <Modal
        title="Error"
        message={errorMessage || 'Mensaje normal'}
        buttonText="Iniciar Sesión"
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage('')}
        onButtonClick={() => handleErrorMessage()}
        type={type}
    />
    </>
    )
}