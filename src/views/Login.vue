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

                <v-btn
                  color="blue"
                  @click="submit">submit</v-btn>
                <v-btn
                  color="blue"
                  @click="clear">clear</v-btn>
              </form>
</v-card></v-flex></v-layout></v-container></v-content></v-app></template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    password: {
      required,
      minLength: minLength(6)
    }
  },

  data: () => ({
    name: '',
    password: '',
    submitStatus: null
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password must be more than 6 words')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log(this.name, this.password)
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
      this.password = ''
    }
  }
}
</script>
