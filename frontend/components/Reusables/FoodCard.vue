<template>
  <div class="rounded-xl bg-white filter drop-shadow-xl z-10">
    <img
      :src="`${$config.API_URL}/${food.image}`"
      alt=""
      class="w-full h-60 bg-cover object-cover bg-no-repeat bg-center rounded-t-xl"
    />
    <div class="rounded-b-xl p-4 h-24">
      <div class="text-xl font-bold">{{ food.name }}</div>
      <div class="text-xs font-light mt-2 line-clamp-2">
        {{ food.description }}
      </div>
    </div>
    <div class="p-4 flex">
      <div class="bg-yellow-600 text-white px-8 py-2 rounded-full mr-2">
        ${{ food.price }}
      </div>
      <button
        class="bg-gray-800 text-white px-8 py-2 rounded-full"
        @click="handleAddItem"
        v-if="!isAdded"
      >
        ADD TO ORDER
      </button>
      <button
        class="bg-red-800 text-white px-8 py-2 rounded-full"
        @click="handleRemoveItem"
        v-else
      >
        REMOVE
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
  },
  methods: {
    handleAddItem() {
      this.$store.dispatch("ADD_ITEM", this.food.id);
    },
    handleRemoveItem() {
      this.$store.dispatch("REMOVE_ITEM", this.food.id);
    },
  },
  computed: {
    isAdded() {
      const item = this.$store.state.items.filter((i) => i == this.food.id);
      return item.length ? true : false;
    },
  },
};
</script>

<style></style>
