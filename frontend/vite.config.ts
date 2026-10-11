import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Keeps vendor bytes (React, Router, Supabase) in their own cacheable
        // chunks so a deploy that only touches app code doesn't force every
        // visitor to re-download React etc. Function form so anything under
        // node_modules that isn't explicitly matched still lands in a generic
        // vendor chunk rather than silently leaking back into the app chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router')) return 'vendor-router';
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/') ||
            id.includes('react-helmet-async') ||
            // react-helmet-async's own deps — keeping them out of the generic
            // vendor chunk avoids a vendor <-> vendor-react circular chunk.
            id.includes('/invariant/') ||
            id.includes('/react-fast-compare/') ||
            id.includes('/shallowequal/')
          ) {
            return 'vendor-react';
          }
          if (id.includes('@supabase')) return 'vendor-supabase';
          return 'vendor';
        }
      }
    }
  }
});
