<template>
  <div class="d-flex justify-center">
    <ReusablesConfirmDialog :handleSubmit="handleEditProfile" />
    <v-card>
      <v-container>
        <v-card-title>
          Your Profile
          <v-btn icon class="ml-2" @click="edit = !edit"
            ><v-icon>mdi-pencil</v-icon></v-btn
          ></v-card-title
        >
        <v-form>
          <v-text-field
            type="text"
            label="fullname"
            name="fullname"
            v-model="user.fullname"
            outlined
            dense
            :disabled="!edit"
          ></v-text-field>
          <v-text-field
            type="text"
            label="email"
            name="email"
            v-model="user.email"
            outlined
            dense
            :disabled="!edit"
          ></v-text-field>
          <p :class="`${msg.error ? 'red--text' : 'green--text'}`">
            {{ msg.content }}
          </p>
          <div v-if="edit"><ReusablesSubmitBtn /></div>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    edit: false,
    msg: {
      show: false,
      error: false,
      content: "",
    },
  }),
  async asyncData({ $axios }) {
    try {
      const user = await $axios.$get("/auth/profile");
      const { fullname, email } = user.user;
      return {
        user: { fullname, email },
      };
    } catch (error) {
      return {
        user: {},
      };
    }
  },
  methods: {
    async handleEditProfile() {
      this.msg.show = true;
      try {
        console.log(this.user);
        const response = await this.$axios.$patch("/auth/profile", {
          ...this.user,
        });
        this.msg.error = false;
        this.msg.content = "Profile updated successfully";
        console.log(response);
      } catch (error) {
        this.msg.error = true;
        this.msg.content = "something went wrong please try again";
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
