import {FilterCard} from "./FilterCard";
import {forwardRef, Ref} from "react";

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
    return (
        <form
            className={`min-h-fit w-fit bg-white md:shadow-none shadow-2xl py-8 -mt-12 ${props.className}`}
            ref={ref}
        >
            {
                props.filters.map((filter) => (
                    <FilterCard
                        title={filter.title}
                        options={filter.options}
                        key={Math.random()}
                        updateFilters={props.updateFilters}
                        className={"px-2"}
                    />
                ))
            }
        </form>
    )
});