import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /* ---------------- React ---------------- */
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      /* React Refresh (Vite Fast Refresh) */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      /* ---------------- TypeScript ---------------- */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/consistent-type-imports": "warn",

      /* Optional but nice */
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
    },
  }
)
