<template>
  <v-card v-if="results.length > 0">
    <v-list three-line>
      <template v-for="(item, index) in results">
        <v-list-tile avatar :key="index" v-on:click="visualizeDetails(item)">
          <v-list-tile-avatar>
            <img v-if="item.image" :src="item.image" alt="People">
            <v-icon class="placeholderAvatar" v-else>insert_photo</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.country}}{{item.region ? `, ${item.region}`: ''}}</v-list-tile-sub-title>
            <v-layout row align-center>
              <v-icon small>star</v-icon>
              <span>{{item.rate || 'Pas de note'}}</span>
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
  data: function() {
    return {
      results: this.recipes || []
    };
  },
  mounted() {
    this.results = this.recipes;
    this.$emit("numberOfResults", this.results.length);
  },
  methods: {
    result() {
      this.results = this.$store.getters["recipes/getRecipes"];
    },
    filterList(value, criterion) {
      if (!value || !criterion) return;
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
          let includesValue = false;
          r.ingredients.forEach(i => {
            const ing = i.toLowerCase();
            if (ing.includes(value.toLowerCase())) {
              includesValue = true;
              return;
            }
          });
          return includesValue;
        }
      });
      console.log("list filtered", this.results);
      this.$emit("numberOfResults", this.results.length);
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

.placeholderAvatar {
  background-color: lightgrey;
  margin-right: 0;
}
</style>
