<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >

    <v-layout
      justify-center
      wrap
    ><v-flex
      xs3>
      <router-link
        to="/on_shelf"
      >On shelf

      </router-link>
    </v-flex>
      <v-flex xs3>
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
        </v-text-field>

      </v-flex>
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
              @click="getdetail( item)">
              {{ item.name }}
            </td>
            <td>
              <router-link
                to="/book_detail"
              >
                <img
                  :src="item.url"
                  width="80px">
              </router-link>
            </td>
            <td class="text-xs">{{ item.author }}</td>
            <td>
              <v-text-field
                v-model="item.stock"
                required
                solo/>
            </td>
            <td>
              <v-tooltip
                top
                content-class="top">
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  icon
                  @click="UpdateStock(item.id,item.stock)"
                >
                  <v-icon color="blue">mdi-upload</v-icon>
                </v-btn>
                <span>submit</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ item.isbn }}</td>

            <td >
              <v-text-field
                v-model="item.price"
                required
                solo/>
            </td>

            <td>
              <v-tooltip
                top
                content-class="top">
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  icon
                  @click="UpdatePrice(item.id,item.price)"
                >
                  <v-icon color="blue">mdi-upload</v-icon>
                </v-btn>
                <span>submit</span>
              </v-tooltip>
            </td>

            <td class="right">
              <toggle-button
                :labels="{checked: '上架', unchecked: '下架'}"
                v-model="item.upshelf"
                @change="update_shelf($event,item)"
              />
            </td>
</template></v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    search: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: false,
        text: 'BookName',
        value: 'name'
      },
      {
        sortable: false,
        text: 'BookPic',
        value: 'pic'
      },
      { sortable: false,
        text: 'Author',
        value: 'author'
      },
      {
        sortable: false,
        text: 'Stock',
        value: 'stock'
      },

      {
        sortable: false,
        text: ' ',
        value: 'stock'
      },
      {
        sortable: false,
        text: 'ISBN',
        value: 'isbn'
      },
      {
        sortable: false,
        text: 'Price',
        value: 'price'
      },
      {
        sortable: false,
        text: '    ',
        value: 'price'
      },
      {
        sortable: false,
        text: 'Action',
        value: 'upshelf',
        align: 'right'
      }
    ],
    items: []
  }),
  mounted: function () {
    var url = 'http://localhost:8080/book'
    this.axios({
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: 'get',
      url: url
    })
      .then(response => {
        this.items = response.data
        console.log(response.data)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods:
          {
            getdetail (item) {
              console.log(item)
              console.log(JSON.stringify(item))
              this.$router.push({ name: 'Detail', params: item })
            },
            UpdateStock (bid, stock) {
              if (isNaN(stock)) {
                alert('库存必须是数字！')
                return
              }
              if (stock < 0) {
                alert('库存必须是大于等于零的数字！')
                return
              }
              this.axios({
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                method: 'post',
                url: 'http://localhost:8080/update_stock',
                data: this.$qs.stringify({
                  bid: bid,
                  stock: stock
                })
              })
                .then(response => {
                  alert(response.data)
                  console.log(response.data)
                })
                .catch(error => {
                  JSON.stringify(error)
                  console.log(error)
                })
            },
            UpdatePrice (bid, price) {
              if (isNaN(price)) {
                alert('价格必须是数字！')
                return
              }
              if (price < 0) {
                alert('价格必须是大于等于零的数字！')
                return
              }
              if (!/^\d+(\.\d{1,2})?$/.test(price)) {
                alert('价格必须是精度为两位小数以内的正数！')
                return
              }
              this.axios({
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                method: 'post',
                url: 'http://localhost:8080/update_price',
                data: this.$qs.stringify({
                  bid: bid,
                  price: price
                })
              })
                .then(response => {
                  alert(response.data)
                  console.log(response.data)
                })
                .catch(error => {
                  JSON.stringify(error)
                  console.log(error)
                })
            },
            update_shelf (e, item) {
              item.upshelf = e.value
              this.axios({
                headers: {
                  'Access-Control-Allow-Origin': true,
                  'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                method: 'post',
                url: 'http://localhost:8080/update_shelf',
                data: this.$qs.stringify({
                  bid: item.id,
                  upshelf: item.upshelf
                }),
                withCredentials: true
              }).then(response => {
                console.log(response.data)
              })
                .catch(error => {
                  JSON.stringify(error)
                  console.log(error)
                })
            }
          }
}
</script>
