/**
 * Removes HTML tags from a string.
 * @param {string} htmlString - The string containing HTML tags to be removed.
 * @returns {string} - The plain text without HTML tags.
 */

export const stripHtmlTags = (htmlString: string | undefined): string => {
    if (!htmlString) return '';
    return htmlString.replace(/<[^>]*>/g, '');
};