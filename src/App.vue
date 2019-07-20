<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  components: {
    Navigation
  },

  created () {
    window.addEventListener('resize', e => this.resized(e))
  },

  methods: {
    resized (e) {
      // window.innerWidth
      console.log(window.innerWidth, window.innerHeight)
    }
  }
}
</script>


<style lang="sass">
@import './assets/sass/style'
#app
  font-family: Monofur
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

</style>
