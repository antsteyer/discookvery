import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Research from '@/components/Research'
import RecipeHightlight from '@/components/RecipeHighlight';
import Recipe from '@/components/Recipe';

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
      name: 'Search',
      component: Research // List
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Hello
    },
  {
    path: '/details/:id',
    name: 'RecipeDetails',
    component: Recipe
  }]
})
