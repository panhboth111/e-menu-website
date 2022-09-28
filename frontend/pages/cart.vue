<template>
  <div class=" " >
    <div class="font-bold text-2xl" >
      Orders
    </div>
    <div class="w-96 mt-6" >
      <div v-for="(item,ids) in items" :key="ids" class="flex justify-between" >
        <p  >{{item.name}}</p>
        <p>{{item.price}}$</p>
      </div>
      <hr class="my-4" >
      <div class="flex justify-between text-red-600">
        <p  >Total</p>
        <p>{{totalPrice}}$</p>
      </div>
      <button class="w-full bg-primary text-white py-2 mt-2" @click="handleSubmit" >CONFIRM</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    totalPrice:0
  }),
  async mounted() {
    try {
      const ids = JSON.parse(localStorage.getItem("items"));

      if (ids) {
        this.items = await this.$axios.$post("/menu/food/ids", {
          ids: [...ids],
        });
        this.items.forEach(i => {
          this.totalPrice +=i.price
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  methods:{
    async handleSubmit(){
      try {
        const ids = JSON.parse(localStorage.getItem("items"));
        const response = await this.$axios.$post('/order',{
          totalPrice:this.totalPrice,
          foods:ids
        })
        if(response.statusCode == 201){
          this.$store.dispatch("CLEAR_ITEMS")
          localStorage.clear()
          this.$router.push('/')
        }

      } catch (error) {

      }
    }
  }
};
</script>

<style></style>
