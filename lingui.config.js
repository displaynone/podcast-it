/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: [
    'en',
    'es',
    'fr',
    'it',
    'de',
    'zh',
    'ar',
    'ko',
    'ja',
    'ur',
    'pl',
    'ca',
    'gl',
    'eu',
    'pt',
    'hi',
  ],
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src', 'app'],
    },
  ],
  format: 'po',
  extractBabelOptions: {
    plugins: ['macros'],
  },
};
