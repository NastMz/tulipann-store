import {OptimizedImage} from "../common/OptimizedImage";
import {Image} from "../../models/interfaces";

interface PromoCardProps {
    img: Image,
    className?: string
}

export const PromoCard = (props: PromoCardProps) => {

    return (
        <div className={`rounded-xl overflow-hidden h-full w-full ${props.className}`}>
            <OptimizedImage image={props.img}/>
        </div>
    )
}