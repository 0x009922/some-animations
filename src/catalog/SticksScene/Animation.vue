<script lang="ts">
import { defineComponent, h, resolveComponent } from 'vue';
import factory from './create';

export default () => h(resolveComponent('ThreeAnimation'), { factory });
</script>
