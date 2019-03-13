<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
          v-model="selected"
          :headers="headers"
          :items="items"
          select-all
          item-key="name"
          class="elevation-1"
        >
          <template
            v-slot:headers="props"
          ><tr>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click="toggleAll"
            />
            <th
              v-for="header in props.headers"
              :key="header.text"
            >
              {{ header.text }}
            </th>
          </tr>
          </template>
          <template v-slot:items="props">
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
              @click="add(props.item)"
            />

            <td class="text-xs-right">{{ props.item.name }}</td>
            <td>
              <img
                :src="props.item.url"
                width="80px">
            </td>
            <td :width="1">
              <v-btn
                icon
                color="blue lighten-2"
                @click=" if(props.item.number>1)props.item.number -= 1">
                <v-icon
                  small
                >
                  mdi-minus
                </v-icon>
            </v-btn></td>
            <td :width="1">
              <v-text-field
                v-model="props.item.number"
                required
                solo/>
            </td>
            <td :width="1">
              <v-btn
                icon
                color="blue lighten-2"
                @click=" if(props.item.number<props.item.stock)props.item.number += 1">
                <v-icon
                  small
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </td>
            <td class="text-xs-right">{{ props.item.price }}</td>
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
    selected: [],
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
        url: '1.jpg',
        selected: true
      },
      {
        name: 'javascript tutorial second version',
        number: 1,
        stock: 9,
        price: 12,
        url: '4.jpg',
        selected: true
      }
    ]
  }),
  methods: {
    toggleAll () {
      if (this.selected.length === this.items.length) this.selected = []
      else {
        this.selected = this.items.slice()
      }
    },
    add (item) {
      if (this.selected.indexOf(item) > -1) { this.selected.remove(item) } else { this.selected.push(item) }
    },
    total_price () {
      var sum = 0
      for (var i = 0; i < this.selected.length; i++) {
        sum += this.selected[i].number * this.selected[i].price
      }
      return sum
    }
  }
}
</script>
