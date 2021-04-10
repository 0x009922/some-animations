import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
    plugins: [vue(), vueJsx()],
    base: '/some-animations/',
    build: {
        // chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                },
            },
        },
    },
    resolve: {
        alias: {
            '~': '/src',
        },
    },
});
