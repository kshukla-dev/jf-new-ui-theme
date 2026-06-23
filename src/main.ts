import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import './styles/global.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0, behavior: 'smooth' }
    },
  },
  ({ app, router, head, isClient }) => {
    // Custom setup hooks here if needed.
    router.beforeEach((to, from, next) => {
      const title = (to.meta?.title as string | undefined) ?? 'Hire talent, anywhere'
      if (head) {
        head.push({ title })
      }
      next()
    })
  }
)
