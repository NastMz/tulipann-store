import { Image } from './Image';

/**
 * Interface for Article model
 *
 * @interface Article
 * @property {string} id - ID of the article.
 * @property {string} title - Title of the article.
 * @property {string} summary - Summary of the article.
 * @property {string} content - Content of the article.
 * @property {Image} banner - Banner image of the article.
 * @property {string} date - Date of the article.
 * @property {string} author - Author of the article.
 * @property {string[]} tags - Tags of the article.
 */
export interface Article {
    id: string;
    title: string;
    summary: string;
    content: string;
    banner: Image;
    date: string;
    author: string;
    tags: Array<{ name: string }>;
}
