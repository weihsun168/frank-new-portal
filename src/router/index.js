import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from '../auth/authGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import ('../views/Booking.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/event/:id',
      name: 'eventSingle',
      component: () => import('../views/EventSingle.vue'),
      beforeEnter: authGuard
    }
  ]
});