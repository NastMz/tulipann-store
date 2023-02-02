import {FilterCard} from "./FilterCard";
import {forwardRef, Ref, useState} from "react";

interface Option {
    id: string,
    name: string,
    isChecked: boolean
}

interface Filter {
    title: string,
    options: Option[]
}

interface FilterMenuProps {
    filters: Array<Filter>;
    updateFilters: (filter: Option, action: 'add' | 'remove') => void;
    className?: string;
}

export const FilterMenu = forwardRef((props: FilterMenuProps, ref: Ref<any>) => {

    // Form interaction
    const [activeForm, setActiveForm] = useState<number>(0);

    const [activeIndexes, setActiveIndexes] = useState<Array<number>>([0, 1]);

    const setActiveIndex = (index: number) => {
        setActiveForm(index);
    }

    return (
        <form
            className={`h-full min-w-fit w-full bg-white py-8 -mt-12 ${props.className}`}
            ref={ref}
        >
            {
                props.filters.map((filter, index) => (
                    filter.options.length > 0 && <FilterCard
                        index={index}
                        title={filter.title}
                        options={filter.options}
                        key={filter.title.concat(String(filter.options.length))}
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
    )
});