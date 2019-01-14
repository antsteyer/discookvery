<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in recipes">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.region + ',' + item.country}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "List",
  computed: {
    recipes() {
      return this.$store.getters["recipes/getRecipes"];
    }
  }
};
</script>

<style scoped>
</style>
