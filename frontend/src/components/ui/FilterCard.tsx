import { ChangeEvent } from 'react';
import { AccordionLayout } from '../common/AccordionLayout';

/**
 * Interface for Option object.
 *
 * @interface Option
 * @property {string} id - The unique identifier of the option.
 * @property {string} name - The name of the option.
 * @property {boolean} isChecked - Whether the option is currently selected.
 */
interface Option {
    id: string;
    name: string;
    isChecked: boolean;
}

/**
 * Interface for FilterCard component props.
 *
 * @interface FilterCardProps
 * @property {number} index - The index of the FilterCard in the parent component.
 * @property {string} title - The title of the accordion section.
 * @property {Option[]} options - The list of options to display in the accordion section.
 * @property {(filter: Option, action: 'add' | 'remove') => void} updateFilters - Function to update the filters in the parent component.
 * @property {number} activeForm - The index of the currently active accordion section.
 * @property {(index: number) => void} setActiveForm - Function to set the active accordion section.
 * @property {string} [className] - Optional class name to add to the component.
 * @property {number[]} activeIndexes - The indexes of the currently active independent cards.
 * @property {(indexes: number[]) => void} setActiveIndexes - Function to set the active independent cards.
 */
interface FilterCardProps {
    index: number;
    title: string;
    options: Option[];
    updateFilters: (filter: Option, action: 'add' | 'remove') => void;
    activeForm: number;
    setActiveForm: (index: number) => void;
    className?: string;
    activeIndexes: number[];
    setActiveIndexes: (indexes: number[]) => void;
}

/**
 * FilterCard component.
 *
 * This component displays a list of options in an accordion layout, with checkboxes to allow the user to select the desired options.
 * The component also updates the filters in the parent component when an option is selected or unselected.
 *
 * @param {FilterCardProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const FilterCard = (props: FilterCardProps) => {
    /**
     * Handles the change event of an option's checkbox.
     *
     * @param {ChangeEvent<HTMLInputElement>} e - The change event.
     * @param {Option} filter - The option that was selected or unselected.
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, filter: Option) => {
        if (e.target.checked) {
            props.updateFilters(filter, 'add');
        } else {
            props.updateFilters(filter, 'remove');
        }
    };

    return (
        <AccordionLayout
            title={props.title}
            index={props.index}
            activeIndex={props.activeForm}
            setActiveIndex={props.setActiveForm}
            className={`${props.className || ''}`}
            showIcon
            independentCards={{ activeIndexes: props.activeIndexes, setActiveIndexes: props.setActiveIndexes }}
        >
            {props.options.map((option) => (
                <div key={option.id} className="px-2">
                    <div className="flex items-center">
                        <input
                            name={`${option.id}`}
                            defaultValue={option.name}
                            type="checkbox"
                            defaultChecked={option.isChecked}
                            className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500 cursor-pointer"
                            onChange={(e) => handleInputChange(e, option)}
                        />
                        <label htmlFor={`${option.id}`} className="ml-2 min-w-0 flex-1 text-gray-500 truncate">
                            {option.name}
                        </label>
                    </div>
                </div>
            ))}
        </AccordionLayout>
    );
};
