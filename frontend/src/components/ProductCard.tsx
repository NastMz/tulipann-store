import {useState} from "react";
import {AiFillStar} from "react-icons/all";
import {Image} from "./Image";

interface ProductCardProps {
    id: number,
    img: string,
    name: string,
    price: number,
    rate: number,
    reviews: number,
    className?: string,
    showPreview: Function
}

export const ProductCard = (props: ProductCardProps) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={`flex flex-col gap-2 h-96 md:h-80 w-full md:w-48 cursor-pointer text-center ${isHover ? 'scale-110' : ''} ${props.className}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => props.showPreview(props.id)}
        >
            <div className={"flex-1 overflow-hidden rounded-lg"}>
                <Image src={props.img}/>
            </div>
            <div className="flex-2 flex flex-col gap-2">
                <h1 className={`font-medium`}>{props.name}</h1>
                <div className={`flex flex-col justify-center items-center`}>
                    <div className={`flex justify-center items-center`}>
                        {[...Array(5)].map((star, index) => {
                            return (
                                props.rate > index
                                    ? <AiFillStar color={"#fbbf24"} key={Math.random()}/>
                                    : <AiFillStar color={"#d1d5db"} key={Math.random()}/>
                            );
                        })}
                    </div>
                    <span className={"text-gray-400 text-sm flex items-center justify-center"}>
                        {props.reviews} {props.reviews !== 1 ? "reseñas" : "reseña"}
                    </span>
                </div>
                <span className={`text-lg font-medium`}>${props.price}</span>
            </div>
        </div>
    )
}