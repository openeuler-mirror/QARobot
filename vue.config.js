module.exports = {
    devServer: {
        proxy: {
            '/chatCompletionStream': {
                target: 'https://chatbot-backend.mlops.pub',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/auth': {
                target: 'https://chatbot-backend.mlops.pub',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/search': {
                target: 'https://doc-search.openeuler.org',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/api': {
                target: 'https://ic-openlabs.huawei.com/chat',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
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