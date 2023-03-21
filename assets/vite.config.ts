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
      outDir: '../priv/static',
      emptyOutDir: true,
      manifest: false,
      rollupOptions: {
        input: ['src/index.tsx'],
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name][extname]',
        }
      }
    },
  }
});
