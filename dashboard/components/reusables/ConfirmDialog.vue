<template>
  <v-dialog v-model="$store.state.confirmDialog" width="600" persistent>
    <v-card
      ><v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-card-title
            >Are you sure you wish to proceed with this action?</v-card-title
          >
          <v-card-actions>
            <v-btn color="primary" dark type="submit">CONFIRM</v-btn>
            <v-btn
              color="red"
              outlined
              @click="$store.dispatch('toggleConfirmDialog', false)"
              >CANCEL</v-btn
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
  },
};
</script>

<style></style>
