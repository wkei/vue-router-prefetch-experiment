import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import bus from '../bus'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about/:id',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const prefetches = []
  to.matched.forEach(async matched => {
    const { default: comp } = matched.components
    if (typeof comp === 'function') {
      prefetches.push(
        comp().then(({ default: comp }) => {
          if (comp.prefetch) {
            return comp.prefetch(to, from)
          }
        })
      )
    } else if (typeof comp === 'object') {
      if (comp.prefetch) {
        prefetches.push(comp.prefetch(to, from))
      }
    }
  })
  if (prefetches) {
    bus.loading = true
    await Promise.all(prefetches)
    bus.loading = false
  }
  next()
})

export default router
