<template>
  <div class="pb-10">
    <IndexHeroSection />
    <IndexMenuSection
      :foods="foods"
      :categories="categories"
      :currentCategory="currentCategory"
      :handleSelectCategory="handleSelectCategory"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const categories = await $axios.$get("/menu/category");

      const foods = await $axios.$get("/menu/food");
      return {
        categories: categories.data,
        foods: foods.data,
        currentCategory: null,
      };
    } catch (error) {
      return {
        categories: [],
        foods: [],
        currentCategory: null,
      };
    }
  },

  methods: {
    async handleSelectCategory(id) {
      try {
        this.currentCategory = id;
        if (id) {
          const category = await this.$axios.$get("/menu/category/" + id);
          this.foods = [...category.data.foods];
          return;
        }
        const foods = await this.$axios.$get("/menu/food");
        this.foods = [...foods.data];
      } catch (error) {}
    },
  },
};
</script>
