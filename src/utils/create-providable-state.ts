import { inject, provide } from 'vue';

export default function createProvidableState<T>(params: {
    stateFactory: () => T;
    symbolDescription: string;
}): {
    create: () => T;
    provide: (store: T) => void;
    inject: () => T;
    createAndProvide: () => T;
} {
    const sym = Symbol(params.symbolDescription);

    const createState = params.stateFactory;

    const provideState = (state: T) => provide(sym, state);

    const injectState = () => {
        const state = inject<T>(sym);
        if (!state) {
            throw new Error(`State injection failed! ${sym.toString()}`);
        }
        return state;
    };

    return {
        create: createState,
        provide: provideState,
        inject: injectState,
        createAndProvide: () => {
            const state = createState();
            provideState(state);
            return state;
        },
    };
}
