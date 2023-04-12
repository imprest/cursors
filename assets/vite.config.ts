import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ command }: any) => {
  const isDev = command !== 'build'
  if (isDev) {
    // Terminate the watcher when phx quits
    process.stdin.on('close', () => {
      process.exit(0)
    })

    process.stdin.resume()

  }

  return {
    plugins: [solidPlugin()],
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
      minify: true,
      outDir: "../priv/static/assets",
      emptyOutDir: true,
      manifest: false,
      rollupOptions: {
        input: ['src/index.tsx', 'src/app.js'],
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        }
      }
    },
  }
});
