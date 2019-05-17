<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout
          align-center >
          <v-flex
            xs6
            sm
            md>
            <div v-if="this.$root.logged">
              <v-card class="px-3 pb-4">
                <form>
                  <v-text-field
                    v-model="Bookname"
                    class="purple-input"
                    label="Bookname"
                    required
                  />
                  <v-text-field
                    v-model="authorname"
                    class="purple-input"
                    label="author name"
                    required
                  />
                  <v-text-field
                    v-model="stock"
                    class="purple-input"
                    label="stock"
                    required
                  />
                  <v-text-field
                    v-model="price"
                    class="purple-input"
                    label="price"
                    required
                  />
                  <v-text-field
                    v-model="ISBN"
                    class="purple-input"
                    label="ISBN"
                    required
                  />

                  <v-btn
                    color="blue"
                    @click="submit">submit</v-btn>

                  <v-btn
                    color="blue"
                    @click="clear">clear</v-btn>
                  <v-btn
                    color="blue">
                    <vue-core-image-upload
                      :crop="false"
                      :data="data"
                      :max-file-size="5242880"
                      url=""
                      @imageuploaded="imageuploaded" />
                  </v-btn>
                </form>
            </v-card></div>
            <v-footer class="pa-3">
              <v-spacer/>
            </v-footer>
      </v-flex></v-layout></v-container>
</v-content></v-app></template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  data: () => ({
    src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
    data: '',
    headers: [
      {
        sortable: true,
        text: 'BookName',
        value: 'name'
      },
      {
        sortable: false,
        text: 'BookPic',
        value: 'pic'
      },
      {
        sortable: true,
        text: 'Author',
        value: 'author'
      },
      {
        sortable: false,
        text: 'Stock',
        value: 'stock'
      },
      {
        sortable: true,
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
    ]
  }),
  methods: {
    imageuploaded (res) {
      if (res.errcode === 0) {
        this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png'
      }
    }
  }
}
</script>
