import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  }),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];

export default eslintConfig;
