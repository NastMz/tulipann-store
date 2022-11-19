import {HiFilter, MdKeyboardArrowDown} from "react-icons/all";
import {forwardRef, useEffect, useState} from "react";

interface Option {
    id: number,
    name: string,
    isChecked: boolean
}

interface Filter {
    title: string,
    options: Option[]
}

interface FilterBarProps {
    filters: Array<Filter>,
    filtersCount: number,
    clearFilters: Function,
    toggleMenuFilter: Function,
    toggleSortMenu: Function
    className?: string
}

export const FilterBar = forwardRef((props: FilterBarProps, ref: any) => {

    const {filterBarRef, sortBtnRef} = ref.current;

    const [isHover, setIsHover] = useState<boolean>(false);

    useEffect(() => {
        sortBtnRef.current?.addEventListener("mouseenter", () => setIsHover(true));
        sortBtnRef.current?.addEventListener("mouseleave", () => setIsHover(false));
    }, []);

    return (
        <div
            className={`h-14 w-full flex justify-between items-center border-t-2 border-b-2 border-gray-100 px-4 md:px-6 py-4 mb-12 ${props.className}`}>
            <div className={"flex gap-6 items-center font-medium text-sm md:text-base"}>
                <div
                    className={"flex gap-2 items-center justify-center cursor-pointer h-full"}
                    onClick={() => props.toggleMenuFilter()}
                    ref={filterBarRef}
                >
                    <HiFilter/>
                    <span>{props.filtersCount} Filtros</span>
                </div>
                <span className={"text-gray-400 cursor-pointer h-full"} onClick={() => props.clearFilters()}>
                        Limpiar filtros
                    </span>
            </div>
            <div
                className={"relative flex items-center justify-center cursor-pointer text-sm md:text-base h-full"}
                ref={sortBtnRef}
                onClick={() => props.toggleSortMenu()}
            >
                <span className={"font-medium"}>Ordenar por</span>
                <MdKeyboardArrowDown className={`${isHover ? "text-gray-400" : "text-gray-300"}`} size={20}/>
            </div>
        </div>
    )
});