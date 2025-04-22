import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        allowedHosts: ['localhost', 'amx.local'] // Replace 'example.com' with your desired host(s)
    }
});