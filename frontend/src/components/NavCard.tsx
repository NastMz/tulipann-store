import {Link} from "react-router-dom";
import {useState} from "react";
import {OptimizedImage} from "./OptimizedImage";
import {Image} from "../models";

interface NavCardProps {
    img: Image,
    title: string,
    to: string,
    className?: string
}

export const NavCard = (props: NavCardProps) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <Link to={props.to}
              className={`flex flex-col gap-2 h-full w-full ${props.className}`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
        >
            <div className={"h-52 w-full overflow-hidden rounded-xl"}>
                <OptimizedImage image={props.img} className={` ${isHover ? 'scale-110' : ''}`}/>
            </div>
            <div className="">
                <h1 className={`text-sm font-bold ${isHover ? 'text-red-500' : 'text-black'}`}>{props.title}</h1>
                <span className={`text-sm ${isHover ? 'text-red-300' : 'text-gray-500'}`}>Comprar ahora</span>
            </div>
        </Link>
    )
}