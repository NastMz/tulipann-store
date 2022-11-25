import {useState} from "react";

interface ProductImageSelectorProps {
    images: string[],
    className?: string
}

export const ProductImageSelector = (props: ProductImageSelectorProps) => {
    const [activeImage, setActiveImage] = useState<string>(props.images[0]);
    return (
        <div className={`flex flex-col gap-4 ${props.className}`}>
            <div className={"overflow-hidden rounded-lg flex-grow"}>
                <img
                    src={activeImage}
                    alt={activeImage}
                    className={`h-full w-full object-cover`}
                />
            </div>
            <div className={"flex gap-2 overflow-x-auto h-1/5"}>
                {
                    props.images.map((image) => (
                        <div
                            className={`overflow-hidden h-full rounded-lg ${activeImage === image ? 'border-2 border-red-500' : ''}`}
                            onClick={() => setActiveImage(image)}
                        >
                            <img src={image} alt={image} className={`h-full w-full object-cover`}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}