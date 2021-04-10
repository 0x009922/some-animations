import { Component, defineAsyncComponent } from 'vue';

const asyncComponentFactory = (loader: () => Promise<Component>) =>
    defineAsyncComponent({
        loader,
        delay: 200,
        timeout: 3000,
    });

export default asyncComponentFactory;
