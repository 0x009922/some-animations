<template>
  <!-- <transition
    appear
    @before-appear="before"
    @appear="appear"
  > -->
    <div
      class="tile"
      @click="navigate"
    >
      {{ title }}
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'Tile',

  props: {
    title: String,
    path: String
  },

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
    navigate () {
      this.$store.commit('hideNavigation')
      this.$router.push(this.path)
    }
  }
}
</script>

<style lang="sass" scoped>
.tile
  cursor: pointer
  width: 250px
  height: 150px
  background: #BCCCE0
  color: #3B3561
  font-size: 1.5em
  transition: all .27s ease
  padding: 20px
  opacity: 0.5
  &:hover
    opacity: 1
    transform: translateZ(30px)

// .tile-appear-to
//   opacity: 1

// .tile-appear
//   // transition: all .5s ease
//   opacity: 0
</style>
