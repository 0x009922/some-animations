<template>
  <div class="galaxy-v2 d-flex align-center justify-center fill-height">
    <div class="galaxy-v2--wrapper">
      <canvas
        ref="target"
        width="1000"
        height="1000"
      />
    </div>
  </div>
</template>

<script>
import Scene from './galaxy-v2';

export default {
  name: 'SimpleCanvasScene',
  mounted() {
    const scene = new Scene(this.$refs.target);
    this.$store.commit('setLoop', scene.render.bind(scene));
  },
  beforeDestroy() {
    this.$store.commit('clearLoop');
  },
};
</script>

<style lang="sass" scoped>
.galaxy-v2
  &--wrapper
    border: 2px solid #565254
    border-radius: 2px
    overflow: hidden
    canvas
      background: black
      display: block
      width: 700px
      height: 700px
</style>
