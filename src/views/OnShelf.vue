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
                    v-model="name"
                    :error-messages="nameErrors"
                    label="Bookname"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  />
                  <v-text-field
                    v-model="author"
                    :error-messages="authorErrors"
                    label="author name"
                    required

                    @input="$v.author.$touch()"
                    @blur="$v.author.$touch()"
                  />
                  <v-text-field
                    v-model="stock"
                    :error-messages="stockErrors"
                    label="stock"
                    required
                    @input="$v.stock.$touch()"
                    @blur="$v.stock.$touch()"
                  />
                  <v-text-field
                    v-model="price"
                    :error-messages="priceErrors"
                    label="price"
                    required
                    @input="$v.price.$touch()"
                    @blur="$v.price.$touch()"
                  />
                  <v-text-field
                    v-model="isbn"
                    :error-messages="isbnErrors"
                    label="ISBN"
                    required
                    @input="$v.isbn.$touch()"
                    @blur="$v.isbn.$touch()"
                  />
                  <v-text-field
                    v-model="detail"
                    :error-messages="detailErrors"
                    label="detail"
                    required
                    @input="$v.detail.$touch()"
                    @blur="$v.detail.$touch()"
                  />
                  <v-text-field
                    v-model="publisher"
                    :error-messages="publisherErrors"
                    label="publisher"
                    required
                    @input="$v.publisher.$touch()"
                    @blur="$v.publisher.$touch()"
                  />
                  <v-text-field
                    v-model="words"
                    :error-messages="wordsErrors"
                    label="words"
                    required
                    @input="$v.words.$touch()"
                    @blur="$v.words.$touch()"
                  />

                  <v-btn
                    color="blue"
                    @click="submit_info()">submit</v-btn>

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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

var PricePattern = new RegExp(/^\d+(\.\d{1,2})?$/)

var IsPositiveInt = new RegExp(/^[1-9]*[1-9][0-9]*$/)
var isbn10 = new RegExp(/^[0-9]{10}$/)
var isbn13 = new RegExp(/^[0-9]{13}$/)
const PriceRule = (value) => PricePattern.test(value) !== false
const StockRule = (value) => IsPositiveInt.test(value) !== false

const isbnRule = (value) => isbn10.test(value) !== false || isbn13.test(value) !== false
export default {

  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },

  mixins: [validationMixin],

  validations: {
    name: { required },
    author: { required },
    stock: { required, StockRule },
    isbn: { required, isbnRule },
    price: { required, PriceRule },
    detail: { required },
    publisher: { required },
    words: { required, StockRule }
  },
  data: () => ({
    src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
    data: '',
    name: '',
    author: '',
    stock: '',
    isbn: '',
    price: '',
    detail: '',
    publisher: '',
    words: '',
    submitStatus: null
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.required && errors.push('price is required.')
      !this.$v.price.PriceRule && errors.push('价格必须是精度为两位小数以内的正数！')
      return errors
    },
    stockErrors () {
      const errors = []
      if (!this.$v.stock.$dirty) return errors
      !this.$v.stock.required && errors.push('stock is required.')
      !this.$v.stock.StockRule && errors.push('库存必须是正整数！')
      return errors
    },
    wordsErrors () {
      const errors = []
      if (!this.$v.words.$dirty) return errors
      !this.$v.words.required && errors.push('words is required.')
      !this.$v.words.StockRule && errors.push('字数必须是正整数！')
      return errors
    },
    isbnErrors () {
      const errors = []
      if (!this.$v.isbn.$dirty) return errors
      !this.$v.isbn.required && errors.push('isbn is required.')
      !this.$v.isbn.isbnRule && errors.push('isbn必须是10位整数或者13位整数！')
      return errors
    },
    authorErrors () {
      const errors = []
      if (!this.$v.author.$dirty) return errors
      !this.$v.author.required && errors.push('Author is required.')
      return errors
    },
    detailErrors () {
      const errors = []
      if (!this.$v.detail.$dirty) return errors
      !this.$v.detail.required && errors.push('Detail required.')
      return errors
    },
    publisherErrors () {
      const errors = []
      if (!this.$v.publisher.$dirty) return errors
      !this.$v.publisher.required && errors.push(' publisher required.')
      return errors
    }
  },
  methods: {
    submit_info () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.axios({
          headers: {
            'Access-Control-Allow-Origin': true,
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          method: 'post',
          url: 'http://localhost:8080/onshelf',
          data: this.$qs.stringify({
            name: this.name,
            author: this.author,
            stock: this.stock,
            isbn: this.isbn,
            price: this.price,
            detail: this.detail,
            publisher: this.publisher,
            words: this.words
          })
        })
          .then(response => {
            alert(response.data)
            this.$router.push('/manage_book')
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
      }
    },

    clear () {
      this.$v.$reset()
      this.name = ''
      this.author = ''
      this.stock = ''
      this.isbn = ''
      this.price = ''
      this.detail = ''
      this.publisher = ''
      this.words = ''
    }
  }
}
</script>
