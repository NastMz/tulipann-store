import {Link} from "react-router-dom";
import {useState} from "react";
import {Image} from "../models";
import {OptimizedImage} from "./OptimizedImage";

interface NavbarMenuMobileCardProps {
    img: Image;
    title: string,
    subtitle: string,
    to: string,
    className?: string
}

export const NavbarMenuMobileCard = (props: NavbarMenuMobileCardProps) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <Link to={props.to}
              className={`overflow-hidden rounded-xl relative ${props.className}`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
        >
            <div className={"h-full w-full"}>
                <OptimizedImage image={props.img} className={`${isHover ? 'scale-110' : ''}`}/>
            </div>
            <div
                className={"absolute h-fit w-full bg-white bg-opacity-60 bottom-0 flex flex-col justify-end items-start p-5"}>
                <h1 className={"font-bold"}>{props.title}</h1>
                <span className={"text-sm"}>{props.subtitle}</span>
            </div>
        </Link>
    )
}