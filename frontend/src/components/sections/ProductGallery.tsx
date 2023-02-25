import {useState} from "react";
import {OptimizedImage} from "../common";
import {Image} from "../../models/interfaces";
import {AnimatePresence, motion} from "framer-motion";

/**
 * Interface for the ProductGallery component props.
 *
 * @interface ProductGalleryProps
 * @property {Image[]} images - The images to display in the gallery.
 * @property {string} [className] - The class name to apply to the gallery.
 */
interface ProductGalleryProps {
    images: Array<Image>,
    className?: string
}

/**
 * The ProductGallery component.
 *
 * This component displays a gallery of images for a product.
 *
 * @param {ProductGalleryProps} props - The props for the component.
 * @returns {JSX.Element} - The ProductGallery component.
 */
export const ProductGallery = (props: ProductGalleryProps) => {
    const [activeImage, setActiveImage] = useState<Image>(props.images[0]);
    return (
        <div className={`w-full flex flex-col gap-4 ${props.className}`}>
            <div className={"overflow-hidden rounded-xl h-full w-full"}>
                <AnimatePresence initial={false} mode={'wait'}>
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
            <div className={"flex gap-2 overflow-x-auto h-[80px] w-full"}>
                {
                    props.images.map((image) => (
                        <div
                            className={`overflow-hidden w-[100px] h-full rounded-lg ${activeImage === image ? 'border-2 border-red-500' : ''}`}
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