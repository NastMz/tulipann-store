import {padStart} from 'lodash';

/**
 * Pads a number to two digits by adding a leading zero if necessary.
 *
 * @param {number} num - The number to pad.
 * @returns {string} The padded number.
 */
function padTo2Digits(num: number): string {
    return padStart(num.toString(), 2, '0');
}

/**
 * Gets the featureName of the day and the full date in Spanish for a given date.
 *
 * @param {string} date - The date in ISO format.
 * @returns {string} The featureName of the day and the full date in Spanish.
 */
export function getDate(date: string): string {
    const days = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
        ];
    const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
        ];

    const d = new Date(date);
    const dayName = days[d.getDay()];
    const fullDate = `${padTo2Digits(d.getDate())} de ${months[d.getMonth()]} ${d.getFullYear()}`;
    return `${dayName}, ${fullDate}`;
}
