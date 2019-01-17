<template>
  <div id="app">
    <v-app>
      <!-- <v-toolbar app></v-toolbar> -->
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app height="fit-content">
        <v-bottom-nav :value="true" color="white">
          <v-btn color="teal" flat value="home" to="/">
            <span>Accueil</span>
            <v-icon>home</v-icon>
          </v-btn>

          <v-btn color="teal" flat value="search" to="/search">
            <span>Recherche</span>
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn color="teal" flat value="favorites" to="/favorites">
            <span>Favoris</span>
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Hello from "./components/Hello";
import json from "./assets/data.json";
export default {
  name: "app",
  components: {
    Hello
  },
  mounted() {
    console.log("Recipes", json);
    this.$store.commit("recipes/setRecipes", json);
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
