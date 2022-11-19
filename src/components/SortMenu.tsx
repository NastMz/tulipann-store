import {forwardRef, Ref} from "react";

interface Option {
    id: number,
    name: string,
    isActive: boolean
}

interface SortMenuProps {
    options: Option[]
    sortItemsBy: Function,
    className?: string
}

export const SortMenu = forwardRef((props: SortMenuProps, ref: Ref<any>) => {
    return (
        <div
            className={`h-fit w-fit py-2 border bg-white border-gray-200 rounded-md shadow-2xl ${props.className}`}
            ref={ref}
        >
            <ul>
                {
                    props.options.map((option: Option) => (
                        <li
                            className={`${option.isActive ? 'text-black' : 'text-gray-400'} hover:bg-gray-200 cursor-pointer py-2 px-4`}
                            onClick={() => props.sortItemsBy(option.id)}
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