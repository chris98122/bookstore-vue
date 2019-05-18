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
        <p class="body-1">库存:{{ this.$route.params.stock }}</p>
        <p class="body-1">ISBN:{{ this.$route.params.isbn }}</p>
        <p class="body-1">出版社：{{ this.$route.params.publisher }}</p>
        <p class="body-1">字数：{{ this.$route.params.words }}</p>

        <p class="body-1">￥{{ this.$route.params.price }}</p>
        <v-btn
          color="error"
          class="v-btn"
          @click="move()"
        >
          Move in cart
          <v-icon
            color="white"
          >mdi-cart</v-icon>
        </v-btn>

      </v-flex>
      <v-flex
        xs12>
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
  },
  methods:
          {
            move () {
              var url = 'http://localhost:8080/cart_movein'
              console.log(this.$route.params.id)
              this.axios({
                headers: {
                  'Access-Control-Allow-Origin': true,
                  'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                method: 'post',
                url: url,
                data: this.$qs.stringify({
                  bookid: this.$route.params.id
                })
              })
                .then(response => {
                  alert(response.data)
                })
                .catch(error => {
                  JSON.stringify(error)
                  console.log(error)
                })
            }
          }

}
</script>
