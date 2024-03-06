/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
            source: '/',
            destination: '/questions-answers',
            permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;