<template>
  <div class="never-ending-fun d-flex align-center justify-center">
    <canvas
      ref="target"
    />
  </div>
</template>

<script>
import Animation from './Animation';

export default {
  name: 'NeverEndingFun',
  mounted() {
    const animation = new Animation(this.$refs.target);
    this.$store.commit('setLoop', animation.animate.bind(animation));
  },
  beforeDestroy() {
    this.$store.commit('clearLoop');
  },
};
</script>

<style lang="sass" scoped>
// @import '../assets/sass/style'
.never-ending-fun
  height: 100%
  background: black

// .canv-layout
//   @include center-box
//   height: 100%
//   // border: 2px solid white
//   padding: 5px
//   canvas
//     width: 700px
//     height: 700px
</style>
