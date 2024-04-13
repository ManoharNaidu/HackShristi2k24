const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './webpack.js', // assuming your JavaScript entry point is index.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html', // path to your index.html file
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login/login.html', // path to your login.html file
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './src/register/register.html', // path to your register.html file
    }),
  ],
};
