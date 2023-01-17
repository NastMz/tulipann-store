import { Link } from 'react-router-dom';
import { useState } from 'react';
import { OptimizedImage } from '../common/OptimizedImage';
import { Image } from '../../models/interfaces';

/**
 * Interface for the NavbarMenuCard component props.
 *
 * @interface NavCardProps
 * @property {Image} img - Image to display in the card.
 * @property {string} title - Title of the card.
 * @property {string} subtitle - Subtitle of the card.
 * @property {string} to - URL to navigate to when the card is clicked.
 * @property {Function} closeMenu - Function to close the navbar menu.
 * @property {string} [className] - Class name(s) to apply to the root element.
 */
interface NavCardProps {
    img: Image;
    title: string;
    subtitle: string;
    to: string;
    closeMenu: () => void;
    className?: string;
}

/**
 * NavbarMenuCard component.
 *
 * This component displays a card with an image, title, and subtitle, and allows the user to navigate
 * to a specified URL when clicked.
 *
 * @param {NavCardProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const NavbarMenuCard = (props: NavCardProps): JSX.Element => {
    const [isHover, setIsHover] = useState(false);

    return (
        <Link
            to={props.to}
            className={`flex flex-col gap-2 h-full w-full ${props.className}`}
            onMouseEnter={(): void => setIsHover(true)}
            onMouseLeave={(): void => setIsHover(false)}
            onClick={()=>props.closeMenu()}
        >
            <div className="h-52 w-full overflow-hidden rounded-xl">
                <OptimizedImage
                    image={props.img}
                    className={` ${isHover ? 'scale-110' : ''}`}
                />
            </div>
            <div className="">
                <h1
                    className={`text-sm font-bold ${
                        isHover ? 'text-red-500' : 'text-black'
                    }`}
                >
                    {props.title}
                </h1>
                <span
                    className={`text-sm ${isHover ? 'text-red-300' : 'text-gray-500'}`}
                >
          {props.subtitle}
        </span>
            </div>
        </Link>
    );
};
