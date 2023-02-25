import {AiFillStar} from "react-icons/ai";
import {OptimizedImage} from "../common";
import {Image} from "../../models/interfaces";
import {motion} from "framer-motion";
import {useState} from "react";


/**
 * Interface for ProductCard component props.
 * @interface
 * @property {string} id - Product id.
 * @property {string} name - Product name.
 * @property {Image} image - Product image.
 * @property {number} price - Product price.
 * @property {number} rate - Product rating.
 * @property {number} reviews - Product reviews.
 * @property {string} [className] - Additional class name.
 * @property {(id: string) => void} [onClick] - Click event handler.
 */
interface ProductCardProps {
    id: string,
    image: Image,
    name: string,
    price: number,
    rate: number,
    reviews: number,
    className?: string,
    onClick: (id: string) => void
}

/**
 * Product card component.
 *
 * This component is used to display product information.
 *
 * @param {ProductCardProps} props - Component props.
 * @returns {JSX.Element} - Product card component.
 */
export const ProductCard = (props: ProductCardProps) => {

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <motion.div
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            layout
            onClick={() => props.onClick(props.id)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={'max-w-[250px] w-[250px] max-h-[350px] h-[350px]'}
        >
            <div
                className={`flex flex-col gap-4 h-full w-full cursor-pointer text-center border border-gray-100 rounded-xl pb-4 overflow-hidden shadow-md ${isHover ? 'scale-110' : ''} ${props.className}`}>
                <div className={`h-1/2 overflow-hidden`}>
                    <OptimizedImage image={props.image}/>
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