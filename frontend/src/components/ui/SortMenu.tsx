import {forwardRef, Ref} from "react";
import {Product} from "../../models/interfaces";

interface Option {
    id: number,
    name: string,
    property: keyof Product,
    order: "ASC" | "DESC",
}

interface SortMenuProps {
    options: Option[]
    sortItemsBy: (option: Option) => void,
    activeSortOption: Option,
    className?: string
}

export const SortMenu = forwardRef((props: SortMenuProps, ref: Ref<any>) => {
    return (
        <div
            className={`${props.className}`}
            ref={ref}
        >
            <ul>
                {
                    props.options.map((option: Option) => (
                        <li
                            className={`${option.id === props.activeSortOption.id ? 'text-black' : 'text-gray-400'} hover:bg-gray-200 cursor-pointer py-2 px-4`}
                            onClick={() => props.sortItemsBy(option)}
                            key={option.id}
                        >
                            {option.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
});