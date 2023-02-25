import {OptimizedImage} from "../common";
import {NewFeature} from "../../models/interfaces";

export interface FeatureCardProps {
    feature: NewFeature;
}

export const FeatureCard = ({feature}: FeatureCardProps) => {

    const image = () => {
        if (feature.image.src.endsWith('.webp')) {
            return feature.image;
        } else {
            return {
                ...feature.image,
                src: `data:image/webp;base64,${feature.image.src}`
            }
        }
    }

    return (
        <div className={`h-full w-full flex flex-col-reverse lg:flex-row gap-0 lg:gap-4  aspect-[16/9] text-sm`}>
            <div className={"w-full flex flex-col gap-2 p-2"}>
                <div className={'text-red-500 font-bold'}>
                    {feature.featureName}
                </div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-gray-500 whitespace-pre-line overflow-y-auto">{feature.description}</p>
            </div>
            <div className={"w-full h-full aspect-[16/9] overflow-hidden rounded-xl"}>
                <OptimizedImage
                    image={image()}
                    objectFit={false}
                />
            </div>
        </div>
    )
}