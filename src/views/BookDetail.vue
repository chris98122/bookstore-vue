<template>
  <v-container py-0>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs4>
        <img
          :src="item.url"
        >
      </v-flex>
      <v-flex
        xs6>
        <h3
          class="display-3"
        >{{ item.name }}</h3>

        <p class="body-1">{{ item.author }}</p>
        <p class="body-1">stock:{{ item.stock }}</p>
        <p class="body-1">ISBN:{{ item.ISBN }}</p>
        <p class="body-1">${{ item.price }}</p>

        <v-btn
          color="error"
          class="v-btn"
        >
          Move in cart
          <v-icon
            color="white"
          >mdi-cart</v-icon>
        </v-btn>
      </v-flex>

</v-layout></v-container></template>

<script>
export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    item:
      {
        name: 'javascript tutorial',
        author: 'author one',
        stock: 7,
        ISBN: 9787111216332,
        price: 35,
        url: '1.jpg'
      }

  })
}
</script>
