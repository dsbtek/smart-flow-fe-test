import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminRoutes from './admin/routes'
import {isAuthenticated, isLoggedIn} from './middleware/auth'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        middleware: [
          isLoggedIn
        ]
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
        middleware: [
          isAuthenticated
        ]
    },
    children: [
      {
        path: '/',
        name: 'DashboardIndex',
        component: AdminRoutes.DashboardIndex,
        meta: {
            middleware: [
              isAuthenticated
            ]
        },
      },
      {
        path: '/team',
        name: 'Team',
        component: AdminRoutes.Team,
        meta: {
            middleware: [
              isAuthenticated
            ]
        },
      },
      {
        path: '/blog',
        name: 'Blogs',
        component: AdminRoutes.Blogs,
        meta: {
            middleware: [
              isAuthenticated
            ]
        },
      },
      {
        path: '/testimonials',
        name: 'Testimonials',
        component: AdminRoutes.Testimonials,
        meta: {
            middleware: [
              isAuthenticated
            ]
        },
      },
      {
        path: '/settings',
        name: 'Settinga',
        component: AdminRoutes.Settings,
        meta: {
            middleware: [
              isAuthenticated
            ]
        },
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context
  })
})

export default router
