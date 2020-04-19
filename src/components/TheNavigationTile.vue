<template>
  <div
    v-sparks="'dark'"
    class="the-navigation-tile"
    :class="{
      'the-navigation-tile--active': isActive,
    }"
    @click="$emit('click')"
  >
    <slot />

    <!-- <app-icon
      v-if="isActive"
      class="the-navigation-tile__active-chevron"
      size="40"
    >
      {{ mdiChevronUp }}
    </app-icon> -->
  </div>
</template>

<script>
import { mdiChevronUp } from '@mdi/js';
// import AppIcon from './AppIcon';

export default {
  name: 'TheNavigationTile',
  // components: {
  //   AppIcon,
  // },
  props: {
    isActive: Boolean,
  },
  data: () => ({
    mdiChevronUp,
  }),
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

@keyframes the-navigation-tile__chevron-animaion
  0%
    opacity: 1
    transform: translateY(5px)
  20%
    transform: none
  100%
    opacity: 0

.the-navigation-tile
  cursor: pointer
  width: 250px
  height: 150px
  background: $background
  color: $text-primary
  font-size: 1.5em
  padding: 20px
  transition: transform .3s $ease-out-back
  position: relative

  &:active
    transform: scale(0.98)

  &--active
    color: $primary

  &__active-chevron
    position: absolute
    bottom: 0
    left: 10px
    animation: the-navigation-tile__chevron-animaion 1s $ease-out-expo
    animation-iteration-count: infinite
</style>
