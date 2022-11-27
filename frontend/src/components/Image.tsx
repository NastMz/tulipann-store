import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholder from '../assets/images/placeholder.png';

interface ImageProps {
    src: string,
    objectFit?: boolean
    className?: string,
}

export const Image = (props: ImageProps) => {
  return (
      <LazyLoadImage
          src={props.src}
          alt={props.src}
          width={'100%'}
          height={'100%'}
          className={`h-full w-full ${props.objectFit ? '' : 'object-cover'} ${props.className}`}
          effect={'blur'}
          placeholderSrc={placeholder}
      />
  )
}