import {ProductCard} from "./ProductCard";
import {Product} from "../../models/interfaces";
import {getRateMean, getTotalCustomerCount} from "../../utils";
import {AnimatePresence, motion} from "framer-motion";

interface ItemsGridProps {
    products: Product[],
    className?: string,
    openProductQuickview: (id: string) => void,
}

export const ProductGrid = (props: ItemsGridProps) => {
    return (
        <motion.div
            layout
            className={`grid gap-12 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] ${props.className}`}
        >
            <AnimatePresence>
                {props.products.map((item) => (
                    <ProductCard
                        id={item.id}
                        img={item.images[0]}
                        name={item.name}
                        price={item.price}
                        rate={item.rate ?? getRateMean(item)}
                        reviews={getTotalCustomerCount(item)}
                        key={item.id}
                        showPreview={props.openProductQuickview}
                        className={''}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}