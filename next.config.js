/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  env: {
    REACT_APP_API_PROXY:'https://api.binance.com/api/v3',
    KUCOIN_APP_API_PROXY: 'https://api.kucoin.com/api/v1'
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      // {
      //   source: 'http://localhost:3000',
      //   destination: 'https://api.binance.com/api/v3'
      // },
      {
        source: '/market/allTickers',
        destination: 'https://api.kucoin.com/api/v1/market/allTickers'
      }
    ]
  }
}

module.exports = nextConfig
