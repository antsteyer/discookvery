<template>
  <v-card>
    <v-list three-line>
      <template v-for="(item, index) in recipes">
        <v-list-tile avatar :key="index" v-on:click="visualizeDetails(item)">
          <v-list-tile-avatar>
            <img :src="item.image" alt="People">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.country}}, {{item.region}}</v-list-tile-sub-title>
            <v-layout row align-center>
              <v-icon small>star</v-icon>
              <span>{{item.rate}}</span>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider :key="'sep'+index" v-if="index + 1 < recipes.length"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "List",
  computed: {
    recipes() {
      return this.$store.getters["recipes/getRecipes"];
    }
  },
  methods: {
    visualizeDetails(recipe) {
      this.$router.push({
        name: 'RecipeDetails',
        params: {
          id: recipe.id,
          recipe: recipe
        }
      });
    }
  }
};
</script>

<style scoped>
.v-icon {
  margin-right: 5px;
}
</style>
