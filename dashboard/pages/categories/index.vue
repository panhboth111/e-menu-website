<template>
  <div>
    <ReusablesDatatable
      :headers="headers"
      :items="categories"
      to="categories"
      :handleDelete="handleDeleteCategory"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Id.", value: "id" },
        { text: "Category Name", value: "name" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  async asyncData({ $axios }) {
    try {
      const categories = await $axios.$get("/menu/category");
      return {
        categories: categories.data,
      };
    } catch (error) {}
  },
  methods: {
    async handleDeleteCategory(item) {
      try {
        const response = await this.$axios.$delete("/menu/category/" + item.id);
        if (response.statusCode == 201) {
          this.categories = this.categories.filter((c) => c.id !== item.id);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
