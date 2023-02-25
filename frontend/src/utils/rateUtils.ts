import { Product } from "../models/interfaces";

/**
 * Calculates the total number of customers who have left feedback for a product.
 *
 * @param {Product} product - The product.
 * @returns {number} The total number of customers.
 */
export function getTotalCustomerCount(product: Product) {
  return product.feedback.length;
}

/**
 * Calculates the number of customers who have given each possible rating for a product.
 *
 * @param {Product} product - The product.
 * @returns {Object} An object containing the number of customers who have given each possible rating.
 */
export function getTotalCustomerCountPerRate(product: Product) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    product.feedback.forEach((rate) => {
        counts[rate.rate] += 1;
    });

    return counts;
}

/**
 * Calculates the mean rating for a product.
 *
 * @param {Product} product - The product.
 * @returns {number} The mean rating, rounded to the nearest integer.
 */
export function getRateMean(product: Product) {
    const totalCustomers = getTotalCustomerCount(product);

    const counts = getTotalCustomerCountPerRate(product);

    const mean =
    (counts[1] + counts[2] * 2 + counts[3] * 3 + counts[4] * 4 + counts[5] * 5) /
    totalCustomers;

    return Math.round(mean);
}

/**
 * Calculates the percentage of customers who have given each possible rating for a product.
 *
 * @param {Product} product - The product.
 * @returns {Object} An object containing the percentage of customers who have given each possible rating.
 */
export function getPercentPerRate(product: Product) {
    const totalCustomers = getTotalCustomerCount(product);

    const counts = getTotalCustomerCountPerRate(product);

    return {
        oneStarPercent: Math.round((counts[1] / totalCustomers) * 100),
        twoStarsPercent: Math.round((counts[2] / totalCustomers) * 100),
        threeStarsPercent: Math.round((counts[3] / totalCustomers) * 100),
        fourStarsPercent: Math.round((counts[4] / totalCustomers) * 100),
        fiveStarsPercent: Math.round((counts[5] / totalCustomers) * 100),
    };
}
