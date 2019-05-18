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

      <v-flex xs4>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search order id"
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
          :items="orders"
          item-key="id"
          class="elevation-1"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          sort-icon="mdi-menu-down"
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
            <td>
              {{ item.id }}
            </td>
            <td class="text-xs">
              {{ item.buydate.replace("T", " ").split('.')[0] }}
            </td>

            <td>
              {{ item.totPrice }}
            </td>
            <td>
              <tr
                v-for="value in item.orderContent"
                :key=" value.id">
                {{ value["book"]["name"] }}
              </tr>
            </td>
            <td>
              <tr
                v-for="value in item.items"
                :key=" value.id">

                <img
                  :src="value.id"
                  width="40px">
              </tr>
            </td>
            <td>
              <tr
                v-for="value in item.orderContent"
                :key=" value.id">
                {{ value["bNum"] }}
              </tr>
            </td>
            <td>
              <tr
                v-for="value in item.orderContent"
                :key=" value.id">
                {{ value["price"] }}
              </tr>
            </td>
          </template>
</v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    search: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: true,
        text: 'OrderID',
        value: 'id'
      },
      {
        sortable: true,
        text: 'OrderTime',
        value: 'buydate'
      },
      {
        sortable: true,
        text: 'TotalPrice',
        value: 'totPrice'
      },
      {
        sortable: false,
        text: 'BookName',
        value: 'orderContent'
      },
      {
        sortable: false,
        text: 'BookPic',
        value: 'pic'
      },
      {
        sortable: false,
        text: 'Number',
        value: 'orderContent.bNum'
      },
      {
        sortable: false,
        text: 'Price',
        value: 'orderContent'
      }
    ],
    orders: [],
    backup: []
  }),
  watch:
          {
            search: function (val) {
              if (val === '') this.orders = this.backup
              for (var i = 0; i < this.orders.length; i++) {
                if (this.orders[i].id === parseInt(val)) {
                  this.orders = []
                  this.orders.push(this.backup[i])
                }
              }
            }
          },

  mounted: function () {
    var url = 'http://localhost:8080/statistics_show'
    this.axios
      .get(url)
      .then(response => {
        this.orders = response.data
        this.backup = response.data
        console.log(this.orders)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods: {
  }

}
</script>
