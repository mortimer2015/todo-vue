import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Test from './views/test.vue'
import Todo from './views/Todo.vue'
import Weater from './views/weather_base.vue'
import Hot from './views/weather/hot.vue'
import Cold from './views/weather/cold.vue'
import VueHome from './views/VueHome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home',
          name: 'home',
          component: VueHome
        },
        {
          path: '/test',
          name: 'home',
          component: Test
        },
        {
          path: '/todo',
          name: 'home',
          component: Todo
        },
        {
          path: '/weather',
          name: 'weather',
          component: Weater,
          children: [
            {path: 'hot', component: Hot},
            {path: 'cold', component: Cold}
          ]
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    },
    
  ]
})
