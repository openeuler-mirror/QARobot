module.exports = {
  devServer: {
    proxy: {
      "/rag": {
        target: "http://60.204.250.91:8002",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/rag": "/",
        },
      },
      "/baichuanai": {
        target: "http://60.204.250.91:8000",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/baichuanai": "/",
        },
      },
      "/chataistream": {
        target: "http://159.138.5.80:5610",
        changeOrigin: true,
        pathRewrite: {
          "^/chataistream": "/",
        },
      },
      "/hcstream": {
        target: "https://modelapi.osinfra.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/issues": {
        target: "https://ipb.osinfra.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/qabot/": {
        target: "https://dsapi.osinfra.cn/query",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/chatCompletionStream": {
        target: "https://chatbot-backend.mlops.pub",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/auth": {
        target: "https://chatbot-backend.mlops.pub",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/search": {
        target: "https://doc-search.openeuler.org",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/api": {
        target: "https://ic-openlabs.huawei.com/chat",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },
};
