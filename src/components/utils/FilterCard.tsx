import {ChangeEvent} from "react"

interface Option {
    id: number,
    name: string,
    isChecked: boolean
}

interface FilterCardProps {
    title: string,
    options: Array<Option>,
    updateFilters: Function,
    className?: string
}

export const FilterCard = (props: FilterCardProps) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            props.updateFilters(id, 'add');
        } else {
            props.updateFilters(id, 'remove');
        }
    }

    return (
        <div className={`py-4 min-h-fit border-t border-gray-200 ${props.className}`}>
            <h3 className="font-medium">{props.title}</h3>
            <ul className="py-3 font-medium text-gray-900">
                {props.options.map((option) => (
                    <li key={option.id}>
                        <div className="flex items-center">
                            <input
                                name={`${option.id}`}
                                defaultValue={option.name}
                                type="checkbox"
                                defaultChecked={option.isChecked}
                                className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                                onChange={(e) => handleInputChange(e, option.id)}
                            />
                            <label
                                htmlFor={`${option.id}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                                {option.name}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}