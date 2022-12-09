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
    showIcon?: boolean,
    independentCards?: {
        activeIndexes: Array<number>,
        setActiveIndexes: Function
    }
}

export const AccordionLayout = (props: AccordionLayoutProps) => {
    const toggle = (index: number) => {
        if (props.independentCards === undefined) {
            if (props.activeIndex === index) {
                props.setActiveIndex(-1);
            } else {
                props.setActiveIndex(index);
            }
        } else {
            setActiveIndex(props.index);
        }
    }

    const setActiveIndex = (index: number) => {
        if (props.independentCards?.activeIndexes?.filter(i => i === index).length === 0) {
            props.independentCards?.setActiveIndexes([...props.independentCards?.activeIndexes, index])
        } else {
            props.independentCards?.setActiveIndexes([...props.independentCards?.activeIndexes?.filter(i => i !== index)])
            console.log('ok')
        }
    }

    const icon = () => {
        if (props.independentCards !== undefined) {
            let activeIndexes = props.independentCards?.activeIndexes;
            return props.showIcon && (activeIndexes?.some(item => item === props.index) ? <AiOutlineMinus size={20}/> :
                <AiOutlinePlus size={20}/>)
        } else {
            return props.showIcon && (props.activeIndex === props.index ? <AiOutlineMinus size={20}/> :
                <AiOutlinePlus size={20}/>)
        }
    }

    const child = () => {
        if (props.independentCards !== undefined) {
            let activeIndexes = props.independentCards?.activeIndexes;
            return <AnimatePresence mode={'wait'}>
                {activeIndexes?.some(item => item === props.index) && <motion.div
                    initial={{height: 0}}
                    animate={{height: 'fit-content'}}
                    exit={{height: 0}}
                    className="mt-4 mb-6 bg-white overflow-hidden"
                    key={props.index}
                >
                    {props.children}
                </motion.div>
                }
            </AnimatePresence>
        } else {
            return <AnimatePresence mode={'wait'}>
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
                    icon()
                }
            </div>
            {
                child()
            }
        </>
    );
};