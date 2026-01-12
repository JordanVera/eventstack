module.exports = {
  reactStrictMode: true,
  // Externalize Prisma and database packages to prevent bundling issues with Turbopack
  serverExternalPackages: ['@prisma/client', '@repo/database', 'prisma'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  // Turbopack configuration for Next.js 16+
  turbopack: {
    resolveAlias: {
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    },
    resolveExtensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
  },
  // Webpack configuration (fallback for production builds)
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    // Handle Prisma binaries for monorepo setup
    if (isServer) {
      config.externals = [...(config.externals || []), '@prisma/client'];
    }

    return config;
  },
};
