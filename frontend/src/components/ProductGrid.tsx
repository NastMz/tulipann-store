import {ProductCard} from "./ProductCard";
import {Product} from "../models";
import {getRateMean, getTotalCustomerCount} from "../utils";
import {AnimatePresence, motion} from "framer-motion";

interface ItemsGridProps {
    items: Product[],
    className?: string,
    showPreview: Function,
}

export const ProductGrid = (props: ItemsGridProps) => {
    return (
        <motion.div
            layout
            className={`grid gap-12 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] ${props.className}`}
        >
            <AnimatePresence>
                {props.items.map((item) => (
                    <ProductCard
                        id={item.id}
                        img={item.images[0]}
                        name={item.name}
                        price={item.price}
                        rate={item.rate ?? getRateMean(item)}
                        reviews={getTotalCustomerCount(item)}
                        key={item.id}
                        showPreview={props.showPreview}
                        className={'hover:scale-110'}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}