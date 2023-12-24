module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
