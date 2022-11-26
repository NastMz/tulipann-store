import {NavCard} from "./NavCard";

interface NavItem {
    img: string,
    title: string,
    to: string
}

interface NavbarMenuProps {
    items?: NavItem[],
    className?: string
}

export const NavbarMenu = (props: NavbarMenuProps) => {
    return (
        <div
            className={`grid grid-cols-4 gap-12 w-full px-8 py-6 ${props.className}`}
        >
            {
                props.items?.map((item) => (
                    <NavCard
                        img={item.img}
                        title={item.title}
                        to={item.to}
                        key={Math.random()}
                    />
                ))
            }
        </div>
    )
}