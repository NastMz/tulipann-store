import {Product} from "../models";
import {CommentaryCard} from "./CommentaryCard";
import {RateChart} from "./RateChart";

interface ReviewsProps {
    product: Product
}

export const Reviews = (props: ReviewsProps) => {
    return (
        <div className={"flex gap-20 px-6"}>
            <RateChart
                product={props.product}
                className={""}
            />
            <div className={"w-full"}>
                {
                    props.product.feedback.map((commentary) => (
                        <CommentaryCard commentary={commentary} key={commentary.id}/>
                    ))
                }
            </div>
        </div>
    )
}