<template>
  <div id="app">
    <AuthLoading v-if="showAuthLoadScreen"/>
    <div v-if="showLoginScreen">
      <LoginForm />
    </div>
    <div v-if="isLoggedIn">
      <h1>You are logged in</h1>
    </div>
  </div>
</template>

<script>
import AuthLoading from './components/AuthLoading'
import LoginForm from './components/partials/LoginForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      env: window._env_,
    }
  },
  components: {
    AuthLoading,
    LoginForm,
  },
  computed: {
    ...mapGetters([
      'showAuthLoadScreen',
      'showLoginScreen',
      'isLoggedIn',
    ])
  },
  mounted() {
    this.$store.dispatch('loadUser');
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
