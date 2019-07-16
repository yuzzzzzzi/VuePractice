module.exports = {
    devServer: {
        // 端口
        port: 9999,
        // 自动打开浏览器
        open: true,
        // 关闭域名检查
        disableHostCheck: true,
        // 错误或警告的全屏覆盖层
        overlay: {
            // 警告
            warnings: false,
            // 错误
            errors: true
        },
        // 代理
        proxy: {
            // 后端
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}