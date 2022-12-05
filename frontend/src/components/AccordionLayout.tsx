import {AnimatePresence, motion} from "framer-motion";
import {ReactNode} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";

interface AccordionLayoutProps {
    title: string,
    children: ReactNode,
    index: number,
    activeIndex: number,
    setActiveIndex: Function
    className?: string,
    titleClass?: string,
    showIcon?: boolean
}

export const AccordionLayout = (props: AccordionLayoutProps) => {
    const toggle = (index: number) => {
      if (props.activeIndex === index){
          props.setActiveIndex(-1);
      } else {
          props.setActiveIndex(index);
      }
    }
    return (
        <>
            <div
                className={`flex w-full p-2 border-b justify-between items-center ${props.className}`}
                onClick={() => toggle(props.index)}>
                    <div
                        className={`font-medium text-xl transition-all duration-300 ${props.titleClass}`}
                    >
                        {props.title}
                    </div>
                    {
                        props.showIcon && (props.activeIndex === props.index ? <AiOutlineMinus size={20} /> : <AiOutlinePlus size={20} />)
                    }
            </div>
            <AnimatePresence mode={'wait'}>
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