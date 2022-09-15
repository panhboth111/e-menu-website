<template>
  <div class="d-flex justify-center">
    <ReusablesConfirmDialog :handleSubmit="handleCreateCategory" />

    <v-card>
      <v-container>
        <v-card-title>
          <v-btn icon class="mr-12" nuxt link to="/categories"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          Create Category</v-card-title
        >
        <v-form>
          <v-text-field
            type="text"
            label="Category Name"
            name="category name"
            outlined
            dense
            v-model="newCategory.name"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Category Description"
            name="category description"
            outlined
            dense
            v-model="newCategory.description"
          ></v-text-field>

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
    newCategory: {
      name: null,
      description: null,
    },
    msg: {
      show: false,
      error: false,
      content: "",
    },
  }),
  methods: {
    async handleCreateCategory() {
      this.msg.show = true;
      try {
        const response = await this.$axios.$post("/menu/category", {
          ...this.newCategory,
        });
        this.msg.error = false;
        this.msg.content = "Category created successfully";
        this.newCategory = {
          name: null,
          description: null,
        };
      } catch (error) {
        console.log(error.response);
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
