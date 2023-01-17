import {FaUserCircle} from "react-icons/fa";
import {Commentary} from "../../models/interfaces";
import {Stars} from "../common";

/**
 * Interface for CommentaryCard component props
 *
 * @interface CommentaryCardProps
 * @property {Commentary} commentary - Commentary object to display in the card.
 * @property {string} [className] - Classname for the card.
 */
interface CommentaryCardProps {
    commentary: Commentary;
    className?: string;
}

/**
* CommentaryCard component.
*
* This component displays a card with the given commentary object and user avatar.
*
* @param {CommentaryCardProps} props - Props for the component.
* @returns {ReactNode} The rendered component.
*/
export const CommentaryCard = (props: CommentaryCardProps) => {
    return (
        <div className={`flex flex-col gap-2 p-6 mb-2 ${props.className}`}>
            <div className={"flex gap-2 items-center"}>
                <FaUserCircle
                    size={35}
                    className={"text-gray-400"}
                />
                <div>
                    <span className={"text-sm font-medium"}>{props.commentary.userName}</span>
                    <Stars rate={props.commentary.rate} size={18}/>
                </div>
            </div>
            <p className={"text-gray-500 italic"}>{props.commentary.commentary}</p>
        </div>
    )
}