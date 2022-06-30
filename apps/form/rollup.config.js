import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from 'rollup-plugin-typescript2';
import path from 'path'

import pkg from './package.json';

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
    .replace(/^\w/, (m) => m.toUpperCase())
    .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
    input: 'src/index.ts',
    output: [
        {file: pkg.module, format: 'es'},
        {file: pkg.main, format: 'umd', name}
    ],
    plugins: [
        svelte({
            preprocess: sveltePreprocess()
        }),
        resolve({browser: true}),
        commonjs(),
        typescript({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        })
    ]
};
