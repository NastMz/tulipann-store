import {Image} from "./Image";

interface PromoCardProps {
    img: string,
    className?: string
}

export const PromoCard = (props: PromoCardProps) => {

    return (
        <div className={`rounded-xl overflow-hidden h-full w-full ${props.className}`}>
            <Image src={props.img}/>
        </div>
    )
}