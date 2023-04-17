/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  compiler: {
    styledComponents: {
      displayName: true,
      fileName: true,
      minify: true,
    }
  }
}
