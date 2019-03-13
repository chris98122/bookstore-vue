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
      ><v-data-table
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
          <td class="text-xs">{{ item.author }}</td>
          <td class="text-xs">{{ item.stock }}</td>
          <td class="text-xs">{{ item.ISBN }}</td>
          <td class="text-xs">${{ item.price }}</td>
          <td>
            <v-tooltip
              top
              content-class="top">
              <v-btn
                slot="activator"
                class="v-btn--simple"
                icon
              >
                <v-icon color="blue">mdi-cart</v-icon>
              </v-btn>
              <span>Move in cart</span>
            </v-tooltip>
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
        text: 'ISBN',
        value: 'ISBN'
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
        author: 'author one',
        stock: 7,
        ISBN: 9787111216332,
        price: 35,
        url: '1.jpg'
      },
      {
        name: 'javascript tutorial second version',
        author: 'author two',
        stock: 9,
        ISBN: 9787111216322,
        price: 12,
        url: '4.jpg'
      },
      {
        name: 'Python Crash Course',
        author: '埃里',
        stock: 9,
        ISBN: 9787115428028,
        price: 10,
        url: '2.jpg'
      }
    ]
  })
}
</script>
