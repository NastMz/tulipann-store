import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import {FaUserCircle} from "react-icons/fa";
import {OptimizedImage} from '../common';
import {Image} from "../../models/interfaces";

/**
 * Interface for DiscoverCard component props
 *
 * @interface DiscoverCardProps
 * @property {number} id - ID of the item to link to.
 * @property {string} title - Title of the item.
 * @property {string} summary - Summary of the item.
 * @property {Image} banner - Image of the item.
 * @property {string} date - Date of the item.
 * @property {string[]} tags - Tags of the item.
 * @property {string} author - Author of the item.
 * @property {string} [className] - Classname for the card.
 */
interface DiscoverCardProps {
    id: string;
    title: string;
    summary: string;
    banner: Image;
    date: string;
    tags: string[];
    author: string;
    className?: string;
}

/**
* DiscoverCard component.
*
* This component displays a card with the given item information and link to the item page.
*
* @param {DiscoverCardProps} props - Props for the component.
* @returns {ReactNode} The rendered component.
*/
export const DiscoverCard = (props: DiscoverCardProps) => {
    return (
        <Link
            to={`${routes.discover.path}/${props.id}`}
            className={`h-full w-full overflow-hidden rounded-lg flex flex-col shadow-md ${props.className} hover:scale-110`}
        >
            <div className={"h-1/3 w-full"}>
                <OptimizedImage image={props.banner}/>
            </div>
            <div className={"h-full px-6 pt-6 pb-4 flex flex-col justify-between"}>
                <div className={"flex-grow flex flex-col gap-2"}>
                    <div className={"flex gap-2"}>
                        {
                            props.tags.map((tag) => (
                                <span className={"text-sm text-red-500"}>
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                    <h1 className={"font-bold mb-1 text-lg"}>{props.title}</h1>
                    <p className={'line-clamp-3'}>{props.summary}</p>
                </div>
                <div className={"flex-shrink flex gap-2 items-center mt-6"}>
                    <FaUserCircle
                        size={30}
                        color={'text-gray-400'}
                    />
                    <div className={"flex flex-col text-sm"}>
                        <span className={"font-medium"}>{props.author}</span>
                        <span className={"text-gray-400"}>{props.date}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}