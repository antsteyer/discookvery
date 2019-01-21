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
  methods: {
    refreshList(value, criterion) {
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
