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

        <v-data-table
          :headers="headers"
          :items="items"
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
            <td
              class="text-lg-left"
              width="200px">{{ item.name }}</td>
            <td>
              <img
                :src="item.url"
                width="80px">
            </td>
            <td :width="1">
              <v-btn
                icon
                color="blue lighten-2"
                @click=" if(item.number>1)item.number -= 1">
                <v-icon
                  small
                >
                  mdi-minus
                </v-icon>
            </v-btn></td>
            <td :width="1">
              <v-text-field
                v-model="item.number"
                required
                solo

              />
            </td>
            <td :width="1">
              <v-btn
                icon
                color="blue lighten-2"
                @click=" if(item.number<item.stock)item.number += 1">
                <v-icon
                  small
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </td>
            <td class="text-xs">${{ item.price * item.number }}</td>
            <td>
              <v-tooltip
                top
                content-class="top">
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  color="danger"
                  icon
                >
                  <v-icon color="error">mdi-close</v-icon>
                </v-btn>
                <span>Move out of cart</span>
              </v-tooltip>
            </td>
          </template>
          <template
            v-slot:footer>
            <td/>
            <td/>
            <td/>
            <td/>
            <td>Total Price:</td>
            <td class="text-xs">${{ total_price() }}</td>
            <td :width="1">
              <v-btn
                icon
                color="blue lighten-2"
                @click=" buy">
                buy
              </v-btn>
            </td>

</template></v-data-table></v-flex></v-layout></v-container></template>
<script>
export default {
  data: () => ({
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
      {
        sortable: false,
        text: ' ',
        value: 'number'
      },
      {
        sortable: false,
        text: 'Number',
        value: 'number'
      },
      {
        sortable: false,
        text: ' ',
        value: 'number'
      },
      {
        sortable: false,
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
    total_price () {
      var sum = 0
      for (var i = 0; i < this.items.length; i++) { sum += this.items[i].number * this.items[i].price }
      return sum
    }
  })
}
</script>
