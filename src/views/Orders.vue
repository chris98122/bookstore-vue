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
        class="elevation-1"
        hide-actions
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
          <td >
            {{ item.id }}
          </td >
          <td
            class="text-xs">
            {{ item.date }}
          </td>
          <td >
            {{ item.totPrice }}
          </td>
          <td class="text-xs">
            {{ item.name }}
          </td>
          <td class="text-xs"/>
          <td class="text-xs">
            {{ item.bNum }}
          </td>
          <td class="text-xs">
            {{ item.price }}
          </td>
        </template>
</v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    search: '',
    search2: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: false,
        text: 'OrderID',
        value: 'id'
      },
      {
        sortable: false,
        text: 'OrderTime',
        value: 'date'
      },
      {
        sortable: false,
        text: 'TotalPrice',
        value: 'totPrice'
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
        value: 'bNum'
      },
      {
        sortable: false,
        text: 'Price',
        value: 'price'
      }
    ],
    orders: [
    ]
  }),
  mounted: function () {
    var self = this
    var url = 'http://localhost:8080/orders_show'
    this.axios
      .get(url)
      .then(response => {
        self.orders = response.data
        this.clear()
        console.log(response.data)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods: {
    clear () {
      var id = 0
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === id) {
          id = this.orders[i].id
          this.orders[i].id = ''
          this.orders[i].date = ''
          this.orders[i].totPrice = ''
        } else { id = this.orders[i].id }
      }
    }
  }

}
</script>
