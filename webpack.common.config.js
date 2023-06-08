const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
               test:/\.css$/,
               use: [
                MiniCssExtractPlugin.loader,
                'css-loader']
            }
        ]
    },
 output: {
    path: path.resolve(__dirname,'dist'),
 },
 plugins: [
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'index.html'
    }),
    new MiniCssExtractPlugin()
 ]
}