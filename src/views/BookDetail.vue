<template>
  <v-container py-0>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs4/>
      <v-flex
        xs6>
        <h3
          class="display-3"
        >{{ this.$route.params.name }}</h3>

        <p class="body-1">{{ this.$route.params.author }}</p>
        <p class="body-1">stock:{{ this.$route.params.stock }}</p>
        <p class="body-1">ISBN:{{ this.$route.params.isbn }}</p>
        <p class="body-1">${{ this.$route.params.price }}</p>

        <v-btn
          color="error"
          class="v-btn"
        >
          Move in cart
          <v-icon
            color="white"
          >mdi-cart</v-icon>
        </v-btn>

        <v-text>{{ this.$route.params.detail }}</v-text>
      </v-flex>

</v-layout></v-container></template>

<script>
export default {
  data: () => ({
    publicPath: process.env.BASE_URL

  }),
  mounted: function () {
    console.log(this.$route.params)
  }
}
</script>
