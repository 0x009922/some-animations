<template>
  <div>
    <canvas
      ref="target"
      :width="viewport.width"
      :height="viewport.height"
    />
  </div>
</template>

<script>
import Animation from '../animations/first'
import { mapState } from 'vuex'

export default {
  name: 'First',

  data () {
    return {
      animation: null
    }
  },

  computed: {
    ...mapState(['viewport'])
  },

  watch: {
    viewport (value) {
      this.animation.setSize(value)
    }
  },

  mounted () {
    this.animation = new Animation(this.$refs.target)
    this.animation.setSize(this.viewport)
    this.$store.commit('setLoop', this.animation.animate.bind(this.animation))
  },

  beforeDestroy () {
    this.$store.commit('removeLoop')
  }
}
</script>
