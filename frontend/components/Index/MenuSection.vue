<template>
  <div class="mt-8">
    <div class="text-xl font-bold text-gray-600">Our Menu</div>
    <!-- category list -->
    <div class="my-4 flex items-center overflow-scroll">
      <div
        :class="`mr-2 px-4 py-1 rounded-full text-xs hover:bg-gray-600 cursor-pointer ${
          !currentCategory ? 'bg-gray-600 text-white' : 'bg-gray-200 '
        }`"
        @click="handleSelectCategory(null)"
      >
        All
      </div>
      <div
        v-for="(c, index) in categories"
        :key="index"
        :class="`mr-2 px-4 py-2 ${
          currentCategory && currentCategory == c.id
            ? 'bg-gray-600 text-white'
            : 'bg-gray-200 '
        } rounded-full whitespace-nowrap text-xs hover:bg-gray-600 cursor-pointer`"
        @click="handleSelectCategory(c.id)"
      >
        {{ c.name }}
      </div>
    </div>
    <!-- food list -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 mt-4"
    >
      <ReusablesFoodCard
        v-for="(food, index) in foods"
        :key="index"
        :food="food"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    foods: Array,
    currentCategory: Number,
    handleSelectCategory: Function,
  },
};
</script>

<style></style>
