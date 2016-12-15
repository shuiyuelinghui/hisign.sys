const webpack = require('webpack');

module.exports = {
    entry: {
        app: __dirname + '/src/scripts/index.js',
        login: __dirname + '/src/scripts/login.js',
        'pdf.worker': __dirname + '/library/pdfjs/build/pdf.worker.entry'
    },
    
    output: {
        path: __dirname + '/dist/scripts',
        filename: '[name].bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    compact: false
                }
            }
        ],

    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};