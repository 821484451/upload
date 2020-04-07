module.exports = {
    publicPath:'', // 部署得时候避免出现子目录部署
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:8081/api',
                // target: 'http://douban.uieee.com/v2/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            },
        }
    }
}