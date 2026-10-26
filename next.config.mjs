/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/Tanishq-Bistupur/RGA-Calculator",
        destination: "https://tanishq-bistupur-rga.atelierog.co.in/",
      },
      {
        source: "/Tanishq-Bistupur/RGA-Calculator/:path*",
        destination: "https://tanishq-bistupur-rga.atelierog.co.in/:path*",
      },
    ];
  },
};

export default nextConfig;
