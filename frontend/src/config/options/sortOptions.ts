import {Product} from "../../models/interfaces";

/**
*
* Sort options for a list of products
* @interface Option
* @property {number} id - Identifier of the option
* @property {string} name - Display name of the option
* @property {keyof Product} property - Property of the Product to be sorted
* @property {"ASC" | "DESC"} order - Order in which the property will be sorted
*/
interface Option {
    id: number,
    name: string,
    property: keyof Product,
    order: "ASC" | "DESC",
}

/**

* Available options to sort a list of products
* @constant
* @type {Array<Option>}
*/
export const sortOptions: Array<Option> = [
    {
        id: 1,
        name: "Alfabético",
        property: 'name',
        order: 'ASC',
    },
    {
        id: 2,
        name: "Más Popular",
        property: 'feedback',
        order: 'DESC',
    },
    {
        id: 3,
        name: "Mejor Calificación",
        property: 'rate',
        order: 'DESC',
    },
    {
        id: 4,
        name: "Precio: Mayor a Menor",
        property: 'price',
        order: 'DESC',
    },
    {
        id: 5,
        name: "Precio: Menor a Mayor",
        property: 'price',
        order: 'ASC',
    }
]