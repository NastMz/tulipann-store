import React, {useEffect, useRef, useState} from 'react';
import {WhatsAppWidget} from '../ui/WhatsAppWidget';
import {AnimatePresence, motion} from 'framer-motion';
import {BsWhatsapp} from 'react-icons/bs';

/**
 * Interface for WhatsAppFloatButton component props.
 *
 * @interface WhatsAppFloatButtonProps
 * @property {() => void} onClick - Callback function to handle click events.
 */
interface WhatsAppFloatButtonProps {
    onClick: () => void;
}

/**
 * WhatsAppFloatButton component.
 *
 * This component renders a floating WhatsApp button that expands a WhatsApp widget on click.
 *
 * @param {WhatsAppFloatButtonProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const WhatsAppFloatButton: React.FC<WhatsAppFloatButtonProps> = ({onClick}) => {
    return (
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
            transition={{delay: 0.1}}
            className="absolute bottom-0 right-0 w-fit h-fit rounded-full bg-green-500 hover:bg-green-700 shadow-2xl p-3 flex items-center justify-center cursor-pointer"
            onClick={onClick}
        >
            <BsWhatsapp size={30} color="white"/>
        </motion.div>
    );
};

/**
 * Interface for WhatsAppWidgetContainer component props.
 *
 * @interface WhatsAppWidgetContainerProps
 * @property {number} phone - Phone number to display in the WhatsApp widget.
 * @property {(isOpen: boolean) => void} setIsOpen - Callback function to set the open state of the container.
 * @property {boolean} open - Whether the widget is open.
 */
interface WhatsAppWidgetContainerProps {
    phone: number;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

/**
 * WhatsAppWidgetContainer component.
 *
 * This component contains the WhatsApp widget and handles its open/close state.
 *
 * @param {WhatsAppWidgetContainerProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const WhatsAppWidgetContainer: React.FC<WhatsAppWidgetContainerProps> = (props: WhatsAppWidgetContainerProps) => {
    const formRef = useRef<HTMLDivElement>(null);

    const hideForm = (e: any) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            props.setIsOpen(false);
        }
    };

    /**
     * Adds or removes a 'mousedown' event listener based on the open state of the container.
     *
     * @param {boolean} isOpen - Current open state of the container.
     */
    const toggleEventListener = (isOpen: boolean) => {
        if (isOpen) {
            document.addEventListener('mousedown', hideForm);
        } else {
            document.removeEventListener('mousedown', hideForm);
        }
    };
    useEffect(() => {
        toggleEventListener(true);
        return () => toggleEventListener(false);
    }, []);

    return (
        <AnimatePresence>
            {props.isOpen && (
                <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    exit={{scale: 0}}
                    className="z-10 transform origin-bottom-right"
                    ref={formRef}
                >
                    <WhatsAppWidget phone={props.phone} setIsOpen={props.setIsOpen}/>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/**
 * Interface for WhatsAppFloatIcon component props.
 *
 * @interface WhatsAppFloatIconProps
 * @property {number} phone - Phone number to display in the WhatsApp widget.
 */
interface WhatsAppFloatIconProps {
    phone: number;
}

/**
 * WhatsAppFloatIcon component.
 *
 * This component displays a floating WhatsApp icon that expands a WhatsApp widget on click.
 * @param {WhatsAppFloatIconProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const WhatsAppFloatIcon: React.FC<WhatsAppFloatIconProps> = ({phone}) => {
    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
    return (
        <div className="fixed z-30 bottom-5 right-5">
            {!formIsOpen && (
                <WhatsAppFloatButton onClick={() => setFormIsOpen(true)}/>
            )}
            <WhatsAppWidgetContainer phone={phone} setIsOpen={setFormIsOpen} isOpen={formIsOpen}/>
        </div>
    );
};
