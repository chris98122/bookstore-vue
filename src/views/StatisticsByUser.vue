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
      <v-flex xs4 >
        <v-text-field
          v-model="searchuser"
          label="Search By UserID"
          append-icon="search"
          single-line
          hide-details
        >
          <template slot="append">
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex xs4 />
      <v-flex xs4 />
      <v-flex
        xs4
      >

        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
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
              class="text-xs-left"
              @click="showorders(item)">
              {{ item.name }}
            </td>
            <td
              class="text-md-left"
              @click="showorders(item)">{{ item.id }}</td>
            <td class="text-md-left">
              {{ item.spending }}
            </td>

            <td class="text-md-left">
              <tr
                v-for="value in item.orders"
                :key=" value.id">
                {{ value['id'] }}
              </tr>
            </td>
            <td class="text-xs-left">
              <tr
                v-for="value in item.orders"
                :key=" value.id">
                {{ value['totPrice'] }}
              </tr>
            </td>
      <td/></template></v-data-table></v-flex>
      <v-flex
        xs8
      >

        <v-data-table
          :headers="headers2"
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
              {{ item.buydate }}
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
                {{ value["price"] }}
              </tr>
            </td>
          </template>
</v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: true,
        text: 'name',
        value: 'name'
      },
      {
        sortable: true,
        text: 'uID',
        value: 'id'
      },
      {
        sortable: false,
        text: 'tot',
        value: 'spending'
      },
      {
        sortable: false,
        text: 'oID',
        value: 'id'
      },
      {
        sortable: false,
        text: 'price',
        value: 'id'
      }
    ],
    headers2: [
      {
        sortable: true,
        text: 'oID',
        value: 'id'
      },
      {
        sortable: true,
        text: 'Time',
        value: 'buydate'
      },
      {
        sortable: true,
        text: 'tot',
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
        text: 'num',
        value: 'bNum'
      },
      {
        sortable: false,
        text: '￥',
        value: 'price'
      }
    ],
    items: [],
    orders: [],
    searchuser: ''
  }),
  mounted: function () {
    var url = 'http://localhost:8080/statistics_by_user'
    this.axios
      .get(url)
      .then(response => {
        this.items = response.data
        console.log(response.data)
        this.items = this.format()
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods: {
    format () {
      var items = []
      for (var i = 0; i < this.items.length; i++) {
        var propertys = Object.getOwnPropertyNames(this.items[i])
        for (let j = 0; j < propertys.length; j++) {
          if (propertys[j] !== '__ob__') {
            var user = JSON.parse(propertys[j])
            user.orders = this.items[i][propertys[j]]
            items.push(user)
          }
        }
      }
      return items
    },
    showorders (item) {
      console.log(item.orders)
      this.orders = item.orders
    }
  }
}

</script>
