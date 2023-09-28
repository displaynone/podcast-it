module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          lazyImports: true,
        },
      ],
      '@lingui/babel-preset-react',
    ],
    plugins: [
      // ['@babel/plugin-proposal-decorators', { legacy: true }],
      'babel-plugin-macros',
      // 'react-native-reanimated/plugin',
    ],
  };
};
