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
        xs4>
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
                label="start time"
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
      </v-flex>
      <v-flex
        xs4>
        <div >
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date2"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date2"
                label="end time"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date2"
              dark
              no-title
              color="green lighten-1"
              class="dt"
              scrollable>
              <v-spacer/>
              <v-btn
                flat
                color="primary"
                @click="menu2 = false">Cancel</v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu2.save(date2)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </v-flex>
      <v-flex
        xs4>
        <p v-if="searched">您在{{ date }}至{{ date2 }}这段时间一共消费了￥{{ spending }}</p>
        <v-btn
          color="blue"
          small
          @click="searchdate(date,date2)">search by time</v-btn>
      </v-flex>
      <v-flex xs4 >
        <v-text-field
          v-model="search"
          label="Search By ID"
          single-line
          hide-details
        />
      </v-flex>
      <v-flex xs4 >
        <v-btn
          color="blue"
          small
          @click="searchID(search)">search by ID</v-btn>
      </v-flex>
      <v-flex xs4 >
        <v-btn
          color="blue"
          small
          @click="showall()">显示全部订单</v-btn>
      </v-flex>
      <v-flex xs4 >
        <v-text-field
          v-model="searchbook"
          label="Search By Bookname"
          single-line
          hide-details
        />
      </v-flex>
      <v-flex xs4 >
        <v-btn
          color="blue"
          small
          @click="searchBook(searchbook)">search by Bookname</v-btn>
      </v-flex>
      <template slot="append">
        <v-icon>mdi-magnify</v-icon>
      </template>
      <v-flex
        md12
      ><v-data-table
        :headers="headers"
        :items="orders"

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
    searched: false,
    pagination: {
      sortBy: 'id'
    },
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    date2: new Date().toISOString().substr(0, 10),
    menu2: false,
    search: '',
    searchbook: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: true,
        text: 'OrderID',
        value: 'id'
      },
      {
        sortable: true,
        text: 'OrderTime',
        value: 'date'
      },
      {
        sortable: true,
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
    ],
    ordersbackup: [
    ],
    spending: 0
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
          this.ordersbackup = response.data
        }
        console.log(this.orders)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },

  methods: {
    searchdate (date, date2) {
      this.axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: 'http://localhost:8080/order_search',
        data: this.$qs.stringify({
          startdate: date,
          enddate: date2
        })
      })
        .then(response => {
          this.orders = response.data
          this.searched = true
          this.spending = this.calsum()
          console.log(response.data)
          console.log(this.spending)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    searchID (id) {
      var newitems = []
      this.orders = this.ordersbackup
      id = parseInt(id)
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === id) {
          newitems.push(this.orders[i])
          this.orders = newitems
          return
        }
      }
    },
    searchBook (bookname) {
      var newitems = []
      this.orders = this.ordersbackup
      for (var i = 0; i < this.orders.length; i++) {
        for (var j = 0; j < this.orders[i]['orderContent'].length; j++) {
          if (this.orders[i]['orderContent'][j].book.name === bookname) {
            newitems.push(this.orders[i])
          }
        }
      }
      this.orders = newitems
    },
    calsum () {
      var sum = 0
      for (var i = 0; i < this.orders.length; i++) {
        sum += this.orders[i].totPrice
      }
      return sum
    },
    showall () {
      this.orders = this.ordersbackup
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
