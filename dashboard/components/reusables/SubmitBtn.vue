<template>
  <v-btn color="primary" block dark @click="openConfirmDialog">SUBMIT</v-btn>
</template>

<script>
export default {
  props: {},
  methods: {
    openConfirmDialog() {
      this.$store.dispatch("toggleConfirmDialog", true);
    },
  },
};
</script>

<style></style>
