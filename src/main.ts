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
      if (to.hash) return { el: to.hash }
      return false
    },
  },
  ({ app, router, head, isClient }) => {
    // Custom setup hooks here if needed.
    router.beforeEach((to, from, next) => {
      const titleStr = (to.meta?.title as string | undefined) ?? 'Hire talent, anywhere'
      const title = `Jackson & Frank - ${titleStr}`
      if (head) {
        head.push({
          title,
          meta: [
            { name: 'description', content: 'Why should borders limit your business? Hire the best talent worldwide with fast, compliant, and hassle-free global HR solutions.' },
            { property: 'og:title', content: title }
          ]
        })
      }
      next()
    })
  }
)
