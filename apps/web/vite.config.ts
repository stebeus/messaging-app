import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [babel({ presets: [reactCompilerPreset()] }), react()],
	preview: {
		port: 8080,
	},
	server: {
		port: 4000,
	},
});
