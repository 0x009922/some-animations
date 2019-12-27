<template>
  <div class="simple-canvas-layout">
    <div class="wrapper">
      <canvas
        ref="target"
        :width="width"
        :height="height"
        :style="{
          width: containerWidth + 'px',
          height: containerHeight + 'px'
        }"
      />
    </div>
  </div>
</template>

<script>
import Scene from '../animations/canvas/galaxy-v2';

export default {
  name: 'SimpleCanvasScene',
  props: {
    width: {
      default: 1000,
    },
    height: {
      default: 1000,
    },
    containerWidth: {
      default: 700,
    },
    containerHeight: {
      default: 700,
    },
  },
  data() {
    return {
      scene: null,
    };
  },
  mounted() {
    this.scene = new Scene(this.$refs.target);
    this.$store.commit('setLoop', this.scene.render.bind(this.scene));
  },
  beforeDestroy() {
    this.$store.commit('removeLoop');
  },
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/mixins'

.simple-canvas-layout
  @include center-box
  height: 100%
  .wrapper
    border: 2px solid #565254
    border-radius: 2px
    overflow: hidden
    canvas
      background: black
      display: block
</style>
