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
      <v-flex xs6>
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
      >

        <v-data-table
          :headers="headers"
          :items="items"
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
            <td
              class="text-lg-left"
              width="200px">

              <router-link
                to="/book_detail"
              >
                {{ item.name }}
            </router-link></td>
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
            <td class="text-xs">{{ item.stock }}</td>
            <td class="text-xs">{{ item.isbn }}</td>
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
    ]
  }),
  mounted: function () {
    var self = this
    var url = 'http://localhost:8080/book'
    this.axios
      .get(url)
      .then(response => {
        self.items = response.data
        console.log(response.data)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  }
}
</script>
