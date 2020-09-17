'use strict';

const webpack = require('webpack');
const baseConfig = require('./base.config');

baseConfig.mode = 'development';
webpack(baseConfig, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
    } else if (stats.hasErrors()) {
        console.error(stats.toString({
            chunks: false,
            colors: true
        }));
    } else {
        console.log(stats.toString({
            chunk: false,
            colors: true
        }));
    }
});
