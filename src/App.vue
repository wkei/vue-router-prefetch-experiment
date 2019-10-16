<template>
  <div id="app">
    <p :class="{ loading }">
      <b>loading: {{ loading }}</b>
    </p>
    <div id="nav"><router-link to="/">Home</router-link></div>
    <router-view />
  </div>
</template>

<script>
import bus from './bus'

export default {
  computed: {
    loading() {
      return bus.loading
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.loading {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}
</style>
