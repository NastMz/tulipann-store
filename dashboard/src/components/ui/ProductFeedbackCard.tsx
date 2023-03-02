import {Stars} from "../common";
import {Commentary} from "../../models/interfaces";

interface ProductFeedbackCardProps {
    comment: Commentary;
    className?: string
}

/**
 * ProductFeedbackCard component.
 * 
 * This component displays a card with the comment of a user for a product.
 * 
 * @param {ProductFeedbackCardProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ProductFeedbackCard = ({comment, className}: ProductFeedbackCardProps) => {
    return (
        <div className={`relative flex flex-col gap-2 py-4 w-full ${className} text-black`}>
            <div className={"flex gap-2 items-center"}>
                <span className={"font-medium"}>Usuario:</span>
                <span className={"text-sm font-medium text-red-500"}>{comment.UserId}</span>
            </div>
            <div className={"flex gap-2 items-center"}>
                <span className={"font-medium"}>Calificación:</span>
                <Stars rate={comment.rate} size={16}/>
            </div>
            <div className={"flex gap-2 items-center"}>
                <span className={"font-medium"}>Comentario:</span>
                <span className={"text-sm font-medium text-gray-500"}>{comment.text}</span>
            </div>
        </div>
    )
}