<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <p
          class="text-lg-left"
          width="200px">{{ item.name }}</p>

        <img
          :src="item.url"
          width="80px">

        <p class="text-xs">{{ item.author }}</p>
        <p class="text-xs">{{ item.stock }}</p>
        <p class="text-xs">{{ item.ISBN }}</p>
        <p class="text-xs">${{ item.price }}</p>

        <v-tooltip
          top
          content-class="top">
          <v-btn
            slot="activator"
            class="v-btn--simple"
            icon
          >
            <v-icon color="blue">mdi-cart</v-icon>
          </v-btn>
          <span>Move in cart</span>
        </v-tooltip>

</v-flex></v-layout></v-container></template>

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
