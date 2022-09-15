<template>
  <div>
    <ReusablesDatatable
      :headers="headers"
      :items="food"
      to="menu"
      :handleDelete="handleDeleteFood"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "No.", value: "id" },
        { text: "Food Name", value: "name" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  async asyncData({ $axios }) {
    try {
      const food = await $axios.$get("/menu/food");
      return {
        food: food.data,
      };
    } catch (error) {}
  },
  methods: {
    async handleDeleteFood(item) {
      try {
        const response = await this.$axios.$delete("/menu/food/" + item.id);
        if (response.statusCode == 201) {
          this.food = this.food.filter((f) => f.id !== item.id);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
