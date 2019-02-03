<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <ResearchBar v-on:search="refreshList" :numberOfResults="numberOfResults"/>
      <List ref="recipeList" @numberOfResults="onNumberOfResults"/>
    </v-flex>
  </v-layout>
</template>

<script>
import ResearchBar from "./ResearchBar.vue";
import List from "./List";

export default {
  name: "Research",
  components: {
    ResearchBar,
    List
  },
  data() {
    return {
      numberOfResults: 0
    };
  },
  computed: {
    logs() {
      if (!localStorage.getItem("logs")) return;
      const logs = JSON.parse(localStorage.getItem("logs"));
      return logs;
    }
  },
  methods: {
    refreshList(value, criterion) {
      let logs = this.logs;
      let currentLog = logs[logs.length - 1];
      const research = { value: value, criterion: criterion };
      currentLog.push("Liste à trier : " + JSON.stringify(research));
      console.log(this.logs, currentLog);
      localStorage.setItem("logs", JSON.stringify(this.logs));
      this.$refs.recipeList.filterList(value, criterion);
    },
    onNumberOfResults(number) {
      if (number === this.numberOfResults) return;

      this.numberOfResults = number;
    }
  }
};
</script>

<style scoped>
</style>
