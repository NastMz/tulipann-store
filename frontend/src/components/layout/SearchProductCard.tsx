import {Link} from "react-router-dom";
import {OptimizedImage, Stars} from "../common";
import {Image} from "../../models/interfaces";
import {routes} from "../../config/routes";

/**
 * Interface for product props
 *
 * @interface ProductCard
 * @property {string} id - ID of the product.
 * @property {string} name - Name of the product.
 * @property {Image} image - Image of the product.
 * @property {string} tag - Tag for the product.
 * @property {number} rate - Rating of the product.
 */
interface ProductCardProps {
    id: string;
    name: string;
    image: Image;
    description: string;
    rate: number;
}

/**
 * Interface for SearchCardProductProps component props
 *
 * @interface SearchProductCardProps
 * @property {ProductCardProps} item - Product to display in the card.
 * @property {Function} closeSearchBar - Function to close the search bar.
 * @property {string} [className] - Class name for the component (optional).
 */
interface SearchProductCardProps {
    item: ProductCardProps;
    closeSearchBar: () => void;
    className?: string;
}

/**
 * SearchProductCard component.
 *
 * This component displays a card for a product in the search results.
 *
 * @param {SearchProductCardProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const SearchProductCard = (props: SearchProductCardProps) => {

    return (
        <Link
            to={`${routes.product.path}/${props.item.id}`}
            className={`w-full h-fit ${props.className}`}
            onClick={() => props.closeSearchBar()}
        >
            <div className={`relative grid grid-cols-3 gap-4 p-4 w-full h-32 border-t border-b border-gray-100`}>
                <div className={"h-full w-full overflow-hidden rounded-lg"}>
                    <OptimizedImage image={props.item.image}/>
                </div>
                <div className={"col-span-2 flex flex-col gap-1 w-full"}>
                    <div className={"flex flex-col items-start gap-1 w-full"}>
                        <span className={"text-sm text-red-500"}>Producto</span>
                        <p className={"truncate text-lg w-full text-black"}>{props.item.name}</p>
                        <Stars rate={props.item.rate} size={15}/>
                        <p className={"truncate text-sm text-gray-400 w-full"}>{props.item.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}