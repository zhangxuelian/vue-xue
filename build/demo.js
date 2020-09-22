'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const demoConfig = require('./demo.config');

demoConfig.mode = 'development';

var compiler = webpack(demoConfig);
compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
    console.log('demo process is compiling...');
    done();
});
compiler.hooks.done.tap('done', stats => {
    console.log('demo process compiled done.');
});
var server = new WebpackDevServer(compiler, {
    open: true,
    contentBase: path.join(__dirname, '../'),
    after() {
        // todo
    }
});
server.listen(8787);