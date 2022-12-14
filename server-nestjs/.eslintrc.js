module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    // Check import order for types to be imported separately
    "@typescript-eslint/consistent-type-imports": "warn",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // While explicitly using 'any' is permissible, it should be avoided whenever possible (ignores type safety)
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    // Prevent casting try/catch errors as 'any' to enforce proper error checks
    "@typescript-eslint/no-implicit-any-catch": "error",
    // Interface names should not be prefix with 'I' (TS recommendation)
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: { regex: "^I[A-Z]", match: false },
      },
    ],
    // Using non-null assertion operator (!) is occasionally necessary (entities, etc)
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    // Returning an async call within try/catch requires an 'await' keyword to be able to handle errors!
    "@typescript-eslint/return-await": ["error", "in-try-catch"],
    // Prevent (and combine) duplicate import declarations
    "import/no-duplicates": "warn",
    // Sort imports into alphabetical groups (sorting import keys is handled by 'sort-imports')
    "import/order": [
      "warn",
      {
        // Custom group definitions (uses 'minimatch')
        // NOTE: TS aliases are automatically categorized as 'internal' paths by plugin!
        pathGroups: [
          // Example: { pattern: "@{app,common,modules,typings}/**", group: "external", position: "after" }
        ],
        // Order import groups (can group multiple together)
        groups: [
          "builtin", // Built-in Node packages
          "external", // NPM depencencies
          "internal", // Internal aliases/paths (from TS config)
          ["parent", "sibling", "index"], // Relative paths
          "unknown", // All uncategorized imports
          "type", // Specific type imports (ie 'import type {} ...')
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
      },
    ],
    // Prevent files/modules from importing from themselves
    "import/no-self-import": "error",
    // Prevent useless import paths (ie. "./../something.ts" or "./pages/index.ts")
    "import/no-useless-path-segments": ["warn", { noUselessIndex: true }],
    // Console statements should be avoided where possible (prefer explicit logging)
    "no-console": "warn",
    /*"no-restricted-globals": [
      "warn",
      {
        // Value of '__dirname' changes based on bundling tool which breaks path-based imports.
        //   Using 'process.cwd()' is recommended instead (see 'getAssetPath' utility function).
        name: "__dirname",
        message: "Use process.cwd() instead (requires known execution root though)",
      },
    ],*/
    // Disabled to avoid rule conflict with '@typescript-eslint/return-await'
    "no-return-await": "off",
    // Prevent throwing non-Error literals (no stacktrace, etc)
    "no-throw-literal": "error",
    "prefer-const": "warn",
    // Prettier formatting suggestions will be applied automatically
    "prettier/prettier": "warn",
    // Sort multiple import keys (sorting import declarations is handled by 'import/order')
    "sort-imports": [
      "warn",
      {
        // Ignore case to avoid placing PascalCase imports before camelCase (ie. 'import {Example, awesomeExample} ...')!
        ignoreCase: true,
        // Ignore sorting import declaration (handled by 'import/order')
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    "import/extensions": [".js", ".ts"],
    "import/resolver": {
      typescript: {
        // Allow 'import' rules to reference TS config (for aliases, etc)
        project: "./tsconfig.json",
      },
    },
  },
};
