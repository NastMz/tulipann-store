import {Product} from "../../models/interfaces";
import {getPercentPerRate, getRateMean, getTotalCustomerCount} from "../../utils";
import {Stars} from "../common";
import {ChartBar} from "./ChartBar";
import {ReviewFormModal} from "../ui";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/selector";

/**
 * Interface for the RateChart component props.
 *
 * @interface RateChartProps
 * @property {Product} product - The product to show the rate chart.
 * @property {string} [className] - The class name for the component.
 */
interface RateChartProps {
    product: Product,
    className?: string
}


/**
 * RateChart component.
 *
 * Component for showing the rate chart of a product.
 *
 * @param {RateChartProps} props - The props of the component.
 * @returns {JSX.Element} - The RateChart component.
 */
export const RateChart = (props: RateChartProps) => {
    const totalReviews = getTotalCustomerCount(props.product)

    const reviewsPercents = getPercentPerRate(props.product);

    const [showReviewForm, setShowReviewForm] = useState(false);

    const user = useSelector(selectUser);

    return (
        <div className={`w-full h-fit flex flex-col gap-4 p-6 ${props.className}`}>
            <h2 className={"text-2xl font-bold"}>
                Reseñas de clientes
            </h2>
            <div className={"flex gap-2 items-center"}>
                <Stars rate={getRateMean(props.product)} size={18}/>
                <span className={"text-sm font-medium"}>
                    Basado en {totalReviews} {totalReviews !== 1 ? 'reseñas' : 'reseña'}
                </span>
            </div>
            <div className={"flex flex-col gap-1 w-full"}>
                <ChartBar stars={5} percent={reviewsPercents.fiveStarsPercent}/>
                <ChartBar stars={4} percent={reviewsPercents.fourStarsPercent}/>
                <ChartBar stars={3} percent={reviewsPercents.threeStarsPercent}/>
                <ChartBar stars={2} percent={reviewsPercents.twoStarsPercent}/>
                <ChartBar stars={1} percent={reviewsPercents.oneStarPercent}/>
            </div>
            <div>
                <h4 className={"text-lg font-medium"}>Comparte tus pensamientos</h4>
                <p className={"text-sm text-gray-500"}>Si ha usado este producto, comparta sus opiniones con otros
                    clientes</p>
                <button
                    className={"mt-4 p-2 flex items-center justify-center w-full border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-100"}
                    onClick={() => setShowReviewForm(true)}
                >
                    Escribe una reseña
                </button>
            </div>

            <ReviewFormModal
                user={user}
                productId={props.product.id}
                isOpen={showReviewForm}
                onClose={() => setShowReviewForm(false)}
            />
        </div>
    )
}