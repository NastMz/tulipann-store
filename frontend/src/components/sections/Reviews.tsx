import {Product} from "../../models/interfaces";
import {CommentaryCard} from "./CommentaryCard";
import {RateChart} from "./RateChart";


/**
 * Interface for the props of the Reviews component.
 *
 * @interface ReviewsProps
 * @property {Product} product - The product to show the reviews of.
 */
interface ReviewsProps {
    product: Product
}


/**
 * Reviews component.
 *
 * Component that shows the reviews section of a product.
 *
 * @param {ReviewsProps} props - The props of the component.
 * @returns {JSX.Element} - The Reviews component.
 */
export const Reviews = (props: ReviewsProps) => {
    return (
        <section className={"flex flex-col lg:flex-row gap-16 px-6 h-fit mb-12"}>
            <RateChart
                product={props.product}
                className={""}
            />
            <div className={"h-96 w-full overflow-y-auto px-4"}>
                {
                    props.product.feedback.map((commentary, index) => (
                        <CommentaryCard
                            commentary={commentary}
                            key={commentary.id}
                            className={`${index !== props.product.feedback.length - 1 ? "border-b-2 border-gray-100" : ''}`}
                        />
                    ))
                }
            </div>
        </section>
    )
}