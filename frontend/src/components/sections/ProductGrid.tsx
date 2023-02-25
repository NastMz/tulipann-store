import {ProductCard} from "./ProductCard";
import {Product} from "../../models/interfaces";
import {getRateMean, getTotalCustomerCount} from "../../utils";
import {AnimatePresence, motion} from "framer-motion";

/**
 * Interface for ProductGrid component props.
 *
 * @interface ProductGridProps
 * @property {Product[]} products - List of products to display.
 * @property {string} [className] - Optional class name to add to the component.
 * @property {(id: string) => void} [onProductClick] - Optional callback to call when a product is clicked.
 */
interface ProductGridProps {
    products: Product[],
    className?: string,
    onProductClick: (id: string) => void,
}


/**
 * ProductGrid component.
 *
 * This component displays a grid of products.
 *
 * @param {ProductGridProps} props - Component props.
 * @returns {JSX.Element} - ProductGrid component.
 */
export const ProductGrid = (props: ProductGridProps) => {
    return (
        <motion.div
            layout
            className={`z-10 grid gap-8 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,350px))] w-full ${props.className}`}
        >
            <AnimatePresence>
                {props.products.map((item) => (
                    <ProductCard
                        id={item.id}
                        image={item.images[0]}
                        name={item.name}
                        price={item.price}
                        rate={item.rate ?? getRateMean(item)}
                        reviews={getTotalCustomerCount(item)}
                        key={item.id}
                        onClick={props.onProductClick}
                        className={''}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}