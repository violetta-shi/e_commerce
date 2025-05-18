import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: Number(env.VITE_PORT),
      proxy: {
        "^/api": {
          target: env.VITE_BACK_END_URL,
          changeOrigin: true,
          secure: false,
        },
        "^/static": {
          target: env.VITE_BACK_END_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  })
};
