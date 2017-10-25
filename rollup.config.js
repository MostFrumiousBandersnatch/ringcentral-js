var replace = require('rollup-plugin-replace');
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var builtins = require('rollup-plugin-node-builtins');

module.exports = {
    input: 'src/SDK.js',
    output: {
        file: 'build/ringcentral.js',
        format: 'umd',
        name: 'RingCentral.SDK',
        sourcemap: true
    },
    plugins: [
        replace({
            //FIXME Replace with rollup-plugin-virtual
            "require('../../package.json').version" : JSON.stringify(require('./package.json').version)
        }),
        commonjs(), // support of commonjs modules
        builtins(), // adds qs and events
        resolve() // adds object-assign and is-plain-object
    ],
    external: [
        'es6-promise',
        'fetch-ponyfill',
        'pubnub'
    ],
    globals: {
        // we intentionally disable this in order to use globals resolver at SDK level
        'pubnub': 'disabled-PubNub',
        'es6-promise': 'disabled-Promise',
        'fetch-ponyfill': 'disabled-fetch'
    }
};