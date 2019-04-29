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

      <v-flex xs12>
        <div >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              dark
              no-title
              color="green lighten-1"
              class="dt"
              scrollable>
              <v-spacer/>
              <v-btn
                flat
                color="primary"
                @click="menu = false">Cancel</v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <v-btn
          color="blue"
          @click="searchdate(date)">search</v-btn>
      </v-flex>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search  "
        single-line
        hide-details
      >

        <template slot="append">
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
      <v-flex
        md12
      ><v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :pagination.sync="pagination"
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
          <td>
            <tr
              v-for="value in item.orderContent"
              :key=" value.id">
              {{ value["book"]["name"] }}
            </tr>
          </td>
          <td/>
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
      </v-data-table></v-flex>

</v-layout></v-container> </template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    search: '',
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
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },

  watch: {
  },
  mounted: function () {
    var url = 'http://localhost:8080/orders_show'
    this.axios
      .get(url)
      .then(response => {
        if (response.data === '用户未登录') {
          this.orders = ['你还没有登录哦']
        } else {
          this.orders = response.data
        }
        console.log(this.orders)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },

  methods: {
    searchdate (date) {
      this.axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: 'http://localhost:8080/order_search',
        data: this.$qs.stringify({
          date: date
        })
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    getDate () {
      const toTwoDigits = num => num < 10 ? '0' + num : num
      let today = new Date()
      let year = today.getFullYear()
      let month = toTwoDigits(today.getMonth() + 1)
      let day = toTwoDigits(today.getDate())
      return `${day}/${month}/${year}`
    }

  }

}
</script>
