import {AiFillStar} from "react-icons/all";

interface StarsProps {
    rate: number,
    size: number
}

export const Stars = (props: StarsProps) => {
    return (
        <div className={"flex items-center"}>
            {[...Array(5)].map((star, index) => {
                return (
                    props.rate > index
                        ? <AiFillStar
                            color={"#fbbf24"}
                            key={Math.random()}
                            size={props.size}
                        />
                        : <AiFillStar
                            color={"#d1d5db"}
                            key={Math.random()}
                            size={props.size}
                        />
                );
            })}
        </div>
    )
}