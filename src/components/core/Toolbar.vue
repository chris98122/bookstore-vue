<template>
  <div v-if="!this.$root.isAdmin">
    <v-toolbar
      id="core-toolbar"

      flat
      prominent
      style="background: #eee;"
    >

      <div class="v-toolbar-title">
        <v-toolbar-title
          class="tertiary--text font-weight-light"
        >
          <v-btn
            v-if="responsive"
            class="default v-btn--simple"
            dark
            icon
            @click.stop="onClickBtn"
          >
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
          {{ title }}
        </v-toolbar-title>
      </div>

      <v-spacer />
      <v-toolbar-items>
        <v-flex
          align-center
          layout
          py-2
        >
          <v-text-field
            v-if="responsiveInput"
            class="mr-4 mt-2 purple-input"
            label="Search..."
            hide-details
            color="purple"
          />
          <router-link
            v-ripple
            class="toolbar-items"
            to="/browse"
          >
            <v-icon color="tertiary">mdi-book</v-icon>
          </router-link>

          <v-menu
            bottom
            left
            content-class="dropdown-menu"
            offset-y
            transition="slide-y-transition">
            <router-link
              v-ripple
              slot="activator"
              class="toolbar-items"
              to="/cart"
            >
              <v-badge
                color="error"
                overlap
              >
                <template slot="badge">
                  {{ this.$root.cartsize }}
                </template>
                <v-icon color="tertiary">mdi-cart</v-icon>
              </v-badge>
            </router-link>
          </v-menu>
          <router-link
            v-ripple
            class="toolbar-items"
            to="/user-profile"
          >
            <v-icon color="tertiary">mdi-account</v-icon>
          </router-link>
        </v-flex>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<script>

import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    title: null,
    responsive: false,
    responsiveInput: false
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
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
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
