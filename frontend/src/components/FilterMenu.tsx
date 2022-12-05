import {FilterCard} from "./FilterCard";
import {forwardRef, Ref, useState} from "react";
import {AccordionLayout} from "./AccordionLayout";

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
    className?: string
}

export const FilterMenu = forwardRef((props: FilterMenuProps, ref: Ref<any>) => {

    // Form interaction
    const [activeForm, setActiveForm] = useState<number>(0);

    const setActiveIndex = (index: number) => {
        setActiveForm(index);
    }

    return (
        <form
            className={`h-full min-w-fit w-full bg-white py-8 -mt-12 ${props.className}`}
            ref={ref}
        >
            {
                props.filters.map((filter) => (
                    <FilterCard
                        title={filter.title}
                        options={filter.options}
                        key={filter.title}
                        updateFilters={props.updateFilters}
                        activeForm={activeForm}
                        setActiveForm={setActiveIndex}
                        className={"px-2"}
                    />
                ))
            }
        </form>
    )
});