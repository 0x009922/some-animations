<template>
  <div
    v-if="isResizing"
    class="the-resizing-overlay d-flex align-center justify-center"
  >
    Resizing
  </div>
</template>

<script>
import { mapState } from 'vuex';

// todo - какую-нибудь анимацию вместо слова resizing

export default {
  name: 'TheResizingOverlay',
  computed: {
    ...mapState([
      'isResizing',
    ]),
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/style'

.the-resizing-overlay
  position: fixed
  z-index: 8
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: black
  color: $primary
  font-size: 4em
</style>
