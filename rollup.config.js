import buble from 'rollup-plugin-buble';

export default {
    entry: 'index.js',
    sourceMap: true,
    plugins: [buble()],
    targets: [
        {
            dest: 'dist/postgrest-url.cjs.js',
            format: 'cjs'
        }
        // {
        //     dest: 'dist/postgrest-url.umd.js',
        //     format: 'umd',
        //     moduleName: 'postgrestUrl'
        // },
        // {
        //     dest: 'dist/postgrest-url.es.js',
        //     format: 'es'
        // }
    ]
};
