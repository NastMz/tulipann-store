import {Product} from "../../models";

interface Option {
    id: number,
    name: string,
    property: keyof Product,
    order: "ASC" | "DESC",
}

// Sort Options
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