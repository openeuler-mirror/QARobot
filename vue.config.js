module.exports = {
    devServer: {
        // disableHostCheck: true,
        // host: '7.249.230.161',
        // port: 8085,
        proxy: {
            "/api": {
                target: 'https://ic-openlabs.huawei.com/chat',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
};