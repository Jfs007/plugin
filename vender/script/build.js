const rollup = require('rollup');
const babel =  require('rollup-plugin-babel');
const cjs = require('rollup-plugin-commonjs')
const ts = require('rollup-plugin-typescript2');
const inputOptions = {
    input: 'index.ts',
    plugins: [
        ts(),
        cjs(),
        // babel({
        //     exclude: 'node_modules/**' // 只编译我们的源代码
        // })
    ]
}
const outputOptions = {
    file: 'dist/vender.js',
    format: 'cjs',
    // name: 'MyBundle'
}


async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    await bundle.write(outputOptions);
}

build();