import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Blurhash} from "react-blurhash";
import {useState} from "react";
import {Image} from "../../models/interfaces";

/**

 Interface for the props of the OptimizedImage component.
 @interface OptimizedImageProps
 @property {Image} image - Image to display.
 @property {boolean} [objectFit=false] - Whether to apply the object-fit property to the image.
 @property {string} [className] - Class names to apply to the image.
 */
interface OptimizedImageProps {
    image: Image,
    objectFit?: boolean,
    className?: string,
}

/**
 * OptimizedImage component.
 *
 * This component displays an optimized image using the Blurhash library to generate a low-resolution placeholder
 * until the image finishes loading.
 *
 * @param {OptimizedImageProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const OptimizedImage = (props: OptimizedImageProps) => {
    const [isLoaded, setLoaded] = useState(false);
    const [isLoadStarted, setLoadStarted] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
    };

    const handleLoadStarted = () => {
        setLoadStarted(true);
    };

    return (
        <div className={`h-full w-full relative ${props.className}`}>
            {!isLoaded && isLoadStarted && (
                <Blurhash
                    hash={props.image.hash}
                    width={'100%'}
                    height={'100%'}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className={`h-full w-full absolute z-20 inset-0 ${props.objectFit ? 'object-contain' : 'object-cover'}`}
                />
            )}
            <LazyLoadImage
                key={props.image.src}
                src={props.image.src}
                alt={props.image.src}
                onLoad={handleLoad}
                beforeLoad={handleLoadStarted}
                width={'100%'}
                height={'100%'}
                className={`-z-10 h-full w-full ${props.objectFit ?? 'object-cover'}`}
            />
        </div>
    );
};
