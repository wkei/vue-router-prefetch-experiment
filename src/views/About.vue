<template>
  <div class="home">
    <h1>About</h1>
    <pre>{{ JSON.stringify(film, null, 2) }}</pre>
  </div>
</template>

<script>
import bus from '@/bus'

export default {
  name: 'home',

  async prefetch(to) {
    const sleep = Math.floor(1000 * Math.random())
    console.log('sleep', sleep)
    await new Promise(resolve => setTimeout(resolve, sleep))

    const { id } = to.params
    const film = await fetch(
      `https://ghibliapi.herokuapp.com/films/${id}`
    ).then(data => data.json())
    if (bus.films.length) {
      bus.films = bus.films.map(item => {
        if (item.id === id) {
          item = film
        }
        return item
      })
    } else {
      bus.films.push(film)
    }
  },

  computed: {
    film() {
      return bus.films.find(film => film.id === this.$route.params.id)
    },
  },
}
</script>
