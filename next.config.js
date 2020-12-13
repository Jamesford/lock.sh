const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const nextConfig = {
  serverRuntimeConfig: {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
  },
}

const mdx = [
  withMDX,
  {
    pageExtensions: ['js', 'jsx', 'mdx'],
  },
]

module.exports = withPlugins([mdx], nextConfig)
