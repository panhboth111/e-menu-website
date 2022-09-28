<template>
    <div>
      <v-card>
        <v-container fluid class="pt-6">
          <v-row class="px-10">
            <v-col cols="12" sm="12" md="3" lg="4">
              <v-text-field
                label="search"
                outlined
                dense
                v-model="search"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-data-table :headers="headers" :items="items">
            <template v-slot:item.foods="{ item }">
                <span v-for="(food,index) in item.foods" class="  px-2 py-1" >{{food.name}}, </span>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      search: "",
    }),
    props: {
      headers: Array,
      items: Array,
    },
    methods: {

    },
  };
  </script>
  
  <style></style>
  