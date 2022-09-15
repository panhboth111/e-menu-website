<template>
  <v-dialog v-model="$store.state.failDialog" width="600" persistent>
    <v-card
      ><v-form>
        <v-container>
          <v-card-title>{{ msg || "none" }}</v-card-title>
          <v-card-actions>
            <v-btn
              color="red"
              dark
              @click="$store.dispatch('toggleFailDialog', false)"
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
    msg: String,
  },
  methods: {},
};
</script>

<style></style>
