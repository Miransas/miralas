import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
  {
    rules: {
      // Tırnak işaretleri ve kaçış karakterleri uyarısını kapatır
      "react/no-unescaped-entities": "off",
      
      // Kullanılmayan değişken/import uyarılarını kapatır
      "@typescript-eslint/no-unused-vars": "off",
      
      // HTML <img> etiketi kullanım uyarısını kapatır
      "@next/next/no-img-element": "off",
      
      // React Hooks bağımlılık ve useEffect durum güncelleme uyarılarını kapatır
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;