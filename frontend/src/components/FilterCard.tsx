import {ChangeEvent} from "react"
import {AccordionLayout} from "./AccordionLayout";

interface Option {
    id: number,
    name: string,
    isChecked: boolean
}

interface FilterCardProps {
    index: number,
    title: string,
    options: Array<Option>,
    updateFilters: Function,
    activeForm: number,
    setActiveForm: Function,
    className?: string,
    activeIndexes: Array<number>,
    setActiveIndexes: Function
}

export const FilterCard = (props: FilterCardProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, filter: Option) => {
        if (e.target.checked) {
            props.updateFilters(filter, 'add');
        } else {
            props.updateFilters(filter, 'remove');

        }
    }

    return (
        <AccordionLayout
            title={props.title}
            index={props.index}
            activeIndex={props.activeForm}
            setActiveIndex={props.setActiveForm}
            className={`cursor-pointer ${props.className}`}
            showIcon={true}
            independentCards={{activeIndexes: props.activeIndexes, setActiveIndexes: props.setActiveIndexes}}
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
                            onChange={(e) => handleInputChange(e, option)}
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