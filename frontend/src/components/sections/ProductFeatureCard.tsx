import {Feature} from "../../models/interfaces";
import {OptimizedImage} from "../common";


/**
 * Interface for ProductFeatureCard component props.
 *
 * @interface
 * @property {Feature} feature - Feature object.
 * @property {string} [className] - Optional class name.
 */
interface ProductFeatureCardProps {
    feature: Feature,
    className?: string
}


/**
 * ProductFeatureCard component.
 *
 * This component displays a feature card.
 *
 * @param {ProductFeatureCardProps} props - Component props.
 * @returns {JSX.Element} - Rendered component.
 */
export const ProductFeatureCard = (props: ProductFeatureCardProps) => {
    return (
        <div className={`h-full w-full flex flex-col-reverse lg:flex-row gap-8 mb-12 ${props.className}`}>
            <div className={"w-full lg:w-1/2 flex flex-col gap-2 pb-2"}>
                <h4 className="font-medium">{props.feature.title}</h4>
                <p className="text-gray-500 whitespace-pre-line">{props.feature.description}</p>
            </div>
            <div className={"w-full lg:w-1/2 h-full overflow-hidden rounded-xl"}>
                <OptimizedImage image={props.feature.image} objectFit={true}/>
            </div>
        </div>
    )
};