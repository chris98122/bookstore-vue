<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg6
      >
        <material-chart-card
          v-if="done"
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
          lg6
        >
          <h4 class="title font-weight-light">Daily Sales</h4>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated just now</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg6
      >
        <material-chart-card
          v-if="false"
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Line"
          lg6
        >
          <h3 class="title font-weight-light">Weekly Sales</h3>
          <p class="category d-inline-flex font-weight-light">Last Last Campaign Performance</p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'today D'],
          series: [
            [0, 0, 0, 0, 0, 0, 0]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190],
            [220, 50, 40, 30, 80, 40, 100, 90]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
          align: 'right'
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
          align: 'right'
        }
      ],
      items: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738'
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738'
        }, {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142'
        }, {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735'
        }, {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542'
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      },
      done: false
    }
  },
  mounted: function () {
    var url = 'http://localhost:8080/statistics_by_day'
    this.axios
      .get(url)
      .then(response => {
        console.log(response.data)
        this.calculate_sum(response.data)
      })
      .catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    },
    calculate_increase () {

    },
    format (date) {
      var arr = date.split('-')
      var starttime = new Date(arr[0], arr[1], arr[2])
      var starttimes = starttime.getTime()
      return starttimes
    },
    calculate_sum (orders) {
      var today = new Date().toISOString().substr(0, 10)
      var t = this.format(today)
      var list = [0, 0, 0, 0, 0, 0, 0]
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].cart === false) {
          var date = new Date(orders[i].buydate)
          var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
          console.log(date_value)

          var d = this.format(date_value.substr(0, 10))
          var sub = (t - d) / (1000 * 60 * 60 * 24)
          console.log(sub)
          var k = 6 - sub
          console.log(k)
          list[k] += orders[i].totPrice
        }
      }
      this.dailySalesChart.data.series[0] = list
      this.done = true
      console.log(this.dailySalesChart.data.series[0])
    }
  }
}
</script>
