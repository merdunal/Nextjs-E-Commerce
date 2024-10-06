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
				hostname: "yesilbeyaz-e-commerce.vercel.app",
			},
		],
	},
};

module.exports = nextConfig;