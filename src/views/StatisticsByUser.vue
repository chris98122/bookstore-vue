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
      <v-flex md12>
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
            <td class="text-md-left">
              {{ item.name }}
            </td>
            <td class="text-md-left">{{ item.id }}</td>
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
            <td class="text-md-left">
              <tr
                v-for="value in item.orders"
                :key=" value.id">
                {{ value['totPrice'] }}
              </tr>
            </td>
<td/></template></v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    search: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: true,
        text: 'UserName',
        value: 'name'
      },
      {
        sortable: true,
        text: 'UserID',
        value: 'id'
      },
      {
        sortable: false,
        text: 'Total spending',
        value: 'spending'
      },
      {
        sortable: false,
        text: 'orderID',
        value: 'id'
      },
      {
        sortable: false,
        text: 'orderprice',
        value: 'id'

      }
    ],
    items: []
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
    }
  }
}

</script>
