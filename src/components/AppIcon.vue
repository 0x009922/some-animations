<script lang="ts">
import { defineComponent, FunctionalComponent, h, mergeProps } from 'vue';

interface Props {
    name: string;
    size: string | number;
}

const component: FunctionalComponent<Props> = (props, { attrs }) => {
    const fontSize = `${props.size}px`;

    return h(
        'span',
        mergeProps(
            {
                class: ['app-icon', 'mdi', `mdi-${props.name}`],
                style: { fontSize },
            },
            attrs,
        ),
    );
};

component.props = {
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [String, Number],
        default: 20,
    },
};

export default component;
</script>

<style lang="sass">
.app-icon
  line-height: 1em
</style>
