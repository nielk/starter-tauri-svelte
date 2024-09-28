import prettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        project: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // eslint
      'no-undef': 'off', // already handled by typescript

      // prettier
      'prettier/prettier': 'error',

      // typescript
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^\\$\\$(Props|Events|Slots)$' },
      ],
      '@typescript-eslint/no-unsafe-assignment': [
        'error',
        { varsIgnorePattern: '^\\$(props|state)$' },
      ],

      // svelte
      'svelte/no-at-html-tags': 'off',

      // import
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          // The default grouping, but with type imports last as a separate group.
          groups: [
            ['^node:', '^node:.*\\u0000$'], // node builtins packages
            ['^svelte', '^\\w', '^@?\\w'], // svelte and package imports
            ['^(_)(/.*|$)', '^(_)(/.*|$).*\\u0000$'], // alias imports
            ['^\\.', '^\\..*\\u0000$'], // relative imports
            ['^.+\\.s?css$'], // styles imports
          ],
        },
      ],
    },
  },
  // Globally ignored files
  {
    ignores: ['node_modules', 'build', 'dist', '.svelte-kit'],
  },
]
