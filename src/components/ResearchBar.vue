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
          <v-icon v-on:click="iconClick('ingredientsSelected')" :style="ingredientsIconStyle">shopping_basket</v-icon>
          <v-label>Par ingrédient</v-label>
        </v-container>
      </v-flex>
    </v-layout>
    <v-text-field
      :disabled="searchFieldDisabled"
      outline
      :label="searchLabel"
      :placeholder="placeholder"
      append-icon="search"
      :v-model="researchValue"
      @input="searchForResults"
    ></v-text-field>
  </v-container>
</template>

<script>
  import {eventBus} from "../main";
  export default {
    name: 'ResearchBar',
    data () {
      return {
        countrySelected: false,
        nameSelected: false,
        ingredientsSelected: false,
        placeholder: '',
        searchFieldDisabled: true,
        searchLabel: 'Choisissez un critère',
        researchValue: ''
      }
    },
    computed: {
      countryIconStyle () {
        return this.countrySelected ? 'border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;' : 'border-style: solid; border-radius: 5px; padding: 10%;'
      },
      nameIconStyle () {
        return this.nameSelected ? 'border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;' : 'border-style: solid; border-radius: 5px; padding: 10%;'
      },
      ingredientsIconStyle () {
        return this.ingredientsSelected ? 'border-style: solid; border-radius: 5px; padding: 10%; background-color: lightgrey;border-color: #157e0d;' : 'border-style: solid; border-radius: 5px; padding: 10%'
      }
    },
    methods: {
      iconClick (variableName) {
        let selected = this[variableName]
        this[variableName] = !this[variableName]
        this.searchFieldDisabled = !this.searchFieldDisabled
        this.searchLabel === 'Choisissez un critère' ? this.searchLabel = "Entrez votre recherche" : this.searchLabel = "Choisissez un critère"
        switch (variableName) {
          case 'countrySelected' :
            this.nameSelected = false
            this.ingredientsSelected = false
            if (selected) {
              this.placeholder = ''
            } else {
              this.placeholder = 'pays, région'
            }
            break
          case 'nameSelected' :
            this.ingredientsSelected = false;
            this.countrySelected = false;
            if (selected) {
              this.placeholder = '';
            } else {
              this.placeholder = 'nom';
            }
            break
          case 'ingredientsSelected' :
            this.nameSelected = false;
            this.countrySelected = false;
            if (selected) {
              this.placeholder = '';
            } else {
              this.placeholder = 'ingrédient1,...,ingrédientN';
            }
            break
          default:
            this.placeholder = '';
        }
      },
      searchForResults() {
        let criterion = this.nameSelected ? 'name' : this.countrySelected ? 'country' : 'ingredient';
        this.$emit("search", this.researchValue, criterion);
        eventBus.$emit("searchByCountryOrRegion", this.researchValue, criterion);
      }
    }
  }
</script>

<style scoped>

</style>
