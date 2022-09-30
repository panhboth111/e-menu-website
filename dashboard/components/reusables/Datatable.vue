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
          <v-btn color="primary" dark @click="handleNavigateCreate"
            >CREATE</v-btn
          >
        </v-row>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-btn @click="handleNavigateView(item)" icon
              ><v-icon size="20">mdi-eye</v-icon></v-btn
            >
            <v-btn @click="handleDelete(item)" icon
              ><v-icon size="20">mdi-delete</v-icon></v-btn
            >
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
    to: String,
    handleDelete: Function,
  },
  methods: {
    handleNavigateView(item) {
      this.$router.push(`/${this.to}/${item.id}`);
    },
    handleNavigateCreate() {
      this.$router.push(`/${this.to}/create`);
    },
  },
};
</script>

<style></style>
