<template>
  <div class="canv-layout">
    <canvas
      ref="target"
      :width="700"
      :height="700"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Animation from '../animations/canvas/never-ending-fun';

export default {
  name: 'NeverEndingFun',

  data() {
    return {
      animation: null,
    };
  },

  computed: {
    ...mapState(['viewport']),
  },

  watch: {
    viewport(value) {
      // this.animation.setSize(value)
    },
  },

  mounted() {
    this.animation = new Animation(this.$refs.target);
    this.$store.commit('setLoop', this.animation.animate.bind(this.animation));
  },

  beforeDestroy() {
    this.$store.commit('removeLoop');
  },
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'
.canv-layout
  @include center-box
  height: 100%
  // border: 2px solid white
  padding: 5px
  canvas
    width: 700px
    height: 700px
</style>
