<template>
  <div class="pt-12">
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        v-for="(item, index) in items"
        :key="index"
      >
        <v-card nuxt link :to="item.to" class="rounded-lg">
          <v-container class="px-6 py-8">
            <v-icon size="50" color="primary">{{ item.icon }}</v-icon>
            <div class="title font-weight-bold mt-4 grey--text text--darken-2">
              {{ item.title.toUpperCase() }}
            </div>
            <div class="subtitle-2 font-weight-light">
              {{ item.desc }}
            </div>
            <div></div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    items: [
      {
        title: "Orders",
        to: "/orders",
        icon: "mdi-silverware-variant",
        desc: "Manage customer orders",
      },
      {
        title: "Menu",
        to: "/menu",
        icon: "mdi-food",
        desc: "Manage food menu",
      },
      {
        title: "Categories",
        to: "/categories",
        icon: "mdi-credit-card-scan",
        desc: "Manage food categories",
      },
      {
        title: "Users",
        to: "/users",
        icon: "mdi-account-circle",
        desc: "Manage users",
      },
      {
        title: "Coordinates",
        to: "/coords",
        icon: "mdi-map",
        desc: "Set the coordinates for your restaurant",
      },
      {
        title: "Support",
        to: "/support",
        icon: "mdi-information",
        desc: "Contact us for support",
      },
    ],
  }),
});
</script>

<style></style>
