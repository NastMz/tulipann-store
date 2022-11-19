import {Product} from "../models";
import {CommentaryCard} from "./utils/CommentaryCard";
import {RateChart} from "./utils/RateChart";

interface ReviewsProps {
    product: Product
}

export const Reviews = (props: ReviewsProps) => {
    return (
        <div className={"flex gap-20"}>
            <RateChart
                product={props.product}
                className={""}
            />
            <div className={"w-full"}>
                {
                    props.product.feedback.map((commentary) => (
                        <CommentaryCard commentary={commentary}/>
                    ))
                }
            </div>
        </div>
    )
}