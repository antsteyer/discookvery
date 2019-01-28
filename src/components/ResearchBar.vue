<template>
  <v-container>
    <v-slide-y-transition>
      <v-layout v-if="showFilters" row justify-space-between>
        <v-flex xs4>
          <v-container>
            <v-layout column>
              <v-icon v-on:click="iconClick('nameSelected')" :style="nameIconStyle">import_contacts</v-icon>
              <v-label>Par nom</v-label>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs4>
          <v-container>
            <v-layout column>
              <v-icon v-on:click="iconClick('countrySelected')" :style="countryIconStyle">flag</v-icon>
              <v-label>Par pays ou région</v-label>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs4>
          <v-container>
            <v-layout column>
              <v-icon
                v-on:click="iconClick('ingredientsSelected')"
                :style="ingredientsIconStyle"
              >shopping_basket</v-icon>
              <v-label>Par ingrédient</v-label>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-layout row align-start justify-center>
      <v-flex xs10>
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
          item-value="value"
          item-text="value"
          return-object
          :hint="`${numberOfResults} résulat(s)`"
        >
          <template v-if="countrySelected" slot="item" slot-scope="{ item }">
            <flag class="flagIcon" :squared="false" :iso="isoFromCountry(item.value)"/>
            <span class="pr-2">{{ item.value}}</span>
            <span class="isCountryOrRegion">{{item.isCountry ? ' (pays)' : ' (région)'}}</span>
          </template>
        </v-combobox>
      </v-flex>
      <v-flex xs2>
        <v-layout column align-center>
          <v-btn class="buttonHideFilter" icon @click="onFilterClicked">
            <v-icon>{{!showFilters ? 'filter_list': 'close'}}</v-icon>
          </v-btn>
          <span>Filtres</span>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "ResearchBar",
  props: {
    numberOfResults: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    if (this.lastResearch) {
      this.researchValue = this.lastResearch.val;
      (this.nameSelected = this.lastResearch.nameSelected),
        (this.ingredientsSelected = this.lastResearch.ingredientsSelected),
        (this.countrySelected = this.lastResearch.countrySelected);
      this.$emit("search", this.researchValue, this.lastResearch.criterion);
    }
  },
  data() {
    return {
      countrySelected: false,
      nameSelected: true,
      ingredientsSelected: false,
      placeholder: "nom",
      searchFieldDisabled: false,
      searchLabel: "Choisissez un critère",
      researchValue: "",
      searchForResults: null,
      showFilters: false
    };
  },
  computed: {
    countryIconStyle() {
      return this.countrySelected
        ? "border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;"
        : "border-style: solid; border-radius: 5px; padding: 10%;";
    },
    nameIconStyle() {
      return this.nameSelected
        ? "border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;"
        : "border-style: solid; border-radius: 5px; padding: 10%;";
    },
    ingredientsIconStyle() {
      return this.ingredientsSelected
        ? "border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;"
        : "border-style: solid; border-radius: 5px; padding: 10%";
    },
    lastResearch() {
      return this.$store.getters["recipes/getLastResearch"];
    }
  },
  methods: {
    iconClick(variableName) {
      if (this[variableName]) return;
      this.showFilters = false;
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
        .map(recipe => {
          return {
            value: recipe.country,
            isCountry: true
          };
        })
        .sort(function(a, b) {
          if (a.value > b.value) {
            return 1;
          }
          if (a.value < b.value) {
            return -1;
          }
          return 0;
        })
        .concat(
          recipes
            .map(recipe => {
              return {
                value: recipe.region,
                isCountry: false
              };
            })
            .sort(function(a, b) {
              if (a.value > b.value) {
                return 1;
              }
              if (a.value < b.value) {
                return -1;
              }
              return 0;
            })
        )
        .filter(recipe => recipe.value);
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
        case "Ile de france":
          return "fr";
        case "Normandie":
          return "fr";
        case "Bretagne":
          return "fr";
        case "Etats-Unis":
          return "us";
        case "Japon":
          return "jp";
        case "Mexique":
          return "mx";
        case "Chine":
          return "cn";
        case "Irlande":
          return "ie";
        case "Espagne":
          return "es";
        default:
          return;
      }
    },
    onFilterClicked() {
      this.showFilters = !this.showFilters;
    }
  },
  watch: {
    searchForResults(val) {
      if (typeof val === Object) {
        this.researchValue = val.value;
      } else {
        this.researchValue = val;
      }

      let criterion = this.nameSelected
        ? "name"
        : this.countrySelected
        ? "country"
        : "ingredient";
      console.log("searchForResults", this.researchValue, criterion);
      this.$store.commit("recipes/setLastResearch", {
        val: this.researchValue,
        criterion: criterion,
        nameSelected: this.nameSelected,
        ingredientsSelected: this.ingredientsSelected,
        countrySelected: this.countrySelected
      });
      this.$emit("search", this.researchValue, criterion);
    }
  }
};
</script>

<style scoped>
.flagIcon {
  margin-right: 10px;
  height: 16px;
}

.isCountryOrRegion {
  color: rgba(0, 0, 0, 0.5);
}

.layout .v-label {
  margin-top: 5px;
}

.container {
  padding: 16px !important;
  height: fit-content;
}

.buttonHideFilter {
  margin-bottom: 0;
}
</style>

<style>
.v-select--is-menu-active .v-input__icon--append .v-icon {
  -webkit-transform: none !important;
  transform: none !important;
}
</style>


