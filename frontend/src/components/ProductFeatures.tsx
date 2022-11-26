import {Feature, ProductSpecs} from "../models";
import {useRef, useState} from "react";
import {FeatureCard} from "./FeatureCard";
import {AnimatePresence} from "framer-motion";

interface ProductFeaturesProps {
    specs: ProductSpecs,
    className?: string
}

export const ProductFeatures = (props: ProductFeaturesProps) => {

    // Refs used to control the info cards interaction
    const featuresOptionsRef = useRef<any>(null);

    // State for know the actual selected option
    const [featureOption, setFeatureOption] = useState<number>(0);

    // Function used to show the feature card when an option is clicked
    const showFeatureCard = (index: number) => {
        setFeatureOption(index);
    };

    return (
        <div className="p-12 overflow-hidden h-fit">
            <div className="flex flex-col gap-4 mb-6">
                <h2 className={"text-2xl font-bold"}>Especificaciones Tecnicas</h2>
                <p className={"text-gray-500"}>{props.specs.summary}</p>
            </div>
            <div>
                <div className={"border-b border-gray-100"}>
                    <ul className={"flex lg:gap-8 md:gap-2 items-center p-0"} ref={featuresOptionsRef}>
                        {props.specs.options.map((item: Feature, index: number) => (
                            <li
                                className={`cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2 ${featureOption === index ? 'text-red-600 border-b-2 border-red-600' : ''}`}
                                onClick={() => showFeatureCard(index)}
                                key={Math.random()}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                    {
                        props.specs.options[featureOption] && (
                            <FeatureCard
                                feature={props.specs.options[featureOption]}
                            />
                        )
                    }
            </div>
        </div>
    )
}