<template>
  <div>
    <ReusablesErrorDialog :msg="msg" />
    <OrdersTable :headers="headers" to="users" :items="order" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [        
        { text: "Id", value: "id" },
        { text: "Items", value: "foods" },
        { text: "Total Price", value: "totalPrice" },

      ],
      msg: "",
    };
  },
  async asyncData({ $axios }) {
    try {
      const order = await $axios.$get("/order");
      return {
        order: order.data,
      };
    } catch (error) {}
  },
  methods: {
    async handleDeleteUser(item) {},
  },
};
</script>

<style></style>
