<template>
  <div class="sticks-layout d-flex align-center justify-center">
    <div
      class="grid"
      :style="{
        gridTemplateRows: `repeat(${rows}, auto)`,
        gridTemplateColumns: `repeat(${columns}, auto)`
      }"
    >
      <div
        v-for="({ row, col }) in sticks"
        :key="`${row} ${col}`"
        class="stick-wrapper d-flex align-center justify-center"
        :style="{
          gridRow: row + 1,
          gridColumn: col + 1
        }"
      >
        <div
          class="stick"
          :style="{ transform: `rotate(${rotations[row]}deg)` }"
        />
      </div>
    </div>
  </div>
</template>

<script>
const deltas = [
  [405, 45, 45, 45, -45, 135, 45, -135],
  [-45, -45, 405, -495, -45, -45, -45, -45],
  [45, 45, 45, 45, 45, 45, -405, 315],
  [-45, -45, -45, -45, 45, -135, 405, -315],
  [45, -315, 225, 45, 45, 45, 45, 45],
];

export default {
  name: 'Sticks',
  data() {
    return {
      iteration: -1,
      elapsed: 0,
      columns: 5,
      rows: 5,
      interval: 450,
      rotations: [0, 0, 0, 0, 0],
    };
  },
  computed: {
    currentDeltas() {
      return deltas.map((list) => list[this.iteration % list.length]);
    },
    sticks() {
      const arr = [];
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.columns; col++) {
          arr.push({ row, col });
        }
      }
      return arr;
    },
  },
  watch: {
    currentDeltas(values) {
      this.rotations = this.rotations.map((current, i) => current + values[i]);
    },
  },
  mounted() {
    this.$store.commit('setLoop', this.loop);
  },
  beforeDestroy() {
    this.$store.commit('clearLoop');
  },
  methods: {
    loop(delta) {
      this.elapsed += delta;
      if (this.elapsed >= this.interval) {
        this.iteration += 1;
        this.elapsed %= this.interval;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.sticks-layout
  color: white
  // @include center-box
  height: 100%
  .grid
    display: grid
  .stick-wrapper
    width: 100px
    height: 100px
    // @include center-box
  .stick
    width: 65px
    border: 4px solid white
    background: white
    transition: all 0.45s cubic-bezier(.64,-0.04,.25,1.04)
    transform-origin: center
</style>
