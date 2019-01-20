<template>
  <v-card v-if="results.length > 0">
    <v-list three-line>
      <template v-for="(item, index) in results">
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

        <v-divider :key="'sep'+index" v-if="index + 1 < results.length"></v-divider>
      </template>
    </v-list>
  </v-card>
  <span v-else>Pas de recettes correspondant aux critères de recherche</span>
</template>

<script>
export default {
  name: "List",
  computed: {
    recipes() {
      return this.$store.getters["recipes/getRecipes"];
    }
  },
  created() {
    // eventBus.$on("searchByCountryOrRegion", (message, criteria) => {
    //   console.log("hello:", message, criteria);
    //   //this.results = this.$store.getters["recipes/getRecipes"].filter(data => data.name.includes(search));
    // });
    // eventBus.$on("searchByName", message => {
    //   this.frombrother = message;
    // });
    // eventBus.$on("searchByOther", message => {
    //   this.frombrother = message;
    // });
  },
  data: function() {
    return {
      results: this.recipes || []
    };
  },
  mounted() {
    this.results = this.recipes;
  },
  methods: {
    result() {
      this.results = this.$store.getters["recipes/getRecipes"];
    },
    filterList(value, criterion) {
      console.log("Filter in List", value, criterion);
      this.results = this.recipes.filter(r => {
        if (criterion === "country") {
          return (
            r.country.toLowerCase().includes(value.toLowerCase()) ||
            r.region.toLowerCase().includes(value.toLowerCase())
          );
        }
        if (criterion === "name") {
          return r.name.toLowerCase().includes(value.toLowerCase());
        }
        if (criterion === "ingredient") {
          return r.ingredients
            .map(i => i.toLowerCase())
            .includes(value.toLowerCase());
        }
      });
      console.log("list filtered", this.results);
    },
    visualizeDetails(recipe) {
      this.$router.push({
        name: "RecipeDetails",
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
