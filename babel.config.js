const envFile = '__DEV__' ? '.env.development' : '.env.production';

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: envFile,
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          '@src': './src',
          '@hooks': './src/hooks',
          '@apis': './src/apis',
          '@context': './src/context',
          '@utils': './src/store/utils',
          '@Components': './src/Components',
          '@UI': './src/UI',
          '@Admin': './src/Admin',
          '@Auth': './src/Auth',
          '@Consumer': './src/Consumer',
          '@Theme': './src/Theme',
          '@images': './assets/images',
          '@fonts': './assets/fonts',
          '@lang': './assets/lang',
        },
      },
    ],
  ],
};
