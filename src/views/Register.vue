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
            <div v-if="!this.$root.logged">
              <v-card class="px-3 pb-4">
                <form>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="Username"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  />
                  <v-text-field
                    id="password"
                    v-model="password"
                    name="Password"
                    label="Password"
                    type="password"
                    required
                  />
                  <v-text-field
                    v-model="repeatPassword"
                    :error-messages="passwordErrors"
                    name="Password"
                    label="Repeat password"
                    type="password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />

                  <v-btn
                    color="blue"
                    @click="submit">submit</v-btn>
                  <v-btn
                    color="blue"
                    @click="clear">clear</v-btn>
                </form>
            </v-card></div>
            <v-footer class="pa-3">
              <v-spacer/>
              <div v-if="this.$root.logged" >
                <v-text>您已经登录</v-text>
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  color="danger"
                  @click=" logout()"
                >logout
                </v-btn>
              </div>
            </v-footer>
</v-flex></v-layout></v-container></v-content></v-app></template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
var pattern = new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')
const customName = (value) => pattern.test(value) !== false
var emailpattern = new RegExp('^[a-zA-Z0-9_@.\u4e00-\u9fa5]+$')
const customEmail = (value) => emailpattern.test(value) !== false
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10), customName },
    email: { required, email, customEmail },
    password: {
      required,
      minLength: minLength(6),
      customName
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    submitStatus: null
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      !this.$v.name.customName && errors.push('Name contains invalid characters.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.customEmail && errors.push('E-mail contains invalid characters.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password must be more than 6 words')
      !this.$v.password.customName && errors.push('Password contains invalid characters.')
      !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must be identical.')
      return errors
    }
  },

  methods: {
    submit () {
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
          url: 'http://localhost:8080/register',
          data: this.$qs.stringify({
            username: this.name,
            password: this.password,
            email: this.email
          })
        })
          .then(response => {
            console.log(response.data)
            if (response.data === '注册成功') {
              this.$root.logged = true
              this.$router.push('/browse')
            } else if (response.data === '用户名已存在') {
              alert('用户名已存在')
            } else {
              alert('注册失败')
            }
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
    },
    logout () {
      this.axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: 'http://localhost:8080/logout',
        data: this.$qs.stringify()
      })
        .then(response => {
          console.log(response.data)
          if (response.data === '登出') {
            this.$root.isAdmin = false
            this.$root.logged = false
          }
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    }

  }
}
</script>
