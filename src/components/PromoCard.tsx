interface PromoCardProps {
    img: string,
    aspectRatio: string,
    className?: string
}

export const PromoCard = (props: PromoCardProps) => {

    return (
        <div className={`rounded-xl overflow-hidden h-full aspect-${props.aspectRatio} ${props.className}`}>
            <img src={props.img} className={"h-full w-full object-cover"} alt={""}/>
        </div>
    )
}