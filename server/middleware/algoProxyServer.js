const { createProxyMiddleware } = require('http-proxy-middleware');
const ALGO_SERVER_URL = process.env.ALGO_SERVER_URL || 'http://10.1.24.85:8000'

const options = {
    target: ALGO_SERVER_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/algo-api`]: '',
    },
    onProxyReq: function (proxyReq, req, res) {
        // add custom header to request
        proxyReq.setHeader('Authorization', 'Bearer ' + req.headers.authorization)
    }
}

module.exports = createProxyMiddleware(options);