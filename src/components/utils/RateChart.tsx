import {Product} from "../../models";
import {getPercentPerRate, getRateMean, getTotalCustomerCount} from "../../utils";
import {Stars} from "./Stars";
import {Link} from "react-router-dom";
import {ChartBar} from "./ChartBar";

interface RateChartProps {
    product: Product,
    className?: string
}

export const RateChart = (props: RateChartProps) => {
    const totalReviews = getTotalCustomerCount(props.product)

    const reviewsPercents = getPercentPerRate(props.product);

    return (
        <div className={`flex flex-col gap-4 p-6 ${props.className}`}>
            <h2 className={"text-2xl font-bold"}>
                Reseñas de clientes
            </h2>
            <div className={"flex gap-2 items-center"}>
                <Stars rate={getRateMean(props.product)} size={18}/>
                <span className={"text-sm font-medium"}>
                    Basado en {totalReviews} {totalReviews !== 1 ? 'reseñas' : 'reseña'}
                </span>
            </div>
            <div className={"flex flex-col gap-1 "}>
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
                <Link
                    to={''}
                    className={"mt-4 p-2 flex items-center justify-center w-full border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-100"}
                >
                    Escribe una reseña
                </Link>
            </div>
        </div>
    )
}