import {FilterCard} from "./FilterCard";
import {forwardRef, Ref, useState} from "react";
import {AiOutlineClose} from "react-icons/all";
import {AnimatePresence, motion} from "framer-motion";

interface Option {
    id: number,
    name: string,
    isChecked: boolean
}

interface Filter {
    title: string,
    options: Option[]
}

interface FilterMenuProps {
    filters: Array<Filter>
    updateFilters: Function,
    isActive: boolean,
    setActive: Function
    className?: string
}

export const FilterMenuMobile = forwardRef((props: FilterMenuProps, ref: Ref<any>) => {

    // Form interaction
    const [activeForm, setActiveForm] = useState<number>(0);

    const [activeIndexes, setActiveIndexes] = useState<Array<number>>([0, 1]);

    const setActiveIndex = (index: number) => {
        setActiveForm(index);
    }

    return (
        <div
            className={`fixed inset-0 h-screen w-full z-50 flex justify-center items-center ${props.isActive ? '' : 'pointer-events-none'}`}
        >
            <div
                className={`fixed inset-0 bg-black h-screen  w-full ${props.isActive ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
                onClick={() => props.setActive(false)}
            />
            <AnimatePresence>
                {
                    props.isActive && (
                        <motion.div
                            initial={{width: 0}}
                            animate={{width: '85%'}}
                            exit={{width: 0}}
                            className={`h-screen text-black fixed z-10 left-0 top-0 bottom-0 transform origin-left bg-white overflow-hidden text-black pb-12`}
                        >
                            <div className={'w-full px-4 pt-4 pb-3 flex justify-between items-center'}>
                                <AiOutlineClose
                                    size={25}
                                    className={"cursor-pointer text-gray-400 hover:text-red-500"}
                                    onClick={() => props.setActive(false)}
                                />
                            </div>
                            <form
                                className={`h-full min-w-fit bg-white px-8 ${props.className}`}
                                ref={ref}
                            >
                                {
                                    props.filters.map((filter, index) => (
                                        filter.options.length > 0 && <FilterCard
                                            index={index}
                                            title={filter.title}
                                            options={filter.options}
                                            key={filter.title.concat(String(filter.options.length), 'M')}
                                            updateFilters={props.updateFilters}
                                            activeForm={activeForm}
                                            setActiveForm={setActiveIndex}
                                            className={"px-2"}
                                            activeIndexes={activeIndexes}
                                            setActiveIndexes={setActiveIndexes}
                                        />
                                    ))
                                }
                            </form>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
});