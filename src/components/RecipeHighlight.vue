<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1>Recette du moment</h1>
      <v-card v-if="firstRecipe">
        <v-img v-if="firstRecipe.image" :src="firstRecipe.image" aspect-ratio="2"></v-img>

        <v-card-title>
          <div>
            <h3>{{firstRecipe.name}}</h3>
            <span>{{firstRecipe.country}}{{firstRecipe.region ? `, ${firstRecipe.region}` : '' }}</span>
          </div>
        </v-card-title>

        <v-card-text v-if="firstRecipe.history">{{firstRecipe.history}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="visualizeDetails()">
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    firstRecipe() {
      const recipes = this.$store.getters["recipes/getRecipes"];
      if (!recipes || recipes.length === 0) return null;

      const randomIndex = this.getRandomInt(recipes.length);

      return recipes[randomIndex];
    },
    logs() {
      if (!localStorage.getItem("logs")) return;
      const logs = JSON.parse(localStorage.getItem("logs"));
      return logs;
    }
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    visualizeDetails() {
      let logs = this.logs;
      let currentLog = logs[logs.length - 1];
      currentLog.push("Recette du moment cliquée");
      console.log(this.logs, currentLog);
      localStorage.setItem("logs", JSON.stringify(this.logs));
      this.$router.push({
        name: "RecipeDetails",
        params: {
          id: this.firstRecipe.id,
          recipe: this.firstRecipe
        }
      });
    }
  }
};
</script>
<style scoped>
.v-card__text {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 16px; /* fallback */
  max-height: 80px; /* fallback */
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.v-card__title div {
  text-align: left;
}

.layout {
  margin: 16px;
}
</style>
