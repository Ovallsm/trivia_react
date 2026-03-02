import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      devOptions: {
        enabled: true,      
        type: 'module',      
      },
      manifest: {
        name: 'TriviaApp',
        short_name: 'TriviaPWA',
        description: 'Trivia  App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        navigateFallbackDenylist: [
          /^chrome-extension:\/\//,
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.protocol.startsWith('http'), 
            handler: 'NetworkFirst',
            options: {
              cacheName: 'http-cache'
            }
          }
        ]
      }
    })
  ],
  server: {
    host: true, 
    port: 5173,
    hmr: {
      protocol: 'ws', 
      host: 'localhost',
      port: 5173,
    }
  }
})