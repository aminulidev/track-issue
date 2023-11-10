/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
        return [
            {
                source: '/:path*',
                headers: [
                    {key: 'referrer-policy', value: 'no-referrer'}
                ]
            }
        ]
    },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
        ],
      },
}

module.exports = nextConfig
