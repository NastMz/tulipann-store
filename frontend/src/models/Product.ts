import {Commentary} from "./Commentary";
import {Color} from "./Color";
import {ProductSpecs} from "./ProductSpecs";


export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    specs: ProductSpecs,
    stock: number,
    images: string[],
    feedback: Commentary[],
    category: number,
    colors?: Color[] | null
    supplier?: number,
    rate?: number
}