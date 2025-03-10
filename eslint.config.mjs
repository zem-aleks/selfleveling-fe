import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/ban-ts-ignore": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "MemberExpression[object.name='process'][property.name='env']",
          message:
            "Use `import { ENV } from '@/config/{client | server}';` instead of `process.env`",
        },
      ],
      "prettier/prettier": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^node:",
              "^(assert|buffer|child_process|crypto|fs|os|path|querystring|stream|timers|url|util|zlib)(/.*|$)",
            ], // Built-in Node.js modules
            ["^react$", "^next"], // React / Next.js
            ["^@?\\w"], // External packages
            ["^@/"], // Aliased imports
            ["^\\."], // Relative imports
            ["^.+\\.?(css|scss|sass|less)$"], // Style imports
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    plugins: {
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
    },
  },
];

export default eslintConfig;
