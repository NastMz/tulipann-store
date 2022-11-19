import {Commentary} from "./Commentary";
import {Color} from "./Color";

interface Option {
    id: number,
    name: string,
    title: string,
    description: string,
    image: string
}

interface ProductSpecs {
    summary: string,
    options: Option[]
}



export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    specs: ProductSpecs,
    stock: number,
    img: string,
    feedback: Commentary[],
    category: number,
    colors?: Color[] | null
    supplier?: number
}