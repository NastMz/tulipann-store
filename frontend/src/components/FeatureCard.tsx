import {Feature} from "../models";
import {OptimizedImage} from "./OptimizedImage";

interface FeatureCardProps {
    feature: Feature,
    className?: string
}


export const FeatureCard = (props: FeatureCardProps) => {
    return (
        <div className={`h-full w-full flex gap-8 ${props.className}`}>
            <div className={"w-1/2 flex flex-col gap-2"}>
                <h4 className="font-medium">{props.feature.title}</h4>
                <p className="text-gray-500">{props.feature.description}</p>
            </div>
            <div className={"w-1/2 h-full overflow-hidden rounded-xl"}>
                <OptimizedImage image={props.feature.image}/>
            </div>
        </div>
    )
};