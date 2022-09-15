<template>
  <v-dialog v-model="$store.state.successDialog" width="600" persistent>
    <v-card
      ><v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-card-title>{{ msg }}</v-card-title>
          <v-card-actions>
            <v-btn
              color="primary"
              dark
              type="submit"
              @click="$store.dispatch('toggleSuccessDialog', false)"
              >CONFIRM</v-btn
            >
          </v-card-actions>
        </v-container></v-form
      ></v-card
    >
  </v-dialog>
</template>

<script>
export default {
  props: {
    handleSubmit: Function,
    msg: String,
  },
};
</script>

<style></style>
