<template>
  <div class="create-container">
    <ReusablesConfirmDialog :handleSubmit="handleSubmitEditFood" />
    <v-row class="create-row">
      <v-col cols="12" sm="12" md="6">
        <v-card
          color="grey"
          height="100%"
          class="d-flex justify-center align-center"
          v-if="!displayImage"
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
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${displayImage}')`,
          }"
          class="uploaded-image"
          id="upload-display"
          v-else
        >
          <v-btn icon color="red"
            ><v-icon size="70" @click="handleRemoveImage"
              >mdi-delete</v-icon
            ></v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="text-center font-weight-bold display-1">FOOD</div>
        <v-form class="mt-10">
          <v-text-field
            type="text"
            label="Food Name"
            name="Food name"
            outlined
            dense
            v-model="food.name"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Food Description"
            name="Food Description"
            outlined
            dense
            v-model="food.description"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Price"
            name="Price"
            outlined
            dense
            v-model="food.price"
          ></v-text-field>
          <v-select
            :items="categories"
            label="Category"
            item-text="name"
            :item-value="(item) => item.id"
            outlined
            v-model="food.category"
          ></v-select>

          <ReusablesSubmitBtn />
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    edit: false,
    msg: {
      show: false,
      error: false,
      content: "",
    },
    tempImage: null,
  }),

  async asyncData({ route, $axios, $config }) {
    try {
      const food = await $axios.$get("/menu/food/" + route.params.food);
      const categories = await $axios.$get("/menu/category");
      // console.log(food.data.image);
      const displayImage = $config.API_URL + "/" + food.data.image;

      return {
        food: food.data,
        categories: categories.data,
        displayImage,
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    handleRemoveImage() {
      this.displayImage = null;
    },
    async handleSubmitEditFood() {
      try {
        if (this.tempImage) {
          const headers = { "Content-Type": "multipart/form-data" };
          const uploadResponse = await this.$axios.$post(
            "/files",
            this.tempImage,
            {
              headers,
            }
          );

          this.food.image = uploadResponse.data;
        }
        const { category, ...updatedFood } = this.food;
        const response = await this.$axios.$patch(
          "/menu/food/" + this.food.id,
          { ...updatedFood, category: category.id }
        );
        console.log(response);
        if (response.statusCode == 201) {
          this.msg.error = false;
          this.$store.dispatch("toggleConfirmDialog", false);
          this.$router.push("/menu");
          return;
        }
        this.msg.show = true;
        this.msg.error = true;
        this.msg.content = response.msg;
      } catch (error) {
        console.log(error);
        this.msg.show = true;
        this.msg.error = true;
        this.msg.content = error.message;
        console.log(error.response);
      }
      this.$store.dispatch("toggleConfirmDialog", false);
    },
    handleUploadImageClicked() {
      this.$refs.fileInput.click();
    },
    async handleSelectImage(e) {
      try {
        if (e.target.files.length !== 0) {
          const image = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(image);
          const formData = new FormData();
          formData.append("file", image);
          this.tempImage = formData;

          this.displayImage = URL.createObjectURL(image);
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
