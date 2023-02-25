import {Product} from "../../models/interfaces";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";
import {AiOutlineClose} from "react-icons/ai";
import {BiCheck} from "react-icons/bi";
import {TbShieldCheck} from "react-icons/tb";
import {Modal, OptimizedImage, Stars} from "../common";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/actions";
import {store} from "../../redux/store";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {getRateMean} from "../../utils";
import {validateSession} from "../../api/client";

const modalVariants = {
    open: {scale: 1},
    closed: {scale: 0}
};

const backgroundVariants = {
    open: {opacity: 1},
    closed: {opacity: 0}
};

interface ProductQuickviewProps {
    product: Product,
    bgClassName?: string,
    cardClassName?: string,
    isOpen: boolean,
    closeProductPreview: () => void
}

export const ProductQuickview = (props: ProductQuickviewProps) => {

    const [isInBag, setIsInBag] = useState<boolean>(false);
    const [isClosed, setIsClosed] = useState<boolean>(!props.isOpen);

    const dispatch = useDispatch();
    const rate = getRateMean(props.product);

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
            closeQuickview();
            dispatch(addToCart(product));
        } else {
            setErrorMessage('Por favor inicia sesión para agregar productos al carrito');
            setType('error');
        }
    }

    const setInCart = () => {
        if (store.getState().cart.list.filter(product => product.id === props.product.id).length > 0) {
            setIsInBag(true);
        }
    };

    const closeQuickview = () => {
        setIsClosed(true);
        setTimeout(() => props.closeProductPreview(), 300);
    }

    useEffect(() => {
        setInCart();
    }, []);

    return (
        <>
            {
                !isClosed && (
                    <motion.div
                        initial="closed"
                        animate={!isClosed ? "open" : "closed"}
                        exit="closed"
                        variants={backgroundVariants}
                        className={`${!isClosed ? 'block' : 'hidden'} fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4 md:p-10 lg:p-20`}
                    >
                        <motion.div
                            initial="closed"
                            animate={!isClosed ? "open" : "closed"}
                            exit="closed"
                            transition={{duration: 0.2}}
                            variants={modalVariants}
                            className={`bg-white overflow-hidden h-full w-[90%] rounded-xl flex flex-col md:flex-row px-8 pt-14 pb-8 lg:p-12 2xl:p-20 gap-6 md:gap-12 2xl:gap-24 shadow-xl relative ${props.isOpen ? '' : 'pointer-events-none'} ${props.cardClassName}`}
                        >
                            <AiOutlineClose
                                size={25}
                                className={"absolute top-4 md:top-6 right-4 md:right-6 cursor-pointer text-gray-400 hover:text-red-500"}
                                onClick={() => closeQuickview()}
                            />
                            <div className={"flex flex-col gap-8 w-full md:w-2/3 overflow-hidden"}>
                                <div className={"overflow-hidden w-full h-full rounded-xl flex-grow"}>
                                    <OptimizedImage image={props.product.images[0]}/>
                                </div>
                                <div className={"hidden lg:flex items-center justify-center"}>
                                    <Link
                                        to={`${routes.product.path}/${props.product.id}`}
                                        className={"text-red-600 font-medium"}
                                    >
                                        Ver detalles completos
                                    </Link>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-2 w-full md:w-2/3"}>
                                <div className={"flex -mt-2"}>
                                    <h1 className={"text-2xl md:text-4xl font-bold"}>{props.product.name}</h1>
                                </div>
                                <div className={"mt-2 flex gap-4 items-center"}>
                                    <span className={"font-medium text-lg"}>${props.product.price}</span>
                                    <div className={"h-2/3 w-[1px] content-{''} bg-gray-300"}/>
                                    <Stars rate={rate} size={18}/>
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
                                <div className={'flex-grow'}>
                                    <p className={"font-medium"}>
                                        {props.product.description}
                                    </p>
                                </div>
                                <div className={"flex items-center my-1 md:my-4"}>
                                    <span
                                        className={`bg-red-500 hover:bg-red-400 text-center p-3 text-white font-medium cursor-pointer flex-grow rounded-lg mt-4 lg:mt-0 ${props.product.stock > 0
                                            ? '' : 'pointer-events-none bg-gray-300'} ${isInBag ? 'pointer-events-none bg-gray-300' : ''}`}
                                        onClick={() => handleAddToCart(props.product)}
                                    >
                                        {
                                            isInBag
                                                ? 'Ya está en la bolsa'
                                                : 'Añadir a la bolsa'
                                        }
                                    </span>
                                </div>
                                <div className={"flex items-center justify-center gap-2"}>
                                    <TbShieldCheck size={30} color={"#D1D5DBFF"}/>
                                    <span className={"text-gray-400 font-medium"}>Calidad garantizada</span>
                                </div>
                                <div className={"lg:hidden mt-2 flex items-center justify-center"}>
                                    <Link
                                        to={`${routes.product.path}/${props.product.id}`}
                                        className={"text-red-600 font-medium"}
                                    >
                                        Ver detalles completos
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
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