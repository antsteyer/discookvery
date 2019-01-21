export const getters = {
  /**
   * Return all the recipes
   *
   * @param state - The current state of the module
   */
  getRecipes(state) {
    const { recipes } = state;
    return recipes;
  },

  getLastResearch(state) {
    const { lastResearch } = state;
    return lastResearch
  }
};
