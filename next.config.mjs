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
				hostname: "gemstonuruguay.com",
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
