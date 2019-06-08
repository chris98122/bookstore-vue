<template>
  <v-container py-0>
    <v-layout
      justify-center
      wrap
    >
      <v-layout
        justify-left
      >
        <v-flex
          xs4>
          <img
            :src="url"
            width="200px"
          >
        </v-flex>
        <v-flex
          xs6>
          <h3
          >{{ this.$route.params.name }}</h3>
          <p class="body-1">{{ this.$route.params.author }}</p>
          <p class="body-1">库存:{{ this.$route.params.stock }}</p>
          <p class="body-1">ISBN:{{ this.$route.params.isbn }}</p>
          <p class="body-1">出版社：{{ this.$route.params.publisher }}</p>
          <p class="body-1">字数：{{ this.$route.params.words }}</p>

          <p class="body-1">￥{{ this.$route.params.price }}</p>
          <v-btn
            v-if="!this.$root.isAdmin"
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

      </v-flex>

      </v-layout>
      <v-flex
        sm12>
        <p>{{ this.$route.params.detail }}</p>
      </v-flex>
      <v-flex
        sm4 >
        <v-card>Comments</v-card>
      </v-flex>
      <v-flex
        sm12>
        <v-list >
          <v-list-tile
            v-for="item in comments"
            :key="item.id"
            avatar
          >
            {{ item.userid }}:{{ item.content }}
        </v-list-tile></v-list>
</v-flex> </v-layout> </v-container></template>

<script>
export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    comments: [],
    url: ''

  }),
  mounted:
    function () {
      var url = 'http://localhost:8080/comment'
      this.axios({
        headers: {
          'Access-Control-Allow-Origin': true,
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: url,
        data: this.$qs.stringify({
          book_id: this.$route.params.id
        }),
        withCredentials: true
      })
        .then(response => {
          this.comments = response.data
          console.log(response.data)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
      url = 'http://localhost:8080/get_url'
      this.axios({
        headers: {
          'Access-Control-Allow-Origin': true,
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: url,
        data: this.$qs.stringify({
          book_id: this.$route.params.id
        }),
        withCredentials: true
      })
        .then(response => {
          this.url = response.data
          console.log(response.data)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
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
