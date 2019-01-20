<template>
  <v-container>
    <v-layout row justify-space-between>
      <v-flex xs4>
        <v-container>
          <v-icon v-on:click="iconClick('nameSelected')" :style="nameIconStyle">import_contacts</v-icon>
          <v-label>Par nom</v-label>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <v-container>
          <v-icon v-on:click="iconClick('countrySelected')" :style="countryIconStyle">flag</v-icon>
          <v-label>Par pays ou région</v-label>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <v-container>
          <v-icon
            v-on:click="iconClick('ingredientsSelected')"
            :style="ingredientsIconStyle"
          >shopping_basket
          </v-icon>
          <v-label>Par ingrédient</v-label>
        </v-container>
      </v-flex>
    </v-layout>
    <v-combobox
      :disabled="searchFieldDisabled"
      outline
      :label="searchLabel"
      :placeholder="placeholder"
      append-icon="search"
      v-model="researchValue"
      :search-input.sync="searchForResults"
      :items="getItems()"
      hide-no-data
    >
      <template v-if="countrySelected" slot="item" slot-scope="{ item }">
        <flag style="border-style: solid; border-color: lightslategrey; border-width: 2px" :iso="isoFromCountry(item)"/>
        <span class="pr-2">{{ item}}</span>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
  import {eventBus} from "../main";

  export default {
    name: "ResearchBar",
    data () {
      return {
        countrySelected: false,
        nameSelected: true,
        ingredientsSelected: false,
        placeholder: "nom",
        searchFieldDisabled: false,
        searchLabel: "Choisissez un critère",
        researchValue: "",
        searchForResults: null
      };
    },
    computed: {
      countryIconStyle () {
        return this.countrySelected
          ? "border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;"
          : "border-style: solid; border-radius: 5px; padding: 10%;";
      },
      nameIconStyle () {
        return this.nameSelected
          ? "border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;"
          : "border-style: solid; border-radius: 5px; padding: 10%;";
      },
      ingredientsIconStyle () {
        return this.ingredientsSelected
          ? "border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;"
          : "border-style: solid; border-radius: 5px; padding: 10%";
      }
    },
    methods: {
      iconClick (variableName) {
        let selected = this[variableName];
        this[variableName] = !this[variableName];
        this.searchFieldDisabled = selected;
        this.researchValue = "";
        this.searchLabel === "Choisissez un critère"
          ? (this.searchLabel = "Entrez votre recherche")
          : (this.searchLabel = "Choisissez un critère");
        switch (variableName) {
          case "countrySelected":
            this.nameSelected = false;
            this.ingredientsSelected = false;
            if (selected) {
              this.placeholder = "";
            } else {
              this.placeholder = "pays, région";
            }
            break;
          case "nameSelected":
            this.ingredientsSelected = false;
            this.countrySelected = false;
            if (selected) {
              this.placeholder = "";
            } else {
              this.placeholder = "nom";
            }
            break;
          case "ingredientsSelected":
            this.nameSelected = false;
            this.countrySelected = false;
            if (selected) {
              this.placeholder = "";
            } else {
              this.placeholder = "ingrédient1,...,ingrédientN";
            }
            break;
          default:
            this.placeholder = "";
        }
      },

      getCountriesAndRegions() {
        const recipes = this.$store.getters["recipes/getRecipes"];
        return recipes
          .map(recipe => recipe.country)
          .concat(recipes.map(recipe => recipe.region));
      },
      getItems() {
        return this.nameSelected || this.ingredientsSelected
          ? []
          : this.getCountriesAndRegions();
      },
      isoFromCountry(country) {
        switch (country) {
          case "France":
            return "fr";
          case "Corse":
            return "fr";
          case "Ile de France":
            return "fr";
          case "Normandie":
            return "fr";
          case "Bretagne":
            return "fr";
          case "Etats-Unis":
            return "us";
          case "Japon":
            return "jp";
          default:
            return;
        }
      }
    },
    watch: {
      searchForResults(val) {
        this.researchValue = val;
        let criterion = this.nameSelected
          ? "name"
          : this.countrySelected
            ? "country"
            : "ingredient";
        console.log("searchForResults", this.researchValue, criterion);
        this.$emit("search", this.researchValue, criterion);
      }
    }
  };
</script>

<style scoped>
  .flag-icon {
    margin-right: 10px;
  }
</style>


