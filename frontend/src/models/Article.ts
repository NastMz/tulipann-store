import {Image} from "./Image";

export interface Article {
    id: number,
    title: string,
    summary: string,
    content: string,
    banner: Image,
    date: string,
    author: string,
    tags: string[],
}