import {AnimatePresence, motion} from "framer-motion";
import {ReactNode} from "react";

interface AccordionLayoutProps {
    title: string,
    children: ReactNode,
    index: number,
    activeIndex: number,
    setActiveIndex: Function
}

export const AccordionLayout = (props: AccordionLayoutProps) => {
    return (
        <>
            <div
                className={`flex w-full justify-between p-2 border-b ${props.activeIndex === props.index || props.activeIndex < props.index ? 'pointer-events-none' : 'cursor-pointer'}`}
                onClick={() => props.setActiveIndex(props.index)}>
                <div className='flex'>
                    <div
                        className={`font-medium text-xl transition-all duration-300 ${props.activeIndex === props.index ? '' : 'text-gray-400'} ${props.activeIndex < props.index ? '' : 'hover:text-black'}`}>{props.title}</div>
                </div>
            </div>
            <AnimatePresence exitBeforeEnter>
                {(props.activeIndex === props.index) &&
                    <motion.div
                        initial={{height: 0}}
                        animate={{height: 'fit-content'}}
                        exit={{height: 0}}
                        className="mt-4 mb-6 bg-white overflow-hidden"
                        key={props.activeIndex}
                    >
                        {props.children}
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};