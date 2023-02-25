import {Feature, ProductSpecs} from "../../models/interfaces";
import {useRef, useState} from "react";
import {ProductFeatureCard} from "./ProductFeatureCard";
import {AnimatePresence, motion} from "framer-motion";


/**
 * Interface for the ProductFeatures component props.
 *
 * @interface ProductFeaturesProps
 * @property {ProductSpecs} productSpecs - The product specs to display.
 * @property {string} [className] - The class name to apply to the component.
 */
interface ProductFeaturesProps {
    specs: ProductSpecs,
    className?: string
}

/**
 * ProductFeatures component.
 *
 * This component displays the product features.
 *
 * @param {ProductFeaturesProps} props - The component props.
 * @returns {JSX.Element} - The ProductFeatures component.
 */
export const ProductFeatures = (props: ProductFeaturesProps) => {

    // Refs used to control the info cards interaction
    const featuresOptionsRef = useRef<any>(null);

    // State for know the actual selected option
    const [featureOption, setFeatureOption] = useState<Feature>(props.specs.options[0]);

    // Function used to show the feature card when an option is clicked
    const showFeatureCard = (index: number) => {
        setFeatureOption(props.specs.options[index]);
    };

    return (
        <div className="px-12 py-0 lg:p-12 overflow-hidden h-fit">
            <div className="flex flex-col gap-4 mb-6">
                <h2 className={"text-2xl font-bold"}>Especificaciones Tecnicas</h2>
                <p className={"text-gray-500"}>{props.specs.summary}</p>
            </div>
            <div className={"border-b border-gray-100 w-full flex lg:gap-8 md:gap-2 items-center pb-1 overflow-x-auto"}
                 ref={featuresOptionsRef}>
                {props.specs.options.map((item: Feature, index: number) => (
                    <div
                        className={`min-w-fit cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600 p-2 ${featureOption === item ? 'text-red-600 border-b-2 border-red-600' : ''}`}
                        onClick={() => showFeatureCard(index)}
                        key={item.title}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <AnimatePresence mode={'wait'}>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    key={featureOption.title}
                    className={'h-[500px] lg:h-80 pt-8'}
                >
                    <ProductFeatureCard
                        feature={featureOption}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}