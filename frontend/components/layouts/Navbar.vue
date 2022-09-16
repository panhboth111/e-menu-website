<template>
  <div class="fixed top-0 left-0 w-full z-50">
    <nav
      :class="` flex justify-between items-end pt-6 pb-4 lg:px-10 px-4 border-b w-full  ${
        scrollPosition > 0 ? 'bg-white border-black' : ''
      }`"
    >
      <div class="lg:text-3xl font-bold text-gray-600">Pine View Kitchen</div>
      <ul class="flex items-center">
        <nuxt-link to="/"
          ><li class="px-2 lg:px-4"><IconsHome /></li
        ></nuxt-link>
        <nuxt-link to="/cart"
          ><li class="px-2 lg:px-4"><IconsCart /></li
        ></nuxt-link>
        <nuxt-link to="/search"
          ><li class="px-2 lg:px-4"><IconsSearch /></li
        ></nuxt-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    scrollPosition: 0,
  }),
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style></style>
