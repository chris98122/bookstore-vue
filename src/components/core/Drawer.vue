<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Bookstore
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>
        <div v-if="!this.$root.isAdmin">
          <v-list-tile
            v-for="(link, i) in links"

            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"

          >
            <v-list-tile-action >
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="link.text"
            />

          </v-list-tile>
        </div>
        <div v-if="this.$root.isAdmin">
          <v-list-tile
            v-for="(link, i) in adminlinks"

            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"

          >
            <v-list-tile-action >
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="link.text"
            />

          </v-list-tile>
        </div>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    logo: 'logo.jpg',
    links: [
      {
        to: '/login',
        icon: 'mdi-login',
        text: 'Login'
      },
      {
        to: '/register',
        icon: 'mdi-login',
        text: 'Register'
      },
      {
        to: '/browse',
        icon: 'mdi-book',
        text: 'Browse Books'
      },
      {
        to: '/orders',
        icon: 'mdi-shopping',
        text: 'Orders'
      },
      {
        to: '/cart',
        icon: 'mdi-cart',
        text: 'Cart'
      }
    ],
    adminlinks: [
      {
        to: '/login',
        icon: 'mdi-login',
        text: 'Login'
      },
      {
        to: '/statistics',
        icon: 'mdi-shopping',
        text: 'Statistics'
      },
      {
        to: '/StatisticsByUser',
        icon: 'mdi-shopping',
        text: 'StatisticsByUser'
      },
      {
        to: '/manage_user',
        icon: 'mdi-account',
        text: 'Manage User'
      },
      {
        to: '/manage_book',
        icon: 'mdi-book',
        text: 'Manage Book'
      },
      {
        to: '/on_shelf',
        icon: 'mdi-book',
        text: 'On Shelf'
      },
      {
        to: '/chart',
        icon: 'mdi-book',
        text: 'chart'
      }],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
