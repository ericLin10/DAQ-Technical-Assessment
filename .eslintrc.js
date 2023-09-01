module.exports = {
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint', 'react', 'react-hooks'],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/recommended',
          'plugin:react-hooks/recommended',
        ],
        settings: {
          react: {
            version: 'detect',
          },
        },
        "overrides": [
          {
            "files": ["**/*.ts", "**/*.tsx"],
            "env": { "browser": true, "es6": true, "node": true },
            "extends": [
              "eslint:recommended",
              "plugin:@typescript-eslint/eslint-recommended",
              "plugin:@typescript-eslint/recommended"
            ],
            "globals": { "Atomics": "readonly", "SharedArrayBuffer": "readonly" },
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
              "ecmaFeatures": { "jsx": true },
              "ecmaVersion": 2018,
              "sourceType": "module",
              "project": "./tsconfig.json"
            },
            "plugins": ["@typescript-eslint"],
            "rules": {
              "indent": ["error", 2, { "SwitchCase": 1 }],
              "linebreak-style": ["error", "unix"],
              "quotes": ["error", "single"],
              "comma-dangle": ["error", "always-multiline"],
              "@typescript-eslint/no-explicit-any": 0
            }
          }
        ],
        parserOptions: {
          project: 'tsconfig.json',
          tsconfigRootDir: __dirname,
          sourceType: 'module',
        },
      };