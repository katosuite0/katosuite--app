/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr']
  }
};

export default nextConfig;
