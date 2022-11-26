import {Link} from "react-router-dom";
import {useState} from "react";
import {Image} from "./Image";

interface CategoryCardProps {
    img: string,
    title: string,
    to: string,
    className?: string
}

export const CategoryCard = (props: CategoryCardProps) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <Link to={props.to}
              className={`overflow-hidden rounded-xl relative ${props.className}`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}>
            <div className={"h-full w-full"}>
                <Image src={props.img} className={`${isHover ? 'scale-110' : ''}`}/>
            </div>
            <div
                className={"absolute h-full w-full bg-black bg-opacity-20 top-0 text-white flex flex-col justify-end items-start p-5"}>
                <h1 className={"text-sm font-bold"}>{props.title}</h1>
                <span className={"text-sm"}>Comprar ahora</span>
            </div>
        </Link>
    )
}