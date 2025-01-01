import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
    ),
    {
        plugins: {
            react,
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            ecmaVersion: 2020,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: '17.0',
            },
        },

        rules: {
            'prettier/prettier': 'error',
            'no-console': 'warn', // Warn on console.log statements
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/prop-types': 'off', // Disable prop-types rule for React
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused variables that start with _
            eqeqeq: ['error', 'always'], // Enforce strict equality
            curly: ['error', 'all'], // Enforce consistent brace style for all control statements
        },

        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            'coverage/',
            'public/',
            '*.config.js',
            '*.config.ts',
            '*.d.ts',
            '*.json',
            '*.md',
            '*.yml',
            '*.yaml',
            '*.lock',
            '*.log',
            '*.txt',
            '*.tsbuildinfo',
            'webpack.config.js',
        ],
    },
];
