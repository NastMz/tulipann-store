import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Blurhash} from "react-blurhash";
import {useState} from "react";
import {Image} from "../models";

interface OptimizedImageProps {
    image: Image,
    objectFit?: boolean
    className?: string,
}

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
                    className={`h-full w-full absolute z-20 top-0 left-0 ${props.objectFit ?? 'object-cover'}`}
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
    )
}