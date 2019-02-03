<template>
  <div id="app">
    <v-app>
      <!-- <v-toolbar app></v-toolbar> -->
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer fixed app height="fit-content">
        <v-bottom-nav :value="true" color="white">
          <v-btn color="teal" flat value="home" to="/" @click="homeClicked">
            <span>Accueil</span>
            <v-icon>home</v-icon>
          </v-btn>

          <v-btn color="teal" flat value="search" to="/search" @click="searchClicked">
            <span>Recherche</span>
            <v-icon>search</v-icon>
          </v-btn>

          <!-- <v-btn color="teal" flat value="favorites" to="/favorites">
            <span>Favoris</span>
            <v-icon>favorite</v-icon>
          </v-btn>-->
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
  computed: {
    logs() {
      if (!localStorage.getItem("logs")) return;
      const logs = JSON.parse(localStorage.getItem("logs"));
      return logs;
    }
  },
  mounted() {
    if (localStorage.getItem("logs")) {
      try {
        let logs = JSON.parse(localStorage.getItem("logs"));
        let newLog = [];
        newLog.push(Date());
        newLog.push("Lancement de l'application");
        logs.push(newLog);
        localStorage.setItem("logs", JSON.stringify(logs));
      } catch (e) {
        localStorage.removeItem("logs");
      }
    } else {
      let newLog = [];
      newLog.push(Date());
      newLog.push("Lancement de l'application");
      let logsArray = [];
      logsArray.push(newLog);
      localStorage.setItem("logs", JSON.stringify(logsArray));
    }

    this.$store.commit("recipes/setRecipes", json);
  },
  methods: {
    homeClicked() {
      let logs = this.logs;
      let currentLog = logs[logs.length - 1];
      currentLog.push("Boutton Acceuil cliqué");
      console.log(this.logs, currentLog);
      localStorage.setItem("logs", JSON.stringify(this.logs));
    },
    searchClicked() {
      let logs = this.logs;
      let currentLog = logs[logs.length - 1];
      currentLog.push("Boutton Recherche cliqué");
      console.log(this.logs, currentLog);
      localStorage.setItem("logs", JSON.stringify(this.logs));
    }
  }
};
</script>

<style>
.container {
  padding: 0 !important;
  height: 100%;
}
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
}
</style>
