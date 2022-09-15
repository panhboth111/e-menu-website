<template>
  <div class="d-flex justify-center">
    <ReusablesConfirmDialog :handleSubmit="handleEditUser" />

    <v-card>
      <v-container>
        <v-card-title>
          <v-btn icon class="mr-12" nuxt link to="/users"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          Edit Users</v-card-title
        >
        <v-form>
          <v-text-field
            type="text"
            label="Fullname"
            name="fullname"
            outlined
            dense
            v-model="user.fullname"
          ></v-text-field>
          <v-text-field
            type="text"
            label="email"
            name="email"
            outlined
            dense
            v-model="user.email"
          ></v-text-field>

          <v-select
            :items="roles"
            label="Role"
            outlined
            v-model="user.role"
          ></v-select>
          <ReusablesSubmitBtn />
          <p :class="`${msg.error ? 'red--text' : 'green--text'}`">
            {{ msg.content }}
          </p>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    roles: ["admin", "user"],
    msg: {
      show: false,
      error: false,
      content: "",
    },
  }),
  async asyncData({ $axios, params }) {
    try {
      const user = await $axios.$get("/users/" + params.user);
      return {
        user,
      };
    } catch (error) {}
  },
  methods: {
    async handleEditUser() {
      this.msg.show = true;
      try {
        const response = await this.$axios.$patch("/users/" + this.user.id, {
          ...this.user,
        });
        console.log(response);
        if (response.statusCode == 201) {
          this.newUser = {
            name: null,
            email: null,
            role: null,
          };
          this.$router.push("/users");
          this.$store.dispatch("toggleConfirmDialog", false);
          return;
        }
        this.msg.error = true;
        this.msg.content =
          response.msg || "something went wrong please try again";
      } catch (error) {
        this.msg.error = true;
        this.msg.content =
          error.response.msg || "something went wrong please try again";
      }
      this.$store.dispatch("toggleConfirmDialog", false);
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
