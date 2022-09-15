<template>
  <div class="create-container">
    <ReusablesConfirmDialog :handleSubmit="handleCreateFood" />
    <v-row class="create-row">
      <v-col cols="12" sm="12" md="6">
        <v-card
          color="grey"
          height="100%"
          class="d-flex justify-center align-center"
          v-if="!newFood.image"
        >
          <div :class="``">
            <v-icon size="70" @click="handleUploadImageClicked"
              >mdi-upload</v-icon
            >
          </div>

          <input
            style="display: none"
            type="file"
            ref="fileInput"
            @change="handleSelectImage"
          />
        </v-card>
        <div
          :style="{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${$config.API_URL}/${newFood.image})`,
          }"
          class="uploaded-image"
          v-else
        >
          <v-btn icon color="red"
            ><v-icon size="70" @click="handleDeleteImage"
              >mdi-delete</v-icon
            ></v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="text-center font-weight-bold display-1">NEW FOOD</div>
        <v-form class="mt-10">
          <v-text-field
            type="text"
            label="Food Name"
            name="Food name"
            outlined
            dense
            v-model="newFood.name"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Food Description"
            name="Food Description"
            outlined
            dense
            v-model="newFood.description"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Price"
            name="Price"
            outlined
            dense
            v-model="newFood.price"
          ></v-text-field>
          <v-select
            :items="categories"
            label="Category"
            @change="handleSelect"
            item-text="name"
            :item-value="(item) => item.id"
            outlined
            v-model="newFood.category"
          ></v-select>
          {{ selectedCategory }}
          <ReusablesSubmitBtn />
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    newFood: {
      name: null,
      description: null,
      price: null,
      image: null,
      category: null,
    },
    selectedCategory: null,
  }),

  async asyncData({ $axios }) {
    try {
      const categories = await $axios.$get("/menu/category");
      return {
        categories: categories.data,
      };
    } catch (error) {}
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    async handleDeleteImage() {
      const response = await this.$axios.delete("/files/" + this.newFood.image);
      console.log(response);
      if (response.status == 200) {
        this.newFood.image = null;
      }
    },
    async handleCreateFood() {
      try {
        this.newFood.price = parseFloat(this.newFood.price);
        console.log(this.newFood);
        const response = await this.$axios.$post("/menu/food", {
          ...this.newFood,
        });
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
      this.$store.dispatch("toggleConfirmDialog", false);
      this.$router.push("/menu");
    },
    handleUploadImageClicked() {
      this.$refs.fileInput.click();
    },
    async handleSelectImage(e) {
      try {
        if (e.target.files.length !== 0) {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          const headers = { "Content-Type": "multipart/form-data" };
          const response = await this.$axios.$post("/files", formData, {
            headers,
          });
          this.newFood.image = response.data;
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style scoped>
.create-container {
  height: 32rem;
}
.create-row {
  height: 100%;
}
.uploaded-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
