<template>
  <v-container>
    <v-layout row justify-space-between>
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
  data() {
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
    }
  },
  methods: {
    iconClick(variableName) {
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
        .concat(
          recipes.map(recipe => {
            return {
              value: recipe.region,
              isCountry: false
            };
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
          return "cn"
        default:
          return;
      }
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
</style>


