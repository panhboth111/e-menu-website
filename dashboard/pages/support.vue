<template>
  <div class="d-flex justify-center">
    <v-card>
      <v-container>
        <v-card-title>
          <v-btn icon class="mr-12" nuxt link to="/"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          We're here to help</v-card-title
        >
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            type="text"
            required
            label="Your Name"
            name="name"
            outlined
            dense
            v-model="email.from_name"
          ></v-text-field>
          <v-text-field
            type="text"
            required
            label="Your Email"
            name="email"
            outlined
            dense
            v-model="email.email"
          ></v-text-field>
          <v-text-field
            type="text"
            required
            label="Restaurant Name"
            name="restaurant_name"
            outlined
            dense
            v-model="email.restaurant_name"
          ></v-text-field>
          <v-text-field
            type="text"
            required
            label="Phone Number"
            name="phone"
            outlined
            dense
            v-model="email.phone"
          ></v-text-field>
          <v-textarea
            type="text"
            required
            label="Tell us about your problem"
            name="phone"
            outlined
            dense
            v-model="email.message"
          ></v-textarea>
          <v-card-title :class="result.error ? 'red--text' : 'green--text'">{{
            result.content
          }}</v-card-title>
          <v-btn color="primary" type="submit" block dark>SUBMIT</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
export default {
  data: () => ({
    statuses: ["Active", "Disabled"],
    email: {
      from_name: null,
      restaurant_name: null,
      phone: null,
      email_from: null,
      message: null,
    },
    result: {
      content: "",
      show: false,
      error: false,
    },
  }),
  methods: {
    async handleSubmit() {
      this.result.show = true;
      try {
        emailjs.send(
          "service_1wfhczi",
          "template_2kb55wf",
          {
            ...this.email,
          },
          "yBa9xb0dWu-2t107d"
        );
        this.result.error = false;
        this.result.content = "Submitted successfully";
      } catch (error) {
        console.log(error);
        this.result.error = true;
        this.result.content = "Something went wrong";
      }
      this.email = {
        from_name: null,
        restaurant_name: null,
        phone: null,
        email_from: null,
        message: null,
      };
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
