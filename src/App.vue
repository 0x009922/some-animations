<template>
  <div id="app">
    <Navigation />
    <ViewBox />
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import ViewBox from './components/ViewBox'
import { mapGetters, mapState } from 'vuex'

let lastFrame = window.performance.now()
let elapsed = 0

let opts = {
  paused: false,
  loop: null,
  loopPlaying: false,
  errorCallback: null
}

window.requestAnimationFrame(() => work())

function work () {
  let now = window.performance.now()
  let delta = now - lastFrame
  lastFrame = now

  if (delta < 300) {
    const { paused, loop, loopPlaying } = opts
    try {
      if (loopPlaying) {
        elapsed += delta
        // console.time('loop')
        loop(delta, elapsed)
        // console.timeEnd('loop')
      }
    } catch (e) {
      console.error('Error in loop:', e)
      if (opts.errorCallback)
        opts.errorCallback()
    }
  }
  window.requestAnimationFrame(() => work())
}

export default {
  name: 'App',
  computed: {
    ...mapGetters(['loopPlaying']),
    ...mapState(['navigating', 'paused', 'loop'])
  },
  watch: {
    loopPlaying () {
      this.setOpts()
    },
    paused () {
      this.setOpts()
    },
    loop () {
      this.setOpts()
    }
  },
  methods: {
    resized (e) {
      // window.innerWidth
      this.$store.dispatch('resized', {
        width: window.innerWidth,
        height: window.innerHeight
      })
    },
    setOpts () {
      let { loopPlaying, paused, loop } = this
      opts = { loopPlaying, paused, loop }
      opts.errorCallback = () => {
        this.$store.commit('pause')
      }
    }
  },
  created () {
    window.addEventListener('resize', e => this.resized(e))
    this.$store.commit('setViewport', {
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.setOpts()
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
