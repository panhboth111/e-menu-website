<template>
  <div class="d-flex justify-center">
    <ReusablesConfirmDialog :handleSubmit="handleSubmitEditCategory" />
    <v-card>
      <v-container>
        <v-card-title>
          Category
          <v-btn icon class="ml-2" @click="edit = !edit"
            ><v-icon>mdi-pencil</v-icon></v-btn
          ></v-card-title
        >
        <v-form>
          <v-text-field
            type="text"
            label="name"
            name="name"
            v-model="editingCategory.name"
            outlined
            dense
            :disabled="!edit"
          ></v-text-field>
          <v-text-field
            type="text"
            label="description"
            name="description"
            v-model="editingCategory.description"
            outlined
            dense
            :disabled="!edit"
          ></v-text-field>

          <ReusablesSubmitBtn />
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
  async asyncData({ route, $axios }) {
    try {
      const response = await $axios.$get(
        "/menu/category/" + route.params.category
      );
      const { foods, ...category } = response.data;
      return {
        category: category,
        editingCategory: category,
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async handleSubmitEditCategory() {
      try {
        console.log(this.editingCategory);
        const response = await this.$axios.$patch(
          "/menu/category/" + this.category.id,
          { ...this.editingCategory }
        );
        if (response.statusCode == 201) {
          this.msg.error = false;
          this.$store.dispatch("toggleConfirmDialog", false);
          this.$router.push("/categories");
          return;
        }
        this.msg.show = true;
        this.msg.error = true;
        this.msg.content = response.msg;
      } catch (error) {
        this.msg.show = true;
        this.msg.error = true;
        this.msg.content = error.message;
      }
      this.$store.dispatch("toggleConfirmDialog", false);
    },
  },
};
</script>

<style>
.construct-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
