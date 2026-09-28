import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
