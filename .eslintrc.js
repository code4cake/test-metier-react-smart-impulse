module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked',
    // 'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'react-app',
    'react-app/jest',
    'prettier',
  ],
  ignorePatterns: ['dist', 'eslint.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'prettier'],
  // settings: {
  //   'import/resolver': {
  //     typescript: {},
  //   },
  // },
  // rules: {
  //   'react-refresh/only-export-components': [
  //     'warn',
  //     { allowConstantExport: true },
  //   ],
  // },
};
