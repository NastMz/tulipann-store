import {useState} from "react";
import {OptimizedImage} from "./OptimizedImage";
import {Image} from "../models";
import {AnimatePresence, motion} from "framer-motion";

interface ProductImageSelectorProps {
    images: Array<Image>,
    className?: string
}

export const ProductImageSelector = (props: ProductImageSelectorProps) => {
    const [activeImage, setActiveImage] = useState<Image>(props.images[0]);
    return (
        <div className={`flex flex-col gap-4 ${props.className}`}>
            <div className={"overflow-hidden rounded-xl h-full"}>
                <AnimatePresence>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        key={activeImage.src}
                        className={'h-full w-full'}
                    >
                        <OptimizedImage image={activeImage}/>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className={"flex gap-2 overflow-x-auto h-[80px]"}>
                {
                    props.images.map((image) => (
                        <div
                            className={`overflow-hidden h-full rounded-lg ${activeImage === image ? 'border-2 border-red-500' : ''}`}
                            onClick={() => setActiveImage(image)}
                            key={image.src}
                        >
                            <OptimizedImage image={image}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}