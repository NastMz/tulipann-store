import React from "react";
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
 * Interface for Modal component props.
 *
 * @interface ModalProps
 * @property {string} title - The label of the modal.
 * @property {string} message - The message of the modal.
 * @property {string} buttonText - The text of the button.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {() => void} onButtonClick - The function to execute when the button is clicked.
 * @property {'error' | 'warning' | 'info' | 'success'} type - The type of modal to display.
 */
interface ModalProps {
    isOpen: boolean;
}


/**
 * LoaderModal component.
 *
 * This component displays a modal with a loading spinner.
 *
 * @param {ModalProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const LoaderModal: React.FC<ModalProps> = ({
                                                isOpen,
                                            }) => {

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center`}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                exit="closed"
                transition={{ delay: 0.2 }}
                variants={modalVariants}
                className="relative w-64 p-4 mx-auto h-64"
            >
                <div className="relative rounded-lg shadow-lg bg-white w-full h-full flex items-center justify-center">
                    <span className="loader2"></span>
                </div>
            </motion.div>
        </motion.div>
    );
};

