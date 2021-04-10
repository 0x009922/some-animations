export type ResizeFn = (viewport: { width: number; height: number }) => void;

export type AnimationTickFn = (delta: number, elapsed: number) => void;

export interface ThreeAnimation {
    setSize: ResizeFn;
    destroy?: () => void;
    animate: AnimationTickFn;
}

export type ThreeAnimationFactory = (canvas: HTMLCanvasElement) => ThreeAnimation;
