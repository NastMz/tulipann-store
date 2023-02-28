/**
 * Exports utility functions for various purposes.
 *
 * @module utils
 * @exports {function} getDate - Returns the featureName of the day and the full date in Spanish for a given date.
 * @exports {function} nameOf - Returns the featureName of a property of an object as a string.
 * @exports {function} getRateMean - Calculates the mean rating for a product.
 * @exports {function} getTotalCustomerCount - Calculates the total number of customers who have left feedback for a product.
 * @exports {function} getPercentPerRate - Calculates the percentage of customers who have given each possible rating for a product.
 * @exports {function} sortByProperty - Sorts an array by a given property featureName in ascending or descending order.
 * @exports {function} loadCartState - Loads the cart state from the local storage.
 * @exports {function} saveCartState - Saves the cart state to the local storage.
 * @exports {function} ScrollToTop - Exports a function or component that allows scrolling to the top of the page.
 * @exports {function} getErrors - Returns all errors from an object.
 * @exports {function} createBlurhash - Creates a blurhash from an image.
 * @exports {function} getBase64FromFile - Creates a base64 string from a file.
 */

export {ScrollToTop} from './scrollToTop';
export {sortByProperty} from './sortByProperty';
export {getDate} from './getDate';
export {nameOf} from './getKey';
export {loadCartState, saveCartState} from './localStorage';
export {getErrors} from './getErrors';
export {createBlurhash, getBase64FromFile, createFileFromImageUrl} from './ImageUtils';
export {orderUtils, getAmount, formatPrice} from './orderUtils';