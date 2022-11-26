import {motion} from "framer-motion";
import {Feature} from "../models";
import {Image} from "./Image";

interface FeatureCardProps {
    feature: Feature,
    className?: string
}


export const FeatureCard = (props: FeatureCardProps) => {
    return (
            <div className={`flex gap-8 py-12 ${props.className}`}>
                <div className={"w-1/2 flex flex-col gap-2"}>
                    <h4 className="font-medium">{props.feature.title}</h4>
                    <p className="text-gray-500">{props.feature.description}</p>
                </div>
                <div className={"w-1/2 h-48 overflow-hidden rounded-lg"}>
                    <Image src={props.feature.image}/>
                </div>
            </div>
    )
};