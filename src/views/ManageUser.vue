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
            <td class="text-md-left">
              {{ item.name }}
            </td>
            <td class="text-md-left">{{ item.id }}</td>
            <td class="right">
              <toggle-button
                v-model="item.isActive"
                :labels="{checked: '启用', unchecked: '禁用'}"/>
            </td>
<td/></template></v-data-table></v-flex></v-layout></v-container></template>

<script>
export default {
  data: () => ({
    search: '',
    publicPath: process.env.BASE_URL,
    headers: [
      {
        sortable: false,
        text: 'UserName',
        value: 'name'
      },
      {
        sortable: false,
        text: 'UserID',
        value: 'id'
      },
      {
        sortable: false,
        text: 'Action',
        value: 'isActive',
        align: 'right'
      }
    ],
    items: [
    ]
  }),

  mounted: function () {
    var self = this
    var url = 'http://localhost:8080/manageuser'
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
