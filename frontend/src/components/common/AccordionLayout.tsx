import {AnimatePresence, motion} from "framer-motion";
import React from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

/**
 * Interface for AccordionLayout component props.
 *
 * @interface AccordionLayoutProps
 * @property {string} title - The title of the accordion section.
 * @property {React.ReactNode} children - The children elements to render within the accordion section.
 * @property {number} index - The index of the accordion section.
 * @property {number} activeIndex - The index of the currently active accordion section.
 * @property {(index: number) => void} setActiveIndex - A function to set the active accordion section.
 * @property {string} [className] - An optional CSS class to apply to the accordion section.
 * @property {string} [titleClass] - An optional CSS class to apply to the title element.
 * @property {boolean} [showIcon] - A flag to indicate whether to show an icon next to the title.
 * @property {Object} [independentCards] - An optional object to specify independent accordion sections.
 * @property {number[]} independentCards.activeIndexes - An array of active accordion section indexes.
 * @property {(indexes: number[]) => void} independentCards.setActiveIndexes - A function to set the active accordion section indexes.
 */

interface AccordionLayoutProps {
    title: string;
    children: React.ReactNode;
    index: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    className?: string;
    titleClass?: string;
    showIcon?: boolean;
    independentCards?: {
        activeIndexes: number[];
        setActiveIndexes: (indexes: number[]) => void;
    };
}


/**
 * AccordionLayout component.
 *
 * This component displays an accordion with a title and content.
 *
 * @param {AccordionLayoutProps} props - Properties for the AccordionLayout component.
 * @returns {JSX.Element} A React element representing the AccordionLayout component.
 */
/**
 * AccordionLayout component.
 *
 * This component displays an accordion layout with a title, children elements, and an optional icon.
 * The accordion section can be toggled to show or hide the children elements.
 *
 * @param {AccordionLayoutProps} props - Props for the component.
 * @returns {React.ReactNode} The rendered component.
 */
export const AccordionLayout: React.FC<AccordionLayoutProps> = (props: AccordionLayoutProps) => {
    // Toggle the active index of the accordion
    const toggle = () => {
        if (props.independentCards === undefined) {
            if (props.activeIndex === props.index) {
                props.setActiveIndex(-1);
            } else {
                props.setActiveIndex(props.index);
            }
        } else {
            setActiveIndex(props.index);
        }
    };

    // Set the active index of independent cards
    const setActiveIndex = (index: number) => {
        if (!props.independentCards?.activeIndexes.includes(index)) {
            props.independentCards?.setActiveIndexes([...props.independentCards?.activeIndexes, index]);
        } else {
            props.independentCards?.setActiveIndexes([...props.independentCards?.activeIndexes.filter((i) => i !== index)]);
        }
    };

    // Icon component
    const icon = () => {
        // Check if accordion is active
        let isActive;
        if (props.independentCards !== undefined) {
            isActive = props.independentCards.activeIndexes.includes(props.index);
        } else {
            isActive = props.activeIndex === props.index;
        }

        // Animate rotation of icon depending on whether accordion is active or not
        return (
            <AnimatePresence>
                <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    exit={{ rotate: isActive ? 0 : 180 }}
                >
                    <AccordionIcon index={props.index} activeIndexes={props.independentCards?.activeIndexes} />
                </motion.div>
            </AnimatePresence>
        );
    };

    // Child component
    const child = () => {
        if (props.independentCards !== undefined) {
            return (
                <AnimatePresence mode={'wait'}>
                    {props.independentCards.activeIndexes.includes(props.index) && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{
                                height:
                                    props.index === 0 || props.independentCards?.activeIndexes.includes(props.index)
                                        ? 'auto'
                                        : 0,
                            }}
                            exit={{ height: 0 }}
                            transition={{ ease: 'easeInOut' }}
                            className="mt-4 mb-6 bg-white overflow-hidden"
                            key={props.index}
                        >
                            {props.children}
                        </motion.div>
                    )}
                </AnimatePresence>
            );
        } else {
            return (
                <AnimatePresence mode={'wait'}>
                    {props.activeIndex === props.index && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{
                                height:
                                    props.index === 0 || props.activeIndex === props.index ? 'auto' : 0,
                            }}
                            exit={{ height: 0 }}
                            transition={{ ease: 'easeInOut' }}
                            className="mt-4 mb-6 bg-white overflow-hidden"
                            key={props.index}
                        >
                            {props.children}
                        </motion.div>
                    )}
                </AnimatePresence>
            );
        }
    };

    return (
        <div className={`flex flex-col ${props.className}`}>
            <div
                className={`w-full text-gray-700 cursor-pointer font-bold py-4 flex justify-between min-h-fit items-center border-b border-gray-200 ${ props.titleClass || '' }`}
                onClick={toggle}
            >
                {props.title}
                {props.showIcon && icon()}
            </div>
            <div className="relative overflow-hidden">
                {child()}
            </div>
        </div>
    );
};


/**
 * AccordionIcon component.
 *
 * This component displays a plus or minus icon depending on the active state of the accordion.
 *
 * @param {AccordionIconProps} props - Props for the component.
 * @returns {React.ReactNode} The rendered component.
 */
const AccordionIcon: React.FC<AccordionIconProps> = (props: AccordionIconProps) => {
    // Check if accordion is active
    const isActive = props.activeIndexes && props.activeIndexes.includes(props.index);

    // Return the appropriate icon
    return isActive ? <AiOutlineMinus size={20} /> : <AiOutlinePlus size={20} />;
};

/**
 * Interface for AccordionIcon component props
 *
 * @interface AccordionIconProps
 * @property {number} index - The index of the accordion.
 * @property {number[] | undefined} activeIndexes - An array of active indexes.
 */
interface AccordionIconProps {
    index: number;
    activeIndexes: number[] | undefined;
}


