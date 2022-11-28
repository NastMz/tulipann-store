import {useState} from "react";
import {OptimizedImage} from "./OptimizedImage";
import {Image} from "../models";

interface ProductImageSelectorProps {
    images: Array<Image>,
    className?: string
}

export const ProductImageSelector = (props: ProductImageSelectorProps) => {
    const [activeImage, setActiveImage] = useState<Image>(props.images[0]);
    return (
        <div className={`flex flex-col gap-4 ${props.className}`}>
            <div className={"overflow-hidden rounded-lg flex-grow"}>
                <OptimizedImage image={activeImage}/>
            </div>
            <div className={"flex gap-2 overflow-x-auto h-1/5"}>
                {
                    props.images.map((image) => (
                        <div
                            className={`overflow-hidden h-full rounded-lg ${activeImage === image ? 'border-2 border-red-500' : ''}`}
                            onClick={() => setActiveImage(image)}
                            key={Math.random()}
                        >
                            <OptimizedImage image={image}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}