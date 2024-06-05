/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "gemstoneuruguay-production.up.railway.app",
			},
			{
				protocol: "https",
				hostname: "www.gemstonuruguay.com",
			},
			{
				protocol: "https",
				hostname: "gemstonuruguay.com",
			},
			{
				protocol: "https",
				hostname: "cdn.gemstonuruguay.com",
			},
		],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
  
};

export default nextConfig;
