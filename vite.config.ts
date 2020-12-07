import { UserConfig } from 'vite';
import tsResolver from 'vite-tsconfig-paths';

const config: UserConfig = {
    assetsDir: 'assets',
    resolvers: [tsResolver],
};

export default config;
