import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import icons from 'vite-plugin-icons';
import windi from 'vite-plugin-windicss';

export default defineConfig({
    plugins: [vue(), vueJsx(), icons(), windi()],
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
