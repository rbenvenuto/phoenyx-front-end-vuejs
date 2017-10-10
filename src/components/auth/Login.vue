<template>
  <div class="container">
      <h1>{{ teste }}</h1>
      <form
        v-on:submit.prevent="loginAPICall()" 
        method="post">
          <input
            v-model="login.email"
            type="email" 
            placeholder="E-mail"><br>

          <input
            v-model="login.password"
            type="password" 
            placeholder="Senha">

          <p>{{ login.email }}</p>

          <input type="submit" value="Login">  
      </form>
  </div>
</template>

<script>
import {loginUrl, userUrl, getHeader} from '@/helpers/api_conf'

export default {
  name: 'login',
  data () {
    return {
      teste: [],
      login: {
        email: '',
        password: []
      }
    }
  },
  methods: {
    loginAPICall: function () {

      const authUser = {}

      const postData = {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'DYUPkLeExv6plx3A72LsY6cR8EpsES6iyKhhDPnr',
        username: this.login.email,
        password: this.login.password
      }

      this.$http.post(loginUrl, postData)
        .then(response => {
          if(response.status === 200) {
            // log para teste
            console.log('OAuth Token', response.body.access_token)

            // armazenando access_token e refresh_token localmente
            authUser.access_token = response.body.access_token
            authUser.refresh_token = response.body.refresh_token

            // armazenando no localStorage
            window.localStorage.setItem('authUser', JSON.stringify(authUser))

            this.$http.get(userUrl, {headers: getHeader()})
              .then(response => {
                //console.log('User Object ', response)
                authUser.email = response.body.email
                authUser.name = response.body.name
                window.localStorage.setItem('authUser', JSON.stringify(authUser))
                this.$router.push({name: 'Dashboard'})
              })
          }
        })
    }
  },
  created () {
    this.$http.get('http://phoenyx.dev/api/teste')
      .then(response => {
        this.teste = response.body
    })
  }
}
</script>

<style scoped>

</style>


