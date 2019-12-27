<template>
  <div class="pairs-layout">
    <svg>
      <g class="center">
        <g
          v-for="(data, i) in pairsData"
          :key="i"
          :style="{ transform: `${data.translate} ${data.rotate}` }"
        >
          <Pair
            :num="num"
            :delay="data.delay"
            :distance="data.distance"
            size="12"
            @done="doneCount += 1"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import Pair from '../components/Pair'
import { Vector2 } from 'three'
import { mapState } from 'vuex'

export default {
  name: 'Pairs',
  components: { Pair },
  data () {
    return {
      num: 0,
      dotsCount: 28,
      radius: 200,
      doneCount: 0
    }
  },
  watch: {
    doneCount (value) {
      if (value === this.pairs.length) {
        this.tick()
      }
    },
    paused (value) {
      if (!value) this.tick()
    }
  },
  computed: {
    ...mapState(['paused']),
    dots () {
      let deltaAngle = Math.PI * 2 / this.dotsCount
      return new Array(this.dotsCount).fill(0).map(
        (m, i) => (i - 0.5) * deltaAngle - Math.PI / 2
      )
    },
    pairs () {
      let items = []
      let dot = 0
      let count = this.dots.length
      while (dot < count) {
        let d1 = this.dots[dot]
        let d2 = this.dots[(dot + 3) % count]
        items.push([d1, d2])
        dot += 2
      }
      return items
    },
    pairsData () {
      return this.pairs.map((angles, i) => {
        let v = angles.map(a => new Vector2(
          Math.cos(a) * this.radius,
          Math.sin(a) * this.radius
        ))
        let origin = new Vector2().addVectors(...v).divideScalar(2)
        let sub = new Vector2().subVectors(...v)
        return {
          translate: `translate(${origin.x}px, ${origin.y}px)`,
          rotate: `rotate(${origin.angle() + Math.PI / 2}rad)`,
          distance: sub.length(),
          delay: i * 0.24
        }
      })
    },
  },
  methods: {
    tick () {
      if (this.paused) return
      this.doneCount = 0
      setTimeout(() => {
        this.num += 1
      }, 1000)
    }
  },
  mounted () {
    this.tick()
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/const'

.pairs-layout
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  background: $pairs-back
  svg
    width: 600px
    height: 600px
    // border: 2px dashed gray
    g.center
      transform: translate(50%, 50%)
</style>
