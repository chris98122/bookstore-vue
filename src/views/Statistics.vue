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
          v-model="search2"
          append-icon="search"
          label="Search order time"
          single-line
          hide-details
        >
          <template slot="append">
            <v-icon>mdi-magnify</v-icon>
          </template>
      </v-text-field></v-flex>

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
      ><v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :pagination.sync="pagination"
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
              {{ value["book"]["price"] }}
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
        sortable: false,
        text: 'OrderID',
        value: 'order_id'
      },
      {
        sortable: false,
        text: 'OrderTime',
        value: 'order_time'
      },
      {
        sortable: false,
        text: 'TotalPrice',
        value: 'total_price'
      },
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
      {
        sortable: false,
        text: 'Number',
        value: 'number'
      },
      {
        sortable: false,
        text: 'Price',
        value: 'price'
      }
    ],
    orders: []
  }),

  mounted: function () {
    var url = 'http://localhost:8080/statistics_show'
    this.axios
      .get(url)
      .then(response => {
        this.orders = response.data
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
