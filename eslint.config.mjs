import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['build/**', 'node_modules/**', 'public/**', 'coverage/**']
  },

  js.configs.recommended,

  /* Arquivos TypeScript: regras do typescript-eslint. */
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended]
  },

  /* Regras de React validas para todo o src. */
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      'react/prop-types': 'off',

      'no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],

      /* Aspas em texto JSX renderizam normalmente; so `>` e `}` sao ambiguos. */
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],

      /* Debitos de acessibilidade reais, porem alteram UX: reportar sem quebrar o CI. */
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn'
    }
  },

  /* Arquivos CommonJS: configs na raiz e mocks do Jest. */
  {
    files: [
      '*.{js,cjs}',
      'jest.config.js',
      'babel.config.js',
      'postcss.config.js',
      'tailwind.config.js',
      'src/__mocks__/**/*.js'
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  prettier
)
