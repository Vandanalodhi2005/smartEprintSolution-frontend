/**
 * Simple utility to detect if the current visitor is a search engine bot.
 */
export const isBot = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const bots = [
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        'baiduspider',
        'ia_archiver',
        'mediapartners-google',
        'adsbot-google',
        'facebot',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'pinterestbot',
        'slackbot',
        'telegrambot'
    ];
    return bots.some(bot => userAgent.includes(bot));
};
