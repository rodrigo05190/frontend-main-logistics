import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: {
        '@assets': 'src/assets',
        '@components': '/src/components',
        '@contexts': '/src/contexts',
        '@hooks': '/src/hooks',
        '@icons': '/src/assets/Icons.tsx',
        '@pages': '/src/pages',
        '@styles': '/src/styles',
        '@types': '/src/types',
        '@theme': '/src/theme/index.ts',
      },
    },
  })
}
