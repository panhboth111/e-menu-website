<template>
  <div class="">
    <v-row class="construct-page">
      <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="gray left">
        <div class="form">
          <v-form @submit.prevent="handleLogin">
            <div
              class="text-center headline font-weight-bold mb-6 primary--text"
            >
              Welcome back
            </div>
            <v-text-field
              label="email"
              type="text"
              name="email"
              outlined
              dense
              v-model="login.email"
            ></v-text-field>
            <v-text-field
              label="password"
              type="password"
              name="password"
              outlined
              dense
              v-model="login.password"
            ></v-text-field>
            <v-btn block color="primary" type="submit" dark>LOGIN</v-btn>
            <p :class="`${msg.error ? 'red--text' : 'green--text'}`">
              {{ msg.content }}
            </p>
          </v-form>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8" class="right"> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "login",
  data: () => ({
    login: {
      email: "",
      password: "",
    },
    msg: {
      show: false,
      error: false,
      content: "",
    },
  }),
  methods: {
    async handleLogin() {
      this.msg.show = true;
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        if (response.status == 201) {
          this.msg.error = false;
          this.msg.content = "Reidrecting to home page...";
        }
      } catch (error) {
        // console.log(error);
        this.msg.error = true;
        if (error.response) {
          if (error.response.data.statusCode == 401) {
            this.msg.content = "Incorrect email or password";
          }
        }

        this.msg.content = "Something went wrong";
      }
    },
  },
};
</script>

<style>
.construct-page {
  height: 100vh;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.right {
  background: url("/pvk.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
