module.exports = {
    '*.{sass,scss}': 'npm run lint:css',
    '*.{ts,tsx}': () => 'npm run lint:ts',
};