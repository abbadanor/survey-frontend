import {createRouter, createWebHistory} from 'vue-router'
import {useStore} from '../store/'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Surveys from '../views/Surveys.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/surveys',
        component: Surveys
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (to.meta.requiresAuth && !store.user.token) {
    next({path: '/login'})
  } else if (to.meta.isGuest && store.user.token){
    next({path: '/dashboard'})
  } else {
    next()
  }
})

export default router
