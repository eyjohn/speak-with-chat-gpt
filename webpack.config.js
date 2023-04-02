const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const { ImageTransformWebpackPlugin } = require("image-transform-webpack-plugin");
const { ImageTransformFormat } = require("image-transform-plugin");
const ChromeExtensionManifest = require('chrome-extension-manifest-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
    mode: "production",
    entry: {
        content_chat_openai_com: './src/content_chat_openai_com.ts',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ChromeExtensionManifest({
            inputFile: './src/manifest.json',
            outputFile: './dist/manifest.json',
            props: {
                version: packageJson.version,
            }
        }),
        new ImageTransformWebpackPlugin({
            input: './src/icon.svg',
            output: [
                {
                    file: 'icon16.png',
                    format: ImageTransformFormat.PNG,
                    width: 16,
                },
                {
                    file: 'icon48.png',
                    format: ImageTransformFormat.PNG,
                    width: 48,
                },
                {
                    file: 'icon128.png',
                    format: ImageTransformFormat.PNG,
                    width: 128,
                },
            ]
        }),
        new ZipPlugin({
            filename: 'extension.zip',
            path: path.resolve(__dirname, 'dist'),
        })
    ],
};
