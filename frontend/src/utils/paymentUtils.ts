import axios from 'axios';
import * as CryptoJS from 'crypto-js';

/**
 * Generates a random string of characters as signature for the payment.
 *
 * @param {number} amount - The amount of the payment.
 * @param {string} referenceCode - The reference code of the payment.
 * @returns {string} The signature for the payment.
 */
export function generateSignature(amount: number, referenceCode: string) {
    // Signature generation
    const signature = `${import.meta.env.VITE_PAYU_API_KEY}~${import.meta.env.VITE_PAYU_MERCHANT_ID}~${referenceCode}~${amount}~${import.meta.env.VITE_PAYU_CURRENCY}`;

    // Create SHA-256 object
    const hash = CryptoJS.MD5(signature);

    // Get the hexadecimal digital signature
    return hash.toString(CryptoJS.enc.Hex);
}
