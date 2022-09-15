<template>
  <v-app class="">
    <v-app-bar :clipped-left="clipped" fixed app flat class="white px-12 pt-4">
      <nuxt-link to="/">
        <div>
          <div class="headline font-weight-bold">MANAGEMENT DASHBOARD</div>
          <div class="subtitle">PVK Restaurant</div>
        </div>
      </nuxt-link>
      <v-spacer />
      <div class="text-right mr-6">
        <div class="subtitle font-weight-bold">
          {{ $auth.user.fullname }}
        </div>
        <div class="font-weight-light">{{ $auth.user.role }}</div>
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
            <v-avatar color="primary" size="56" class="white--text">{{
              $auth.user.fullname[0]
            }}</v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item nuxt link to="/profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="px-16 pt-16">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "Profile",
          to: "/profile",
        },
        {
          title: "Logout",
          to: "/login",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    async logout() {
      const response = await this.$auth.logout();
      console.log(response);
    },
  },
};
</script>
