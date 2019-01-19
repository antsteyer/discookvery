<template>
  <v-container>
    <ResearchBar v-on:search="refreshList"/>
    <List/>
  </v-container>
</template>

<script>
  import ResearchBar from "./ResearchBar.vue";
  import List from "./List";
  export default {
    name: 'Research',
    components: {
      ResearchBar,
      List
    },
    methods: {
      refreshList(value, criterion) {
        this.$emit("refresh", value, criterion)
      }
    }
  }
</script>

<style scoped>

</style>
