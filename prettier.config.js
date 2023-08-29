// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "",
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/logger/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
