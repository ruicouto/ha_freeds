module.exports = {
    async getEditAssetTasks(config) {
        const files = {
            'freeds-card.js': './frontend/freeds-card.js',
        };

        return {
            folder: 'freeds_c588',
            files: files,
        };
    },
};