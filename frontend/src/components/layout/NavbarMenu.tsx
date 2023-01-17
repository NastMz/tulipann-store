import { NavbarMenuCard } from './NavbarMenuCard';
import { Image } from '../../models/interfaces';

/**
 * Interface for a navigation item in the NavbarMenu component.
 *
 * @interface NavItem
 * @property {Image} img - Image to display for the navigation item.
 * @property {string} title - Title of the navigation item.
 * @property {string} subtitle - Subtitle of the navigation item.
 * @property {string} to - URL to navigate to when the item is clicked.
 */
interface NavItem {
    img: Image;
    title: string;
    subtitle: string;
    to: string;
}

/**
 * Interface for the NavbarMenu component props.
 *
 * @interface NavbarMenuProps
 * @property {NavItem[]} [items] - List of navigation items to display in the menu.
 * @property {Function} closeMenu - Function to close the menu.
 * @property {string} [className] - Class name(s) to apply to the root element.
 */
interface NavbarMenuProps {
    items?: NavItem[];
    closeMenu: () => void;
    className?: string;
}

/**
 * NavbarMenu component.
 *
 * This component displays a list of navigation items as cards.
 *
 * @param {NavbarMenuProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const NavbarMenu = (props: NavbarMenuProps): JSX.Element => {
    return (
        <div
            className={`grid lg:grid-cols-4 gap-12 w-full px-8 py-6 ${props.className}`}
        >
            {props.items?.map((item) => (
                <NavbarMenuCard
                    img={item.img}
                    title={item.title}
                    subtitle={item.subtitle}
                    to={item.to}
                    key={item.title}
                    closeMenu={props.closeMenu}
                />
            ))}
        </div>
    );
};
