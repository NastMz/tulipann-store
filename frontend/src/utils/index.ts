/**
 * Exports utility functions for various purposes.
 *
 * @module utils
 * @exports {function} getDate - Returns the name of the day and the full date in Spanish for a given date.
 * @exports {function} nameOf - Returns the name of a property of an object as a string.
 * @exports {function} getRateMean - Calculates the mean rating for a product.
 * @exports {function} getTotalCustomerCount - Calculates the total number of customers who have left feedback for a product.
 * @exports {function} getPercentPerRate - Calculates the percentage of customers who have given each possible rating for a product.
 * @exports {function} sortByProperty - Sorts an array by a given property name in ascending or descending order.
 * @exports {function} loadCartState - Loads the cart state from the local storage.
 * @exports {function} saveCartState - Saves the cart state to the local storage.
 * @exports {object} Images - Exports a collection of image URLs.
 * @exports {function} ScrollToTop - Exports a function or component that allows scrolling to the top of the page.
 * @exports {function} scrollToSection - Exports a function that allows scrolling to a specific section of the page.
 */

export {ScrollToTop} from './scrollToTop';
export {scrollToSection} from './scrollToSection';
export {sortByProperty} from './sortByProperty';
export {getDate} from './getDate';
export {nameOf} from './getKey';
export {getRateMean, getTotalCustomerCount, getPercentPerRate} from './rateUtils';
export {loadCartState, saveCartState} from './localStorage';
export {Images} from './Images';