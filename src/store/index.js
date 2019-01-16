import Vue from "vue";
import Vuex from "vuex";
import { recipes } from "./recipes"

Vue.use(Vuex);

const store = {
  modules: {
    recipes
  }
}

export default new Vuex.Store(store);
