/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  env: {
    REACT_APP_API_PROXY:'https://api.binance.com/api/v3'
  },
  reactStrictMode: true,
}

module.exports = nextConfig
