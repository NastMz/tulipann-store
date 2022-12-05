import {AiFillStar} from "react-icons/all";
import {OptimizedImage} from "./OptimizedImage";
import {Image} from "../models";
import {motion} from "framer-motion";
import {useState} from "react";

interface ProductCardProps {
    id: number,
    img: Image,
    name: string,
    price: number,
    rate: number,
    reviews: number,
    className?: string,
    showPreview: Function
}

export const ProductCard = (props: ProductCardProps) => {

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <motion.div
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            layout
            onClick={() => props.showPreview(props.id)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className={`flex flex-col gap-4 h-96 w-full cursor-pointer text-center border border-gray-100 rounded-xl pb-4 overflow-hidden ${isHover ? 'scale-110' : ''} ${props.className}`}>
            <div className={`flex-1 overflow-hidden`}>
                <OptimizedImage image={props.img}/>
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
        </motion.div>
    )
}