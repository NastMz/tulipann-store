import {ChangeEvent} from "react"
import {AccordionLayout} from "./AccordionLayout";

interface Option {
    id: number,
    name: string,
    isChecked: boolean
}

interface FilterCardProps {
    title: string,
    options: Array<Option>,
    updateFilters: Function,
    activeForm: number,
    setActiveForm: Function,
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
        <AccordionLayout
            title={props.title}
            index={0}
            activeIndex={props.activeForm}
            setActiveIndex={props.setActiveForm}
            className={`cursor-pointer ${props.className}`}
            showIcon={true}
        >
            {props.options.map((option) => (
                <div key={option.id} className={'px-2'}>
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
                            className="ml-2 min-w-0 flex-1 text-gray-500 truncate"
                        >
                            {option.name}
                        </label>
                    </div>
                </div>
            ))}
        </AccordionLayout>
    )
}