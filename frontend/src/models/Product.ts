import {Commentary} from "./Commentary";
import {ProductSpecs} from "./ProductSpecs";
import {Image} from "./Image";


export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    specs: ProductSpecs,
    stock: number,
    images: Array<Image>,
    feedback: Commentary[],
    category: number,
    subcategories: Array<number>,
    rate?: number
}