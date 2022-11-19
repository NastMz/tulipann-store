import {ProductCard} from "./utils/ProductCard";
import {Product} from "../models";
import {getRateMean, getTotalCustomerCount} from "../utils";

interface ItemsGridProps {
    items: Product[],
    className?: string,
    showPreview: Function
}

export const ProductList = (props: ItemsGridProps) => {
    return (
        <div className={`grid gap-14 ${props.className}`}>
            {props.items.map((item) => (
                <ProductCard
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    rate={getRateMean(item)}
                    reviews={getTotalCustomerCount(item)}
                    key={Math.random()}
                    showPreview={props.showPreview}
                />
            ))}
        </div>
    )
}