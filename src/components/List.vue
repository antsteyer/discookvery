<!--<template>
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
</style>-->

<template>
  <div>
    <md-list class="md-triple-line">
      <md-list-item v-bind:key="index" v-for="(item, index) in recipes" v-on:click="displayRecipe">
        <md-avatar>
          <img v-bind:src="item.image" alt="People">
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{item.name}}</span>
          <span>{{item.country}}, {{item.region}}</span>
        </div>

        <div>
          <p>{{item.rate}}</p>
        </div>
      </md-list-item>

      <md-divider class="md-inset"></md-divider>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'List',
    computed: {
      recipes() {
        return this.$store.getters["recipes/getRecipes"];
      }
    },
    methods: {
      displayRecipe: () => {
        console.log('Clicked!')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>
