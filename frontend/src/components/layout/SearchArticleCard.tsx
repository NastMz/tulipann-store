import {Link} from "react-router-dom";
import {OptimizedImage} from "../common";
import {Image} from "../../models/interfaces";
import {routes} from "../../config/routes";

/**
 * Interface for article props
 *
 * @interface ArticleCardProps
 * @property {string} id - ID of the article.
 * @property {string} name - Name of the article.
 * @property {Image} image - Image of the article.
 * @property {string} tag - Tag for the article.
 * @property {string} summary - Summary of the article.
 */
interface ArticleCardProps {
    id: string;
    name: string;
    image: Image;
    tags: string[];
    summary: string;
}

/**
 * Interface for SearchCardProductProps component props
 *
 * @interface SearchArticleCardProps
 * @property {ProductCardProps} item - Article to display in the card.
 * @property {Function} closeSearchBar - Function to close the search bar.
 * @property {string} [className] - Class name for the component (optional).
 */
interface SearchArticleCardProps {
    item: ArticleCardProps;
    closeSearchBar: () => void;
    className?: string;
}

/**
 * SearchArticleCard component.
 *
 * This component displays a card for an article in the search results.
 *
 * @param {SearchArticleCardProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const SearchArticleCard = (props: SearchArticleCardProps) => {

    return (
        <Link
            to={`${routes.discover.path}/${props.item.id}`}
            className={`w-full h-fit ${props.className}`}
            onClick={() => props.closeSearchBar()}
        >
            <div className={`relative grid grid-cols-3 gap-4 p-4 h-32 w-full border-t border-b border-gray-100`}>
                <div className={"h-full w-full overflow-hidden rounded-lg"}>
                    <OptimizedImage image={props.item.image}/>
                </div>
                <div className={"col-span-2 flex flex-col gap-1 w-full"}>
                    <div className={"flex flex-col items-start gap-1 w-full"}>
                        <span className={"text-sm text-red-500"}>{props.item.tags.join(', ')}</span>
                        <p className={"truncate text-lg w-full text-black"}>{props.item.name}</p>
                        <p className={"truncate text-sm text-gray-400 w-full"}>{props.item.summary}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}