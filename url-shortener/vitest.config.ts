/// <reference types="vitest" />
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',
    exclude: [...configDefaults.exclude, '**/data/pg/**'],
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [tsconfigPaths()],
  define: {
    'import.meta.vitest': 'undefined',
  },
});
