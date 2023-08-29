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
    "",
    "^(@/config|@/controller|@/helpers|@/logger|@/middlewares|@/models|@/routes|@/services|@/templates|@/utils|@/validations)(/.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.1.3",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
