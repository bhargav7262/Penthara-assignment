/**
 * Formats a number as INR currency.
 * @param {number|string} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};

/**
 * Formats a date string into a readable format.
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Generates a random ID string.
 * @returns {string} A random string ID.
 */
export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}
