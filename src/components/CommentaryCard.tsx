import {FaUserCircle} from "react-icons/all";
import {Commentary} from "../models";
import {Stars} from "./Stars";

interface CommentaryCardProps {
    commentary: Commentary,
    className?: string
}

export const CommentaryCard = (props: CommentaryCardProps) => {
    return (
        <div className={`flex flex-col gap-2 p-6 mb-2 ${props.className}`}>
            <div className={"flex gap-2 items-center"}>
                <FaUserCircle
                    size={35}
                    className={"text-gray-400"}
                />
                <div>
                    <span className={"text-sm font-medium"}>{props.commentary.userName}</span>
                    <Stars rate={props.commentary.rate} size={18}/>
                </div>
            </div>
            <p className={"text-gray-500 italic"}>{props.commentary.commentary}</p>
        </div>
    )
}