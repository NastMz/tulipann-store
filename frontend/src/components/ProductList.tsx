import {ProductCard} from "./ProductCard";
import {Product} from "../models";
import {getRateMean, getTotalCustomerCount} from "../utils";
import {BsBoxSeam} from "react-icons/all";

interface ItemsGridProps {
    items: Product[],
    className?: string,
    showPreview: Function
}

export const ProductList = (props: ItemsGridProps) => {
    return (
        <>
            {
                props.items.length > 0
                    ? <div className={`grid place-items-center gap-14 ${props.className}`}>
                        {props.items.map((item) => (
                            <ProductCard
                                id={item.id}
                                img={item.images[0]}
                                name={item.name}
                                price={item.price}
                                rate={item.rate ?? getRateMean(item)}
                                reviews={getTotalCustomerCount(item)}
                                key={Math.random()}
                                showPreview={props.showPreview}
                            />
                        ))}
                    </div>
                    : <div className={"flex flex-col items-center justify-center gap-6 text-gray-200 h-80"}>
                        <BsBoxSeam size={90}/>
                        <span className={"text-2xl"}>No hemos encontrado productos</span>
                    </div>
            }
        </>
    )
}