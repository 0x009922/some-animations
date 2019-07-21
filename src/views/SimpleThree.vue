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
import { mapState } from 'vuex'

export default {
  name: 'First',

  props: {
    animationClass: {
      required: true
    }
  },

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
    this.animation = new this.animationClass(this.$refs.target)
    this.animation.setSize(this.viewport)
    this.$store.commit('setLoop', this.animation.animate.bind(this.animation))
  },

  beforeDestroy () {
    this.$store.commit('removeLoop')
    this.animation.destroy()
  }
}
</script>
