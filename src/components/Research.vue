<template>
  <v-container>
    <ResearchBar v-on:search="refreshList"/>
    <List ref="recipeList"/>
  </v-container>
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
  methods: {
    refreshList(value, criterion) {
      this.$refs.recipeList.filterList(value, criterion);
    }
  }
};
</script>

<style scoped>
</style>
