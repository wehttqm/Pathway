import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import react from "eslint-plugin-react";

export default tseslint.config(
  {
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: eslintPluginPrettier.configs.recommended.rules,
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Disable React-in-JSX-scope rule,
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
