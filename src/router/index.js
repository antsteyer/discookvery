import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import RecipeHightlight from '@/components/RecipeHighlight';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: RecipeHightlight
    },
    {
      path: '/search',
      name: "Search",
      component: List
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Hello
    }]
})
