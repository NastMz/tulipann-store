import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from '../../models/interfaces';
import { OptimizedImage } from '../common/OptimizedImage';

/**
 * Interface for the NavbarMenuMobileCard component props.
 *
 * @interface NavbarMenuMobileCardProps
 * @property {Image} img - Image to display in the card.
 * @property {string} title - Title of the card.
 * @property {string} subtitle - Subtitle of the card.
 * @property {string} to - URL to navigate to when the card is clicked.
 * @property {Function} closeMenu - Function to call when the card is clicked to close the menu.
 * @property {string} [className] - Class name(s) to apply to the root element.
 */
interface NavbarMenuMobileCardProps {
    img: Image;
    title: string;
    subtitle: string;
    to: string;
    closeMenu: () => void;
    className?: string;
}

/**
 * NavbarMenuMobileCard component.
 *
 * This component displays a card with an image and text, which can be clicked to navigate to a specified URL.
 * The image scales up when the mouse is hovering over the card.
 *
 * @param {NavbarMenuMobileCardProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const NavbarMenuMobileCard = (
    props: NavbarMenuMobileCardProps,
): JSX.Element => {
    const [isHover, setIsHover] = useState(false);

    return (
        <Link
            to={props.to}
            className={`overflow-hidden rounded-xl relative ${props.className}`}
            onMouseEnter={(): void => setIsHover(true)}
            onMouseLeave={(): void => setIsHover(false)}
            onClick={() => props.closeMenu()}
        >
            <div className="h-full w-full absolute inset-0 z-10">
                <OptimizedImage
                    image={props.img}
                    className={`${isHover ? 'scale-110' : ''}`}
                />
            </div>
            <div
                className="absolute h-fit w-full bg-white bg-opacity-60 bottom-0 flex flex-col justify-end items-start p-5 z-50"
            >
                <h1 className="font-bold">{props.title}</h1>
                <span className="text-sm">{props.subtitle}</span>
            </div>
        </Link>
    );
};
