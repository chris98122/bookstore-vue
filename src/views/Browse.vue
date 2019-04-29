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
      <v-flex xs6>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        >

          <template slot="append">
            <v-icon>mdi-magnify</v-icon>
          </template>
      </v-text-field></v-flex>
      <v-flex
        md12
      >

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="elevation-1"
        >
          <template
            slot="headerCell"
            slot-scope="{ header }"
          >
            <span
              class="subheading font-weight-light text-success text--darken-3"
              v-text="header.text"
            />
          </template>
          <template
            slot="items"
            slot-scope="{ item }"
          >
            <td
              class="text-lg-left"
              width="200px"
              @click="getdetail( item.id)"
            >
              {{ item.name }}</td>
            <td>

              <img
                :src="
                item.url"
                width="80px">
            </td>
            <td class="text-xs">{{ item.author }}</td>
            <td class="text-xs">{{ item.stock }}</td>
            <td class="text-xs">{{ item.isbn }}</td>
            <td class="text-xs">￥{{ item.price }}</td>
            <td>
              <v-tooltip
                top
                content-class="top"

              >
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  icon
                  @click="move(item.id)"
                >
                  <v-icon
                    color="blue"
                  >mdi-cart</v-icon>
                </v-btn>
                <span>Move in cart</span>
              </v-tooltip>
            </td>
</template></v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    search: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: true,
        text: 'BookName',
        value: 'name'
      },
      {
        sortable: true,
        text: 'BookPic',
        value: 'pic'
      },
      {
        sortable: true,
        text: 'Author',
        value: 'author'
      },
      {
        sortable: true,
        text: 'Stock',
        value: 'stock'
      },
      {
        sortable: true,
        text: 'ISBN',
        value: 'isbn'
      },
      {
        sortable: true,
        text: 'Price',
        value: 'price'
      },
      {
        sortable: false,
        text: 'Action',
        value: 'action',
        align: 'right'
      }
    ],
    items: [{
      id: 1,
      name: 'javascript tutorial',
      number: 1,
      stock: 7,
      price: 35,
      url: '1.jpg'
    }
    ]
  }),
  mounted: function () {
    var url = 'http://localhost:8080/book'
    this.axios
      .get(url)
      .then(response => {
        this.items = response.data
        console.log(response.data)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods: {
    getdetail (bid) {
      console.log('clicked')
      var url = 'http://localhost:8080/bookdetail'
      this.axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: url,
        data: this.$qs.stringify({ id: bid })
      })
        .then(response => {
          this.items = response.data
          this.$router.push({ name: 'Detail', params: this.items[0] })
          console.log(response.data)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    move (b) {
      var url = 'http://localhost:8080/cart_movein'
      console.log(b)
      this.axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: url,
        data: this.$qs.stringify({
          bid: b
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
