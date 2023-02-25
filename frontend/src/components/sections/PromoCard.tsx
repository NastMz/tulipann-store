import {OptimizedImage} from "../common";
import {Image} from "../../models/interfaces";


/**
 * Interface for the props of the PromoCard component.
 *
 * @interface PromoCardProps
 * @property {Image} image - The image to display in the card.
 * @property {string} [className] - The class name to apply to the card.
 */
interface PromoCardProps {
    image: Image,
    className?: string
}


/**
 * PromoCard component.
 *
 * This component displays a card with an image for a promotion.
 * 
 * @param {PromoCardProps} props - The props of the component.
 * @returns {JSX.Element} - The PromoCard component.
 */
export const PromoCard = (props: PromoCardProps) => {

    return (
        <div className={`rounded-xl overflow-hidden h-full w-full ${props.className}`}>
            <OptimizedImage image={props.image}/>
        </div>
    )
}