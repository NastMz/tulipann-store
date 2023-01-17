import { Product } from "../models/interfaces";

/**
 * Calculates the total number of customers who have left feedback for a product.
 *
 * @param {Product} item - The product.
 * @returns {number} The total number of customers.
 */
export function getTotalCustomerCount(item: Product) {
  return item.feedback.length;
}

/**
 * Calculates the number of customers who have given each possible rating for a product.
 *
 * @param {Product} item - The product.
 * @returns {Object} An object containing the number of customers who have given each possible rating.
 */
export function getTotalCustomerCountPerRate(item: Product) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    item.feedback.forEach((rate) => {
        counts[rate.rate] += 1;
    });

    return counts;
}

/**
 * Calculates the mean rating for a product.
 *
 * @param {Product} item - The product.
 * @returns {number} The mean rating, rounded to the nearest integer.
 */
export function getRateMean(item: Product) {
    const totalCustomers = getTotalCustomerCount(item);

    const counts = getTotalCustomerCountPerRate(item);

    const mean =
    (counts[1] + counts[2] * 2 + counts[3] * 3 + counts[4] * 4 + counts[5] * 5) /
    totalCustomers;

    return Math.round(mean);
}

/**
 * Calculates the percentage of customers who have given each possible rating for a product.
 *
 * @param {Product} item - The product.
 * @returns {Object} An object containing the percentage of customers who have given each possible rating.
 */
export function getPercentPerRate(item: Product) {
    const totalCustomers = getTotalCustomerCount(item);

    const counts = getTotalCustomerCountPerRate(item);

    return {
        oneStarPercent: Math.round((counts[1] / totalCustomers) * 100),
        twoStarsPercent: Math.round((counts[2] / totalCustomers) * 100),
        threeStarsPercent: Math.round((counts[3] / totalCustomers) * 100),
        fourStarsPercent: Math.round((counts[4] / totalCustomers) * 100),
        fiveStarsPercent: Math.round((counts[5] / totalCustomers) * 100),
    };
}
