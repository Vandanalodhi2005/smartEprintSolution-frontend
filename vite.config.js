import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        minify: 'esbuild', // Use esbuild (default, already included)
        target: 'esnext', // Target modern browsers
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                stepByStepSetupGuide: resolve(__dirname, 'step-by-step-setup-guide.html'),
                modelSearch: resolve(__dirname, 'model-search.html'),
                completeSetup: resolve(__dirname, 'complete-setup.html'),
                installationFailed: resolve(__dirname, 'installation-failed.html'),
            },
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    redux: ['redux', 'react-redux', 'redux-thunk'],
                }
            }
        }
    }
})
