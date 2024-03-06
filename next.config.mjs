/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
            source: '/',
            destination: '/questions',
            permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;