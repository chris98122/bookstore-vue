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
            <td>{{ item.name }}</td>
            <td>
              <img
                :src="`${publicPath}1.jpg`"
                width="80px">
            </td>
            <td :width="2">
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
            <td :width="3">
              <v-text-field
                v-model="items[0].number"
                required
              />
            </td>
            <td :width="3">
              <v-btn
                icon
                color="blue lighten-2"
                @click=" if(item.number<8)item.number += 1">
                <v-icon
                  small
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </td>
            <td class="text-xs-right">{{ item.price }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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
        text: 'Number',
        value: 'number'
      },
      {
        sortable: false,
        text: 'Price',
        value: 'price',
        align: 'right'
      }
    ],
    items: [
      {
        name: 'javascript tutorial',
        number: 1,
        stock: 7,
        price: '$35 '
      }
    ]
  })
}
</script>
