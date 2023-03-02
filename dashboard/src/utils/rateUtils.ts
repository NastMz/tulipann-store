import {Commentary, Product} from "../models/interfaces";

/**
 * Calculates the total number of customers who have left feedback for a product.
 *
 * @param {commentaries} commentaries - The commentaries.
 * @param {string} productId - The ID of the product.
 * @returns {number} The total number of customers.
 */
export function getTotalCustomerCount(commentaries: Commentary[], productId: string) {
    let totalCustomers = 0;

    for (const commentary of commentaries) {
        if (commentary.productId === productId) {
            totalCustomers++;
        }
    }

    return totalCustomers;
    }

/**
 * Calculates the mean rating for a product.
 *
 * @param {commentaries} commentaries - The commentaries.
 * @param {string} productId - The ID of the product.
 * @returns {number} The mean rating, rounded to the nearest integer.
 */
export function getRateMean(commentaries: Commentary[], productId: string) {
    let totalRate = 0;

    for (const commentary of commentaries) {
        if (commentary.productId === productId) {
            totalRate += commentary.rate;
        }
    }

    const totalCustomers = getTotalCustomerCount(commentaries, productId);

    if (totalCustomers === 0) {
        return 0;
    }

    return Math.round(totalRate / totalCustomers);
}

/**
 * Calculates the percentage of customers who have given each possible rating for a product.
 *
 * @param {Product} product - The product.
 * @returns {Object} An object containing the percentage of customers who have given each possible rating.
 */
export function getPercentPerRate(commentaries: Commentary[], productId: string) {
    const totalCustomers = getTotalCustomerCount(commentaries, productId);
    const percentPerRate = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    for (const commentary of commentaries) {
        if (commentary.productId === productId) {
            percentPerRate[commentary.rate] += 100 / totalCustomers;
        }
    }

    return percentPerRate;
}
