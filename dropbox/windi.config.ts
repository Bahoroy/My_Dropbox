import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  scan: {
    dirs: ['src'],
    fileExtensions: ['jsx', 'tsx'],
  },
});
