<template>
  <div id="app">
    <Navigation />
    <ViewBox />
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import ViewBox from './components/TheViewBox'
import { mapGetters, mapState } from 'vuex'

let lastFrame = window.performance.now()

export default {
  name: 'App',

  data () {
    return {
      // worker: new Worker()
    }
  },

  created () {
    window.addEventListener('resize', e => this.resized(e))
    window.requestAnimationFrame(() => this.work())

    this.$store.commit('setViewport', {
      width: window.innerWidth,
      height: window.innerHeight
    })
  },

  computed: {
    ...mapGetters(['loopPlaying']),
    ...mapState(['navigating'])
  },

  methods: {
    resized (e) {
      // window.innerWidth
      this.$store.dispatch('resized', {
        width: window.innerWidth,
        height: window.innerHeight
      })
    },
    work () {
      let now = window.performance.now()
      let elapsed = now - lastFrame

      const { paused, loop } = this.$store.state

      try {
        if (this.loopPlaying) {
          loop(elapsed, lastFrame)
        }
      } catch (e) {
        console.error('Error in loop:', e)
        this.$store.commit('pause')
      }

      lastFrame = now

      window.requestAnimationFrame(() => this.work())
    }
  },

  components: {
    Navigation,
    ViewBox
  }
}
</script>

<style lang="sass">
@import './assets/sass/style'
#app
  font-family: sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  width: 100vw
  height: 100vh
  // overflow: hidden

.router-view-box
  // margin-right: 50px
  // margin: 50px
  overflow: hidden
  transition: filter .3s ease
  &.blured
    filter: blur(13px)
</style>
