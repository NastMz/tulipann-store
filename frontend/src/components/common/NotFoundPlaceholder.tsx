import {AiOutlineWarning} from "react-icons/ai";

/**
 * Interface for the props of the NotFoundPlaceholder component.
 *
 * @interface ForbiddenPlaceholderProps
 * @property {string} message - The message to display.
 */
interface ForbiddenPlaceholderProps {
    message: string
}

/**
 * NotFoundPlaceholder component.
 *
 * This component is responsible for displaying a placeholder when a resource is not found.
 *
 * @param {ForbiddenPlaceholderProps} props - Props for the component.
 * @returns {JSX.Element} NotFoundPlaceholder component.
 */
export const NotFoundPlaceholder = (props: ForbiddenPlaceholderProps) => {
    return (
        <div className={"flex flex-col items-center justify-center gap-6 text-gray-200 h-80"}>
            <AiOutlineWarning size={90}/>
            <span className={"text-2xl"}>!Oh vaya!</span>
            <span className={"text-2xl"}>{props.message}</span>
        </div>
    )
}