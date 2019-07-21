<template>
  <transition
    appear
    @before-appear="before"
    @appear="appear"
  >
    <div
      class="tile"
    >
      <slot>Tile ._.</slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Tile',

  data () {
    return {
      duration: 0.6,
      delay: 0.2 + Math.random() * 0.3
    }
  },
  // functional: true,
  // render (h, context) {

  // }
  methods: {
    before (el) {
      el.style.opacity = 0
      el.style.transform = 'translateZ(50px)'
      // el.style.background = 'tomato'
      el.style.transition = `all ${this.duration}s ease`
      console.log('before')
    },
    appear (el, done) {
      setTimeout(() => {
        console.log('set')
        el.style.opacity = 1
        el.style.transform = ''
        // el.style.background = 'blue'
      }, this.delay * 1000)
      setTimeout(() => {
        console.log('done')
        done()
      }, (this.delay + this.duration) * 1000 )
    },
    after (el) {
      console.log('after')
    }
  }
}
</script>

<style lang="sass" scoped>
.tile
  // transition-duration: .5s
  // transition-property: all
  // transition-timing-function: ease
  background: green
  border: 2px dashed white
  // opacity: 0

// .tile-appear-to
//   opacity: 1

// .tile-appear
//   // transition: all .5s ease
//   opacity: 0
</style>
