<template>
  <div
    v-sparks="'dark'"
    class="the-navigation-tile"
    :class="{
      'the-navigation-tile--appeared': appeared,
      'the-navigation-tile--active': isActive,
    }"
    @mouseenter="hovered"
    @mouseleave="unhovered"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TheNavigationTile',
  props: {
    blur: Boolean,
    isActive: Boolean,
  },
  data: () => ({
    appeared: false,
    hover: false,
    unhoverTimer: null,
  }),
  computed: {
    focused() {
      return this.appeared && this.hover;
    },
  },
  watch: {
    active(val) {
      if (!val) {
        this.hover = false;
      }
    },
    focused(val) {
      if (val) {
        this.$emit('focus');
      } else {
        this.$emit('blur');
      }
    },
  },
  methods: {
    beforeLeave(el) {
      // Нужно для корректной смены transition
      // Потому что при удалении элемента с него не снимется этот класс средствами Vue
      el.classList.remove('the-navigation-tile--appeared');

      this.appeared = false;
    },
    hovered() {
      clearTimeout(this.unhoverTimer);
      this.hover = true;
    },
    unhovered() {
      clearTimeout(this.unhoverTimer);
      this.unhoverTimer = setTimeout(() => {
        this.hover = false;
      }, 200);
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

.the-navigation-tile
  cursor: pointer
  width: 250px
  height: 150px
  background: $background
  color: $text-primary
  font-size: 1.5em
  padding: 20px
  transition: transform .3s $ease-out-back

  // &--appeared
    //

  &:active
    transform: scale(0.98)

  &--blur
    opacity: 0.5

  &--active
    color: $primary
</style>
