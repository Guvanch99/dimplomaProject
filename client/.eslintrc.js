module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    camelcase: 'off',
    semi: ['error', 'never'],
    indent: ['error', 2],
    'no-shadow': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'jsx-a11y/media-has-caption': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/named': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'linebreak-style': 0,
    'react/jsx-tag-spacing': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'object-curly-newline': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-console': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-nested-ternary': 'off',
    'no-undef': 'off',
    '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      after: true
    }],
    'no-restricted-imports': [
      'error',
      {
        paths: [{
          name: 'styled-components',
          message: 'Please import from styled-components/macro.'
        }],
        patterns: [
          '!styled-components/macro'
        ]
      }
    ]
  }
}
