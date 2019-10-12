const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, 'web/index.tsx')
  },
  output: {
    filename: '[hash].bundle.js',
    path: '/'
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js" ]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/, loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "web/tsconfig.json")
        }
      },
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html'
    })
  ]
}