<template>
  <div>
    <ReusablesErrorDialog :msg="msg" />
    <ReusablesDatatable
      :headers="headers"
      :items="users"
      to="users"
      :handleDelete="handleDeleteUser"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "fullname" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
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
    async handleDeleteUser(item) {
      try {
        const response = await this.$axios.$delete("/users/" + item.id);
        console.log(response);
        if (response.statusCode == 201) {
          this.users = this.users.filter((u) => u.id !== item.id);
          return;
        }
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.message;
      }
      this.$store.dispatch("toggleFailDialog", true);
    },
  },
};
</script>

<style></style>
