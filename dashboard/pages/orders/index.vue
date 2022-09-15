<template>
  <div>
    <ReusablesErrorDialog :msg="msg" />
    <ReusablesDatatable :headers="headers" to="users" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      msg: "",
    };
  },
  async asyncData({ $axios }) {
    try {
      const users = await $axios.$get("/users");
      return {
        users: users.data,
      };
    } catch (error) {}
  },
  methods: {
    async handleDeleteUser(item) {},
  },
};
</script>

<style></style>
