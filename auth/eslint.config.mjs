import eslint from '@eslint/js';
import love from 'eslint-config-love';
import prettierConfig from 'eslint-config-prettier';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
  eslintConfigPrettier,
  love,
);