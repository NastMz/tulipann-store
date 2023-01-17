import { Link } from "react-router-dom";
import { useState } from "react";
import { Image } from "../../models/interfaces";
import { OptimizedImage } from "../common/OptimizedImage";

/**
 * Interface for CategoryCard component props
 *
 * @interface CategoryCardProps
 * @property {Image} img - Image to display in the card.
 * @property {string} title - Title to display in the card.
 * @property {string} to - Link to navigate to when the card is clicked.
 * @property {string} [className] - Optional class for the main div element of the component.
 */
interface CategoryCardProps {
    img: Image,
    title: string,
    to: string,
    className?: string
}

/**
 * CategoryCard component.
 *
 * This component displays a card with an image and a title that navigates to a specified link when clicked.
 * The card will also have a hover effect.
 *
 * @param {CategoryCardProps} props - Properties for the CategoryCard component.
 * @returns {JSX.Element} A React element representing the CategoryCard component.
 */
export const CategoryCard = (props: CategoryCardProps): JSX.Element => {
    // State to track whether the mouse is hovering over the card
    const [isHover, setIsHover] = useState(false);

    return (
        <Link
            // Link to navigate to when the card is clicked
            to={props.to}
            // Add hover effect to card
            className={`overflow-hidden rounded-xl relative ${props.className}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Image component */}
            <CategoryCardImage img={props.img} isHover={isHover} />
            {/* Text component */}
            <CategoryCardText title={props.title} />
        </Link>
    );
};

/**
 * CategoryCardImage component.
 *
 * This component displays an image in a card.
 * The image will have a hover effect if the mouse is hovering over the card.
 *
 * @param {CategoryCardImageProps} props - Properties for the CategoryCardImage component.
 * @returns {JSX.Element} A React element representing the CategoryCardImage component.
 */
const CategoryCardImage = (props: CategoryCardImageProps): JSX.Element => {
    return (
        <div className={"h-full w-full"}>
            <OptimizedImage
                image={props.img}
                className={`${props.isHover ? 'scale-110' : ''}`}
            />
        </div>
    );
};

/**
 * Interface for CategoryCardImage component props
 *
 * @interface CategoryCardImageProps
 * @property {Image} img - Image to display in the card.
 * @property {boolean} isHover - Whether the mouse is hovering over the card.
 */
interface CategoryCardImageProps {
    img: Image,
    isHover: boolean
}

/**
* CategoryCardText component.
*
* This component displays text in a card.
*
* @param {CategoryCardTextProps} props - Properties for the CategoryCardText component.
* @returns {JSX.Element} A React element representing the CategoryCardText component.
*/
const CategoryCardText = (props: CategoryCardTextProps): JSX.Element => {
    return (
            <div
                className={"absolute h-full w-full bg-black bg-opacity-20 top-0 text-white flex flex-col justify-end items-start p-5"}
                >
                <h1 className={"text-sm font-bold"}>{props.title}</h1>
                <span className={"text-sm"}>Comprar ahora</span>
            </div>
            );
};

/**
 * Interface for CategoryCardText component props
 *
 * @interface CategoryCardTextProps
 * @property {string} title - Title to display in the card.
 */
interface CategoryCardTextProps {
    title: string
}
