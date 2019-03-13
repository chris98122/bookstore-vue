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
          <td>
            {{ item.id }}
          </td>
          <td class="text-xs">
            {{ item.time }}
          </td>
          <td>
            <tr
              v-for="value in item.items"
              :key=" value.url">
              {{ value["name"] }}
            </tr>
          </td>
          <td>
            <tr
              v-for="value in item.items"
              :key=" value.url">

              <img
                :src="value.url"
                width="40px">
            </tr>
          </td>
          <td>
            <tr
              v-for="value in item.items"
              :key=" value.url">
              {{ value["number"] }}
            </tr>
          </td>
          <td>
            <tr
              v-for="value in item.items"
              :key=" value.url">
              {{ value["price"] }}
            </tr>
          </td>
          <td>
            {{ total_price(item.items) }}
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
      },
      {
        sortable: false,
        text: 'TotalPrice',
        value: 'total_price'
      }
    ],
    orders: [
      {
        id: 1,
        time: Date(),
        items: [
          {
            name: 'javascript tutorial',
            number: 1,
            stock: 7,
            price: 35,
            url: '1.jpg'
          },
          {
            name: 'javascript tutorial second version',
            number: 1,
            stock: 9,
            price: 12,
            url: '4.jpg'
          }
        ]
      },
      {
        id: 2,
        time: Date(),
        items: [
          {
            name: 'javascript tutorial',
            number: 1,
            stock: 7,
            price: 35,
            url: '1.jpg'
          },
          {
            name: 'javascript tutorial second version',
            number: 1,
            stock: 9,
            price: 12,
            url: '4.jpg'
          },
          {
            name: 'Python Crash Course',
            number: 2,
            author: '埃里',
            stock: 9,
            ISBN: 9787115428028,
            price: 10,
            url: '2.jpg'
          }
        ]
      }
    ]
  }),
  methods: {
    total_price (items) {
      var sum = 0
      for (var i = 0; i < items.length; i++) { sum += items[i].number * items[i].price }
      return sum
    }
  }

}
</script>
