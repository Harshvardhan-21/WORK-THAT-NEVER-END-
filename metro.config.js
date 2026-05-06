const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for Windows paths with spaces — escape the project root
config.projectRoot = __dirname;
config.watchFolders = [__dirname];

// Ensure PNG and other assets are always included
config.resolver.assetExts = [
  ...config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg',
];

module.exports = config;
