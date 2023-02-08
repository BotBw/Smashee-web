import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView'
import MatchmakingIndex from '@/views/Matchmaking/MatchmakingIndex'
import NotFoundView from '@/views/Exceptions/NotFoundView'
import HomeIndex from '@/views/Home/HomeIndex'
import RankingIndex from '@/views/Ranking/RankingIndex'
import UserAccountLoginView from '@/views/User/Account/UserAccountLoginView'
import UserAccountRegisterView from '@/views/User/Account/UserAccountRegisterView'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      requireAuthorization: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeIndex
    ,
    meta: {
      requireAuthorization: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
    meta: {
      requireAuthorization: false
    }
  },
  {
    path: '/matchmaking',
    name: 'Matchmaking',
    component: MatchmakingIndex,
    meta: {
      requireAuthorization: true
    }
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: RankingIndex,
    meta: {
      requireAuthorization: true
    }
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      requireAuthorization: false
    }
  },
  {
    path: '/user/account/login',
    name: 'Login',
    component: UserAccountLoginView,
    meta: {
      requireAuthorization: false
    }
  },
  {
    path: '/user/account/register',
    name: 'Register',
    component: UserAccountRegisterView,
    meta: {
      requireAuthorization: false
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'defalt',
    redirect: '/NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuthorization && !store.state.user.is_login) {
    next({name: "Login"})
  } else {
    next()
  }
})

export default router
