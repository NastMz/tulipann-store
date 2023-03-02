import {useSelector} from "react-redux";
import {selectCommentaries, selectProducts} from "../../redux/selector";
import {MouseEventHandler, useRef} from "react";
import {Order} from "../../models/interfaces";
import {motion} from "framer-motion";
import {ProductFeedbackCard} from "./ProductFeedbackCard";

/**
 * Variants for animating the modal.
 *
 * @type {import('framer-motion').Variants}
 */
const modalVariants = {
    open: {scale: 1},
    closed: {scale: 0},
};

/**
 * Variants for animating the background.
 *
 * @type {import('framer-motion').Variants}
 */
const backgroundVariants = {
    open: {opacity: 1},
    closed: {opacity: 0},
};

/**
 * Interface for ProductFeedbackModal component props.
 *
 * @interface ProductFeedbackModalProps
 * @property {Order} order - The order to display.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 */
interface ProductFeedbackModalProps {
    productId: string;
    isOpen: boolean;
    onClose: () => void
}


/**
 * ProductFeedbackModal component.
 *
 * This component displays a modal with a list of comments for a product.
 *
 * @param props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ProductFeedbackModal = (props: ProductFeedbackModalProps) => {

    const commentsFromStore = useSelector(selectCommentaries);

    const comments = commentsFromStore.filter((comment) => props.productId === comment.productId);

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

    const products = useSelector(selectProducts);

    const product = products.find((product) => product.id === props.productId);

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
                <div className={"font-medium flex gap-2 mb-1 items-center"}>
                    <span>ID:</span>
                    <span className={"text-sm font-medium text-red-500"}>{product?.id}</span>
                </div>

                <div className={"font-medium flex gap-2 mb-4 items-center"}>
                    <span>Producto:</span>
                    <span className={"text-sm font-medium text-red-500"}>{product?.name}</span>
                </div>

                <span className={"font-medium"}>Comentarios</span>
                <div
                    className={"flex flex-col w-full divide-y divide-solid divide-gray-200 h-4/5 overflow-y-auto h-96 px-4 border border-gray-200 rounded-lg"}>
                    {
                        comments.map((comment: any) => (
                            <ProductFeedbackCard comment={comment} key={comment.id}/>
                        ))
                    }
                </div>
            </motion.div>
        </motion.div>
    )
}