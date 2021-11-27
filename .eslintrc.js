module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignorePattern: 'import\\s.+\\sfrom\\s.+;$',
    }],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
