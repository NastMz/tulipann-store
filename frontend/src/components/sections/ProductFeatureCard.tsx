import {Feature} from "../../models/interfaces";
import {OptimizedImage} from "../common/OptimizedImage";

interface FeatureCardProps {
    feature: Feature,
    className?: string
}


export const ProductFeatureCard = (props: FeatureCardProps) => {
    return (
        <div className={`h-full w-full flex flex-col-reverse lg:flex-row gap-8 mb-12 ${props.className}`}>
            <div className={"w-full lg:w-1/2 flex flex-col gap-2 pb-2"}>
                <h4 className="font-medium">{props.feature.title}</h4>
                <p className="text-gray-500">{props.feature.description}</p>
            </div>
            <div className={"w-full lg:w-1/2 h-full overflow-hidden rounded-xl"}>
                <OptimizedImage image={props.feature.image}/>
            </div>
        </div>
    )
};