import {NavCard} from "./NavCard";
import {forwardRef, Ref} from "react";

interface NavItem {
    img: string,
    title: string,
    to: string
}

interface NavbarMenuProps {
    items?: NavItem[],
    className?: string
}

export const NavbarMenu = forwardRef((props: NavbarMenuProps, ref: Ref<any>) => {
    return (
        <div className={`grid grid-cols-4 gap-12 w-full h-full px-8 py-10 ${props.className}`} ref={ref}>
            {props.items?.map((item) => (
                <NavCard img={item.img} title={item.title} to={item.to} key={Math.random()}/>
            ))}
        </div>
    )
});