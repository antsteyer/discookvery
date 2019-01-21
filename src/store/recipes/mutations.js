
export const mutations = {
  /**
   * Reset list of recipes
   *
   * @param state - The current state of the module
   */
  resetRecipes(state) {
    state.recipes = [];
  },

  /**
   * Set the list of recipes
   *
   * @param state   - The current state of the module
   * @param payload - The list of tables that will be set
   */
  setRecipes(state, payload) {
    state.recipes = payload;
  },

  /**
   * Add a recipe to the list of recipes
   *
   * @param state   - The current state of the module
   * @param payload - The recipe to add to the list
   */
  addRecipe(state, payload) {
    state.recipes.push(payload);
  },

  setLastResearch(state, payload) {
    state.lastResearch = payload
  }
};
