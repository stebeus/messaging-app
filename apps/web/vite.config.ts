import babel from '@rolldown/plugin-babel';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		babel({ presets: [reactCompilerPreset()] }),
		tanstackRouter({
			autoCodeSplitting: true,
			generatedRouteTree: './src/route-tree.gen.ts',
			quoteStyle: 'single',
			semicolons: true,
			target: 'react',
		}),
		react(),
	],
	preview: {
		port: 8080,
	},
	server: {
		port: 4000,
	},
});
