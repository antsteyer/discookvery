import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state = {
  recipes: []
};

const namespaced = true;

export const recipes = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
