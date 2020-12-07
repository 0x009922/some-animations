import { FunctionalComponent, Transition } from 'vue';
import './Pair.sass';

interface Props {
    num: number;
    distance: number;
    size: number;
    delay: number;
}

const component: FunctionalComponent<Props, 'done'[]> = ({ num, distance, size, delay }, { emit }) => {
    const rad = distance / 2;
    const animationDelay = `${delay}s`;
    const gap = 3;
    const afterEnter = () => emit('done');

    return (
        <Transition name="pair-rotation" onAfterEnter={afterEnter}>
            {() => (
                <g class="pair" key={num} style={{ animationDelay }}>
                    <circle cx="0" cy="0" r={rad} class="round" style={{ animationDelay }} />
                    <line x1={rad - size - gap} y1="0" x2={-(rad - size - gap)} y2="0" style={{ animationDelay }} />
                    <circle cx={-rad} cy="0" r={size} class="dot" />
                    <circle cx={rad} cy="0" r={size} class="dot" />
                </g>
            )}
        </Transition>
    );
};

const RequiredNumber = {
    type: Number,
    required: true,
};

component.props = {
    num: RequiredNumber,
    distance: RequiredNumber,
    size: RequiredNumber,
    delay: RequiredNumber,
};

component.emits = ['done'];

export default component;
