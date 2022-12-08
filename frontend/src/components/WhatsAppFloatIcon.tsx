import {useEffect, useRef, useState} from "react";
import {WhatsAppWidget} from "./WhatsAppWidget";
import {AnimatePresence, motion} from "framer-motion";
import {BsWhatsapp} from "react-icons/all";

export const WhatsAppFloatIcon = (props: { phone: number }) => {
    const formRef = useRef<any>(null);

    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

    const hideForm = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            setFormIsOpen(false);
        }
    }

    useEffect(() => {
        if (formIsOpen) {
            document.addEventListener('mousedown', hideForm);
        } else {
            document.removeEventListener('mousedown', hideForm);
        }
    }, [formIsOpen]);

    return (
        <div className="fixed z-30 bottom-5 right-5">
            {!formIsOpen &&
                <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    exit={{scale: 0}}
                    transition={{delay: 0.1}}
                    className="absolute bottom-0 right-0 w-fit h-fit rounded-full bg-green-500 hover:bg-green-700 shadow-2xl p-3 flex items-center justify-center cursor-pointer"
                    onClick={() => setFormIsOpen(true)}
                >
                    <BsWhatsapp size={30} color={"white"}/>
                </motion.div>
            }
            <AnimatePresence>
                {
                    formIsOpen &&
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        className={`z-10 transform origin-bottom-right`}
                        ref={formRef}
                    >
                        <WhatsAppWidget
                            phone={props.phone}
                            setIsOpen={setFormIsOpen}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}