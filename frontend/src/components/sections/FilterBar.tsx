import {motion} from "framer-motion";
import {forwardRef, useEffect, useState} from "react";
import {HiFilter} from "react-icons/hi";
import {MdKeyboardArrowDown} from "react-icons/md";

/**
 * Interface for FilterBar component props.
 *
 * @interface FilterBarProps
 * @property {number} filtersCount - The number of filters applied.
 * @property {function} clearFilters - Function to clear applied filters.
 * @property {function} toggleMenuFilter - Function to toggle the filter menu.
 * @property {function} toggleSortMenu - Function to toggle the sort menu.
 * @property {function} sortMenuIsOpen - Whether the sort menu is open.
 * @property {string} [className] - Class name for the component.
 */
interface FilterBarProps {
    filtersCount: number;
    clearFilters: () => void;
    toggleMenuFilter: () => void;
    toggleSortMenu: () => void;
    sortMenuIsOpen: boolean;
    className?: string;
}

/**
 * FilterBar component.
 *
 * This component displays a bar with filters and sorting options.
 *
 * @param {FilterBarProps} props - Props for the component.
 * @param {Object} ref - Ref object for the component.
 * @returns {ReactNode} The rendered component.
 */
export const FilterBar = forwardRef((props: FilterBarProps, ref: any) => {
    const {filterBarRef, sortBtnRef} = ref.current;

    // State to track if the mouse is hovering over the sort button
    const [isHover, setIsHover] = useState<boolean>(false);

    // Use effect to add mouse enter and mouse leave event listeners to the sort button
    useEffect(() => {
        sortBtnRef.current?.addEventListener("mouseenter", () => setIsHover(true));
        sortBtnRef.current?.addEventListener("mouseleave", () => setIsHover(false));
    }, []);

    return (
        <div
            className={`h-14 w-full flex justify-between items-center border-t-2 border-b-2 border-gray-100 px-4 md:px-6 mb-12 ${props.className}`}
        >
            <div className={"flex gap-6 items-center font-medium text-sm md:text-base h-full"}>
                <div
                    className={"flex gap-2 items-center justify-center cursor-pointer h-full py-4"}
                    onClick={() => props.toggleMenuFilter()}
                    ref={filterBarRef}
                >
                    <HiFilter/>
                    <span>{props.filtersCount} Filtros</span>
                </div>
                <span
                    className={"text-gray-400 cursor-pointer h-full py-4"}
                    onClick={() => props.clearFilters()}
                >
                        Limpiar filtros
                    </span>
            </div>
            <div
                className={
                    "relative flex items-center justify-center cursor-pointer text-sm md:text-base h-full py-4"
                }
                ref={sortBtnRef}
                onClick={() => props.toggleSortMenu()}
            >
                <span className={"font-medium"}>Ordenar por</span>
                <motion.div
                    animate={{rotate: props.sortMenuIsOpen ? 180 : 0}}
                    exit={{rotate: props.sortMenuIsOpen ? 180 : 0}}
                >
                    <MdKeyboardArrowDown
                        className={`${isHover ? "text-gray-400" : "text-gray-300"}`}
                        size={20}
                    />
                </motion.div>

            </div>
        </div>
    );
});
