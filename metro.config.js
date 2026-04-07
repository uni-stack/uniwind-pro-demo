const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  extraThemes: [
    'light-orange',
    'dark-orange',
    'light-green',
    'dark-green',
    'light-rose',
    'dark-rose',
    'light-violet',
    'dark-violet',
  ],
});
