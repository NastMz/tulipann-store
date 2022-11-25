import {Color} from "../models";
import {Link} from "react-router-dom";
import {routes} from "../routes/routes";
import {AiOutlineClose, BiCheck, TbShieldCheck} from "react-icons/all";
import {Stars} from "./Stars";
import {useDispatch, useSelector} from "react-redux";
import {addProductToCart} from "../redux/actions";
import {selectProducts} from "../redux/selector";
import {store} from "../redux/store";
import {saveCartState} from "../utils";
import {throttle} from 'lodash';
import {AnimatePresence, motion} from "framer-motion";

interface ProductQuickviewProps {
    id: number,
    img: string,
    name: string,
    price: number,
    stock: number,
    rate: number,
    description: string,
    colors?: Color[] | null,
    bgClassName?: string,
    cardClassName?: string,
    isOpen: boolean,
    closeProductPreview: Function
}

export const ProductQuickview = (props: ProductQuickviewProps) => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    const addToCart = (id: number) => {
        props.closeProductPreview();
        let product = products.filter((product) => product.id === id)[0];
        dispatch(addProductToCart(product));
    }

    store.subscribe(throttle(() => {
        let state = store.getState().cart.list.map((product) => {
            return {
                id: product.id,
                count: product.count
            }
        });
        saveCartState(state);
    }, 1000));

    return (
        <div
            className={`fixed inset-0 h-screen w-full z-50 flex justify-center items-center ${props.isOpen ? '' : 'pointer-events-none'}`}
        >
            <div
                className={`fixed inset-0 bg-black ${props.isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'} ${props.bgClassName}`}
                onClick={() => props.closeProductPreview()}
            />
            <AnimatePresence>
                {
                    props.isOpen && (
                        <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0, transition: {duration: 0.3}}}
                            className={`bg-white overflow-hidden w-5/6 md:w-2/3 h-5/6 md:h-2/3 rounded-sm flex flex-col md:flex-row p-12 md:p-8 2xl:p-20 gap-4 md:gap-10 2xl:gap-24 shadow-xl relative ${props.isOpen ? '' : 'pointer-events-none'} ${props.cardClassName}`}
                        >
                            <AiOutlineClose
                                size={25}
                                className={"absolute top-4 md:top-6 right-4 md:right-6 cursor-pointer ext-gray-400 hover:text-red-500"}
                                onClick={() => props.closeProductPreview()}
                            />
                            <div className={"flex flex-col gap-8 md:w-2/5 md:h-4/5"}>
                                <div className={"overflow-hidden w-full h-full rounded-lg"}>
                                    <img src={props.img} alt="" className={`h-full w-full object-cover`}/>
                                </div>
                                <div className={"flex items-center justify-center"}>
                                    <Link
                                        to={`${routes.product.path}/${props.id}`}
                                        className={"text-red-600 font-medium"}
                                    >
                                        Ver detalles completos
                                    </Link>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"flex -mt-2"}>
                                    <h1 className={"text-xl md:text-4xl font-bold"}>{props.name}</h1>
                                </div>
                                <div className={"mt-2 flex gap-4 items-center"}>
                                    <span className={"font-medium text-lg"}>${props.price}</span>
                                    <div className={"h-2/3 w-[1px] content-{''} bg-gray-300"}/>
                                    <Stars rate={props.rate} size={18}/>
                                </div>
                                <div className={"flex gap-1 items-center py-2"}>
                                    {
                                        props.stock > 0
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
                                    {props.description}
                                </p>
                                <div className={"flex items-center my-1 md:my-4"}>
                                    <span
                                        className={`bg-red-500 hover:bg-red-400 text-center p-3 text-white font-medium cursor-pointer flex-grow rounded-lg ${props.stock > 0
                                            ? '' : 'pointer-events-none bg-gray-300'} ${store.getState().cart.list.filter(product => product.id === props.id).length === 0 ? '' : 'pointer-events-none bg-gray-300'}`}
                                        onClick={() => addToCart(props.id)}
                                    >
                                        {
                                            store.getState().cart.list.filter(product => product.id === props.id).length === 0
                                                ? 'Añadir a la bolsa'
                                                : 'Ya está en la bolsa'
                                        }
                                    </span>
                                </div>
                                <div className={"flex items-center justify-center gap-2"}>
                                    <TbShieldCheck size={30} color={"#D1D5DBFF"}/>
                                    <span className={"text-gray-400 font-medium"}>Calidad garantizada</span>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}