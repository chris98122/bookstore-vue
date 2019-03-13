<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    ><v-flex xs6>
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
      ><v-data-table
        :headers="headers"
        :items="orders"
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
            {{ item.number }}
          </td>
          <td>
            <ul>
              <li v-for="value in item.items">
                {{ value["name"] }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="value in item.items">
                <img
                  :src="value.url"
                  width="80px">
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="value in item.items">
                {{ value["number"] }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="value in item.items">
                {{ value["price"] }}
              </li>
            </ul>
          </td>
          <td>
            {{ item.total_price(item.items) }}
          </td>
        </template>
</v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: false,
        text: 'OrderNumber',
        value: 'order_num'
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
      { sortable: false,
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
        number: 1,
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
        ],
        total_price (items) {
          var sum = 0
          for (var i = 0; i < this.items.length; i++) { sum += this.items[i].number * this.items[i].price }
          return sum
        }
      }
    ]
  })
}
</script>
