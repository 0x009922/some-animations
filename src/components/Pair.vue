<script>
export default {
  name: 'Pair',
  functional: true,
  render (h, context) {
    let { num, distance, size, delay } = context.props
    let rad = distance / 2
    let animationDelay = `${delay}s`
    const gap = 3
    return (
      <transition name="pair-rotation" vOn:after-enter={afterEnter}>
        <g class="pair" key={num} style={{ animationDelay }}>
          <circle cx="0" cy="0" r={rad} class="round" style={{ animationDelay }} />
          <line
            x1={rad - size - gap}
            y1="0"
            x2={-(rad - size - gap)}
            y2="0"
            style={{ animationDelay }}
          />
          <circle cx={-rad} cy="0" r={size} class="dot" />
          <circle cx={rad} cy="0" r={size} class="dot" />
        </g>
      </transition>
    )

    function afterEnter () {
      if (context.listeners.done) {
        context.listeners.done()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/const'

@keyframes rot
  from
    transform: rotate(0)
  to
    transform: rotate(180deg)
@keyframes fade
  10%
    opacity: 0
  50%
    opacity: 0.66
  90%
    opacity: 0

@mixin anim($name)
  animation: $name 1.4s ease-in-out

.pair-rotation-enter-active
  @include anim(rot)
  line,
  circle.round
    @include anim(fade)
    @include anim(fade)

g.pair
  line
    stroke: $pairs-fore
    stroke-width: 1.5
    opacity: 0
  circle
    stroke: none
    &.dot
      fill: $pairs-fore
      stroke: none
    &.round
      fill: none
      stroke: $pairs-fore
      stroke-width: 1.5
      opacity: 0
</style>
