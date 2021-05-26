import 'regenerator-runtime'
import cacheHelper from './utils/cache-helper'
const { assets } = global.serviceWorkerOption

self.addEventListener('install', (event) => {
  event.waitUntil(cacheHelper.cachingAppShell([...assets, '/', 'https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400&display=swap']))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(cacheHelper.deleteOldCache())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheHelper.revalidateCache(event.request))
})
