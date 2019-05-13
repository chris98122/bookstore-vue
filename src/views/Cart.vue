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
          :headers="headers"
          :items="items"
          v-model="selected"
          select-all
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:headers="props">
            <tr>
              <th>
                <v-checkbox
                  v-model="selected"
                  primary
                  hide-details
                  @click.stop="toggleAll()"
                />
              </th>
              <th
                v-for="header in props.headers"
                :key="header.text"
              >
                {{
                  header.text
                }}
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr >
              <td >
                <v-checkbox
                  v-model="props.item.selected"
                  input-value="true"

                  primary
                  hide-details
                />
              </td><td class="text-xs-right">{{ props.item.name }}</td>
              <td>
                <img
                  :src="props.item.url"
                  width="80px">
              </td>
              <td :width="1">
                <v-btn
                  icon
                  color="blue lighten-2"
                  @click=" if(props.item.bNum>1)props.item.bNum -= 1">
                  <v-icon
                    small
                  >
                    mdi-minus
                  </v-icon>
              </v-btn></td>
              <td :width="1">
                <v-text-field
                  v-model="props.item.bNum"
                  required
                  solo/>
              </td>
              <td :width="1">
                <v-btn
                  icon
                  color="blue lighten-2"
                  @click=" if(props.item.bNum<props.item.stock)props.item.bNum += 1">
                  <v-icon
                    small
                  >
                    mdi-plus
                  </v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">{{ props.item.price *props.item.bNum }}</td>
              <td>
                <v-tooltip
                  top
                  content-class="top">
                  <v-btn
                    slot="activator"
                    class="v-btn--simple"
                    color="danger"
                    icon
                    @click=" moveout(props.item.id)"
                  >
                    <v-icon color="error">mdi-close</v-icon>
                  </v-btn>
                  <span>Move out of cart</span>
                </v-tooltip>
              </td>
          </tr></template>
          <template
            v-slot:footer>
            <td/>
            <td/>
            <td/>
            <td/>
            <td>Total Price:</td>
            <td class="text-xs">￥{{ total_price() }}</td>
            <td :width="1">
              <v-btn
                icon
                color="blue lighten-2"

                @click=" buy()">
                buy
              </v-btn>
            </td>

</template></v-data-table></v-flex></v-layout></v-container></template>
<script>
export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    selected: true,
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
        text: ' '
      },
      {
        sortable: false,
        text: 'Number',
        value: 'bNum'
      },
      {
        sortable: false,
        text: '  '
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
    ],
    backup: []

  }),
  mounted: function () {
    var url = 'http://localhost:8080/cart_show'
    this.axios
      .get(url)
      .then(response => {
        this.items = response.data
        this.backup = response.data
        this.set_select()
        console.log(response.data)
        this.$root.cartsize = this.items.length
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods: {
    toggleAll () {
      if (this.selected) {
        this.selected = false
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].selected = false
        }
      } else {
        this.selected = true
        for (i = 0; i < this.items.length; i++) {
          this.items[i].selected = true
        }
      }
    },
    total_price () {
      var sum = 0
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].selected) { sum += this.items[i].bNum * this.items[i].price }
      }
      return sum
    },
    buy () {
      console.log(this.total_price())
      var url = 'http://localhost:8080/cart_buy'
      this.axios({
        headers: {

          'Access-Control-Allow-Origin': true,
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: url,
        data: this.$qs.stringify({
          item: JSON.stringify(this.formatitems())
        }, { arrayFormat: 'brackets' })
      })
        .then(response => {
          alert(response.data)
          this.$router.push('/orders')
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    moveout (b) {
      var url = 'http://localhost:8080/cart_moveout'
      console.log(b)
      this.axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: url,
        data: this.$qs.stringify({
          bid: b
        })
      })
        .then(response => {
          alert(response.data)
          this.$router.go(0)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    set_select () {
      var newitems = []
      for (var i = 0; i < this.items[0]['orderContent'].length; i++) {
        var e = this.items[0]['orderContent'][i].book.id
        var a = this.items[0]['orderContent'][i].bNum
        var b = this.items[0]['orderContent'][i].book.name
        var c = this.items[0]['orderContent'][i].book.price
        var d = this.items[0]['orderContent'][i].book.stock
        var cart = { id: e, bNum: a, name: b, price: c, stock: d, selected: true }

        newitems[i] = cart
      }
      this.items = newitems
    },
    formatitems () {
      console.log(this.items)
      var temp = this.backup[0]['orderContent']
      this.backup[0]['orderContent'] = []
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].selected) {
          temp[i].bNum = this.items[i].bNum
          this.backup[0]['orderContent'].push(temp[i])
        }
      }
      this.backup[0]['totPrice'] = this.total_price()
      return this.backup
    }
  }

}

</script>
