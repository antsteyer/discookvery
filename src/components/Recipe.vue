<template>
  <v-layout>
    <v-card :elevation="6" :tile="false">
      <v-img :src="recipe.image"></v-img>
      <v-card-title primary-title>
        <div class="card-header">
          <h3 class="headline">{{recipe.name}}</h3>
          <h2 class="card-subtitle">{{recipe.region}}, {{recipe.country}}</h2>
          <div class="text-xs-center">
            <v-rating v-model="rate"></v-rating>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-layout align-center justify-center row>
          <v-chip color="indigo" text-color="white" :small="true">
            <v-avatar>
              <v-icon>account_circle</v-icon>
            </v-avatar>
            {{recipe.author}}
          </v-chip>
          <v-chip color="indigo" text-color="white" :small="true">
            <v-avatar>
              <v-icon>alarm</v-icon>
            </v-avatar>
            {{recipe.total_time}}
          </v-chip>
          <v-chip color="indigo" text-color="white" :small="true">
            <v-avatar>
              <v-icon>face</v-icon>
            </v-avatar>
            {{recipe.people_quantity}} pers.
          </v-chip>
        </v-layout>
        <template v-for="(item, index) in recipe.tags">
          <v-chip :key="index" label outline color="blue" :small="true">{{item}}</v-chip>
        </template>
        <div class="history" v-if="recipe.history">
          <h2>Histoire de la recette</h2>
          <p>{{recipe.history}}</p>
        </div>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header" class="expansion-panel-title">Ingredients</div>
            <v-card>
              <v-card-text>
                <v-list>
                  <template v-for="(item, index) in recipe.ingredients">
                    <v-list-tile :key="index">
                      <v-list-tile-content>
                        <v-list-tile-title>{{item}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header" class="expansion-panel-title">Ustensiles</div>
            <v-card>
              <v-card-text>
                <v-list>
                  <template v-for="(item, index) in recipe.utensil">
                    <v-list-tile :key="index">
                      <v-list-tile-content>
                        <v-list-tile-title>{{item}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header" class="expansion-panel-title">Etapes</div>
            <ol>
              <li v-for="(item, index) in recipe.steps" :key="index">{{item}}</li>
            </ol>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
    </v-card>
  </v-layout>
</template>


<script>
export default {
  data: () => ({
    recipe: {},
    show: false,
    rate: 0
  }),
  mounted() {
    this.recipe = this.$route.params.recipe;
    this.rate = Number(this.recipe.rate);
  }
};
</script>


<style scoped>
.v-card {
  width: 95%;
  margin-left: 2.5%;
  text-align: left;
}

.headline {
  text-align: center;
}

p {
  text-align: justify;
}

.card-subtitle {
  text-align: center;
  font-size: 17px;
}
.v-card__title,
.v-card__title--primary {
  display: inherit;
  text-align: center;
}
.layout,
.align-center,
.justify-center,
.row {
  margin-bottom: 12px;
}

.history {
  display: inherit;
  text-align: center;
  margin: 25px;
}
ol {
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.expansion-panel-title {
  font-size: 21px;
  font-style: oblique;
}
</style>