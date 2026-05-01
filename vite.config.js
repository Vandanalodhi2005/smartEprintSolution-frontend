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
                about: resolve(__dirname, 'about/index.html'),
                shop: resolve(__dirname, 'shop/index.html'),
                faq: resolve(__dirname, 'faq/index.html'),
                contactUs: resolve(__dirname, 'contact-us/index.html'),
                privacyPolicy: resolve(__dirname, 'privacy-policy/index.html'),
                termsAndConditions: resolve(__dirname, 'terms-and-conditions/index.html'),
                shippingPolicy: resolve(__dirname, 'shipping-policy/index.html'),
                returnRefundPolicy: resolve(__dirname, 'return-refund-policy/index.html'),
                disclaimer: resolve(__dirname, 'disclaimer/index.html'),
                blogs: resolve(__dirname, 'blogs/index.html'),
                trackOrder: resolve(__dirname, 'track-order/index.html'),
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
