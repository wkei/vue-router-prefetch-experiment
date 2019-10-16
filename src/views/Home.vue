<template>
  <div class="home">
    <h1>Home</h1>
    <ul>
      <li v-for="item in films" :key="item.id">
        <router-link :to="{ name: 'about', params: { id: item.id } }">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from '@/bus'

export default {
  name: 'home',

  async prefetch() {
    const films = await fetch(
      'https://ghibliapi.herokuapp.com/films?fields=id,title'
    ).then(data => data.json())
    bus.films = films
  },

  computed: {
    films() {
      return bus.films
    },
  },
}
</script>
