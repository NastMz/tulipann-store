import {OrderSummaryCard} from "../ui";
import {useSelector} from "react-redux";
import {selectProducts} from "../../redux/selector";
import {MouseEventHandler, useRef} from "react";
import {Order} from "../../models/interfaces";
import {motion} from "framer-motion";

/**
 * Variants for animating the modal.
 *
 * @type {import('framer-motion').Variants}
 */
const modalVariants = {
    open: { scale: 1 },
    closed: { scale: 0 },
};

/**
 * Variants for animating the background.
 *
 * @type {import('framer-motion').Variants}
 */
const backgroundVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
};

/**
 * Interface for OrderProductsModal component props.
 *
 * @interface OrderProductsModalProps
 * @property {Order} order - The order to display.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 */
interface OrderProductsModalProps {
    order: Order;
    isOpen: boolean;
    onClose: () => void
}


/**
 * OrderProductsModal component.
 *
 * This component displays a modal with a list of products from an order.
 *
 * @param props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const OrderProductsModal = (props: OrderProductsModalProps) => {

    const productsFromStore = useSelector(selectProducts);

    let products = productsFromStore.filter((product) => props.order.products.some((orderProduct) => orderProduct.productId === product.id));

    products = products.map((product) => {
        return {
            ...product,
            count: props.order.products.filter((orderProduct) => orderProduct.productId === product.id)[0].quantity
        }
    });

    // Create a ref for the modal element
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle click events on the modal element
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        // Check if the clicked element is the modal element or one of its descendants
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            // If it's not, then close the modal
            props.onClose();
        }
    };

    return (
        <motion.div
            initial="closed"
            animate={props.isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                props.isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center`}
            onClick={handleClick}
        >
            <motion.div
                initial="closed"
                animate={props.isOpen ? 'open' : 'closed'}
                exit="closed"
                transition={{delay: 0.2}}
                variants={modalVariants}
                ref={modalRef}
                className="relative w-[90%] lg:w-[60%] p-8 mx-auto h-[80%] bg-white rounded-md shadow-lg flex flex-col gap-2 overflow-y-auto"
            >
                <div className={"font-medium flex flex-col gap-1 mb-4"}>
                    <span>Número de orden</span>
                    <span className={"text-sm font-medium text-red-500"}>{props.order.id}</span>
                </div>
                <span className={"font-medium"}>Productos</span>
                <div
                    className={"grid w-full divide-y divide-solid divide-gray-200 h-4/5 overflow-y-auto h-96 px-4 border border-gray-200 rounded-lg"}>
                    {
                        products.map((product: any) => (
                            <OrderSummaryCard
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.images[0].image}
                                count={product.count}
                                key={product.id}
                                className={"h-24"}
                            />
                        ))
                    }
                </div>
            </motion.div>
        </motion.div>
    )
}